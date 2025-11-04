/**
 * Financial calculation utilities for loan and Tasarruf Finansman comparison
 */

export interface LoanParams {
	principal: number;
	monthlyInterestRate: number; // Aylık faiz oranı (bankaların kullandığı)
	termMonths: number;
}

export interface TFSParams {
	principal: number;
	termMonths: number;
	organizationFee: number;
	deliveryMonth: number;
	monthlyInflationRate?: number; // Aylık enflasyon oranı (TÜİK'in açıkladığı)
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
	principalPresentValue?: number;
	realValueLoss?: number;
	inflationImpact?: number;
}

export interface ComparisonResult {
	loanTotal: number;
	tfsTotal: number;
	difference: number;
	betterOption: 'loan' | 'tfs';
	savingsPercentage: number;
	inflationAdjustedDifference?: number;
	tfsPrincipalPresentValue?: number;
}

/**
 * Calculate bank loan using standard amortization formula
 * Monthly Payment = P * r * (1+r)^n / ((1+r)^n - 1)
 * 
 * Banks use monthly nominal interest rate directly.
 * Example: If bank says 3% monthly rate, use 3 (not 36%)
 */
export function calculateLoan(params: LoanParams): LoanResult {
	const { principal, monthlyInterestRate, termMonths } = params;
	
	// Convert percentage to decimal (3% -> 0.03)
	const monthlyRate = monthlyInterestRate / 100;
	
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
	// Payment = P × r × (1 + r)^n / ((1 + r)^n – 1)
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
 * Calculate present value considering inflation
 * PV = FV / (1 + inflation)^months
 * 
 * Uses monthly inflation rate directly (as published by statistical agencies)
 * Example: If monthly CPI inflation is 2.5%, use 2.5
 */
export function calculatePresentValue(
	futureValue: number,
	monthlyInflationRate: number,
	months: number
): number {
	// Convert percentage to decimal (2.5% -> 0.025)
	const inflationDecimal = monthlyInflationRate / 100;
	return futureValue / Math.pow(1 + inflationDecimal, months);
}

/**
 * Calculate Tasarruf Finansman System costs
 * - User pays equal monthly installments
 * - Receives full principal at delivery month
 * - Continues paying until term ends
 * - Total cost = principal + organization fee
 * - If inflation rate provided, calculates present value of received amount
 */
export function calculateTFS(params: TFSParams): TFSResult {
	const { principal, termMonths, organizationFee, deliveryMonth, monthlyInflationRate = 0 } = params;
	
	// Monthly payment is simply principal divided by term
	const monthlyPayment = principal / termMonths;
	
	// Total cost is principal plus organization fee
	const totalCost = principal + organizationFee;
	
	// Calculate inflation impact if inflation rate provided
	let principalPresentValue = principal;
	let realValueLoss = 0;
	let inflationImpact = 0;
	
	if (monthlyInflationRate > 0) {
		// Calculate the present value of the principal received at delivery month
		principalPresentValue = calculatePresentValue(principal, monthlyInflationRate, deliveryMonth);
		realValueLoss = principal - principalPresentValue;
		inflationImpact = (realValueLoss / principal) * 100;
	}
	
	return {
		monthlyPayment,
		totalCost,
		deliveryMonth,
		principalPresentValue,
		realValueLoss,
		inflationImpact
	};
}

/**
 * Compare loan vs TFS and determine which is better
 * Takes inflation into account for TFS delivery value
 * Dynamically determines better option based on delivery month and inflation
 */
export function compareOptions(
	loanParams: LoanParams,
	tfsParams: TFSParams
): ComparisonResult {
	const loanResult = calculateLoan(loanParams);
	const tfsResult = calculateTFS(tfsParams);
	
	// Standard comparison without inflation adjustment
	const difference = loanResult.totalCost - tfsResult.totalCost;
	
	// Inflation-adjusted comparison
	// For TFS: you pay totalCost but receive principal at delivery month
	// The real value of what you receive is diminished by inflation
	let inflationAdjustedDifference = difference;
	let betterOption: 'loan' | 'tfs';
	let effectiveDifference = difference;
	
	if (tfsParams.monthlyInflationRate && tfsParams.monthlyInflationRate > 0) {
		// Real cost of TFS considering inflation
		// You pay totalCost but receive only principalPresentValue in today's money
		const tfsRealCost = tfsResult.totalCost + (tfsResult.realValueLoss || 0);
		inflationAdjustedDifference = loanResult.totalCost - tfsRealCost;
		// Use inflation-adjusted difference when inflation is present
		effectiveDifference = inflationAdjustedDifference;
	}
	
	// Determine better option based on delivery month (with or without inflation)
	betterOption = effectiveDifference > 0 ? 'tfs' : 'loan';
	const savingsPercentage = Math.abs(effectiveDifference / loanResult.totalCost) * 100;
	
	return {
		loanTotal: loanResult.totalCost,
		tfsTotal: tfsResult.totalCost,
		difference,
		betterOption,
		savingsPercentage,
		inflationAdjustedDifference,
		tfsPrincipalPresentValue: tfsResult.principalPresentValue
	};
}

/**
 * Generate month-by-month comparison data for charting
 * Includes inflation impact for each delivery month
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
	principalPresentValue?: number;
	realValueLoss?: number;
	inflationImpact?: number;
	inflationAdjustedDifference?: number;
}> {
	const results: Array<{
		month: number;
		loanTotal: number;
		tfsTotal: number;
		difference: number;
		betterOption: 'loan' | 'tfs';
		principalPresentValue?: number;
		realValueLoss?: number;
		inflationImpact?: number;
		inflationAdjustedDifference?: number;
	}> = [];
	
	const loanResult = calculateLoan(loanParams);
	
	for (let month = 1; month <= tfsParams.termMonths; month++) {
		const tfsResult = calculateTFS({ ...tfsParams, deliveryMonth: month });
		const difference = loanResult.totalCost - tfsResult.totalCost;
		
		// Calculate inflation-adjusted difference and determine better option dynamically
		let inflationAdjustedDifference = difference;
		let effectiveDifference = difference;
		
		if (tfsParams.monthlyInflationRate && tfsParams.monthlyInflationRate > 0) {
			const tfsRealCost = tfsResult.totalCost + (tfsResult.realValueLoss || 0);
			inflationAdjustedDifference = loanResult.totalCost - tfsRealCost;
			effectiveDifference = inflationAdjustedDifference;
		}
		
		// Determine better option based on the effective difference (inflation-adjusted if applicable)
		const betterOption = effectiveDifference > 0 ? 'tfs' : 'loan';
		
		results.push({
			month,
			loanTotal: loanResult.totalCost,
			tfsTotal: tfsResult.totalCost,
			difference,
			betterOption,
			principalPresentValue: tfsResult.principalPresentValue,
			realValueLoss: tfsResult.realValueLoss,
			inflationImpact: tfsResult.inflationImpact,
			inflationAdjustedDifference
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

