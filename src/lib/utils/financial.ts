/**
 * Financial calculation utilities for loan and Tasarruf Finansman comparison
 */

export interface LoanParams {
	principal: number;
	annualInterestRate: number;
	termMonths: number;
}

export interface TFSParams {
	principal: number;
	termMonths: number;
	organizationFee: number;
	deliveryMonth: number;
}

export interface LoanResult {
	monthlyPayment: number;
	totalCost: number;
	totalInterest: number;
}

export interface TFSResult {
	monthlyPayment: number;
	totalCost: number;
	deliveryMonth: number;
}

export interface ComparisonResult {
	loanTotal: number;
	tfsTotal: number;
	difference: number;
	betterOption: 'loan' | 'tfs';
	savingsPercentage: number;
}

/**
 * Calculate bank loan using standard amortization formula
 * Monthly Payment = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateLoan(params: LoanParams): LoanResult {
	const { principal, annualInterestRate, termMonths } = params;
	
	// Convert annual rate to monthly rate (as decimal)
	const monthlyRate = annualInterestRate / 100 / 12;
	
	// Handle zero interest rate edge case
	if (monthlyRate === 0) {
		const monthlyPayment = principal / termMonths;
		return {
			monthlyPayment,
			totalCost: principal,
			totalInterest: 0
		};
	}
	
	// Standard amortization formula
	const numerator = monthlyRate * Math.pow(1 + monthlyRate, termMonths);
	const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
	const monthlyPayment = principal * (numerator / denominator);
	
	const totalCost = monthlyPayment * termMonths;
	const totalInterest = totalCost - principal;
	
	return {
		monthlyPayment,
		totalCost,
		totalInterest
	};
}

/**
 * Calculate Tasarruf Finansman System costs
 * - User pays equal monthly installments
 * - Receives full principal at delivery month
 * - Continues paying until term ends
 * - Total cost = principal + organization fee
 */
export function calculateTFS(params: TFSParams): TFSResult {
	const { principal, termMonths, organizationFee, deliveryMonth } = params;
	
	// Monthly payment is simply principal divided by term
	const monthlyPayment = principal / termMonths;
	
	// Total cost is principal plus organization fee
	const totalCost = principal + organizationFee;
	
	return {
		monthlyPayment,
		totalCost,
		deliveryMonth
	};
}

/**
 * Compare loan vs TFS and determine which is better
 */
export function compareOptions(
	loanParams: LoanParams,
	tfsParams: TFSParams
): ComparisonResult {
	const loanResult = calculateLoan(loanParams);
	const tfsResult = calculateTFS(tfsParams);
	
	const difference = loanResult.totalCost - tfsResult.totalCost;
	const betterOption = difference > 0 ? 'tfs' : 'loan';
	const savingsPercentage = Math.abs(difference / loanResult.totalCost) * 100;
	
	return {
		loanTotal: loanResult.totalCost,
		tfsTotal: tfsResult.totalCost,
		difference,
		betterOption,
		savingsPercentage
	};
}

/**
 * Generate month-by-month comparison data for charting
 */
export function generateMonthlyComparison(
	loanParams: LoanParams,
	tfsParams: Omit<TFSParams, 'deliveryMonth'>
): Array<{
	month: number;
	loanTotal: number;
	tfsTotal: number;
	difference: number;
	betterOption: 'loan' | 'tfs';
}> {
	const results: Array<{
		month: number;
		loanTotal: number;
		tfsTotal: number;
		difference: number;
		betterOption: 'loan' | 'tfs';
	}> = [];
	
	const loanResult = calculateLoan(loanParams);
	
	for (let month = 1; month <= tfsParams.termMonths; month++) {
		const tfsResult = calculateTFS({ ...tfsParams, deliveryMonth: month });
		const difference = loanResult.totalCost - tfsResult.totalCost;
		
		results.push({
			month,
			loanTotal: loanResult.totalCost,
			tfsTotal: tfsResult.totalCost,
			difference,
			betterOption: difference > 0 ? 'tfs' : 'loan'
		});
	}
	
	return results;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('tr-TR', {
		style: 'currency',
		currency: 'TRY',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(amount);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
	return `${value.toFixed(2)}%`;
}

