/**
 * Reactive stores for financial calculation parameters
 * Using Svelte 5 runes for reactivity
 */

import {
	calculateLoan,
	calculateTFS,
	compareOptions,
	generateMonthlyComparison,
	type LoanParams,
	type TFSParams,
	type LoanResult,
	type TFSResult,
	type ComparisonResult
} from '$lib/utils/financial';

class FinancialStore {
	// Input parameters
	principal = $state(500000);
	loanInterestRate = $state(2.5); // Annual percentage
	loanTermMonths = $state(120);
	tfsTermMonths = $state(60);
	tfsOrganizationFee = $state(10000);
	deliveryMonth = $state(30);

	// Computed results
	loanResult = $derived.by((): LoanResult => {
		return calculateLoan({
			principal: this.principal,
			annualInterestRate: this.loanInterestRate,
			termMonths: this.loanTermMonths
		});
	});

	tfsResult = $derived.by((): TFSResult => {
		return calculateTFS({
			principal: this.principal,
			termMonths: this.tfsTermMonths,
			organizationFee: this.tfsOrganizationFee,
			deliveryMonth: this.deliveryMonth
		});
	});

	comparisonResult = $derived.by((): ComparisonResult => {
		return compareOptions(
			{
				principal: this.principal,
				annualInterestRate: this.loanInterestRate,
				termMonths: this.loanTermMonths
			},
			{
				principal: this.principal,
				termMonths: this.tfsTermMonths,
				organizationFee: this.tfsOrganizationFee,
				deliveryMonth: this.deliveryMonth
			}
		);
	});

	monthlyComparisonData = $derived.by(() => {
		return generateMonthlyComparison(
			{
				principal: this.principal,
				annualInterestRate: this.loanInterestRate,
				termMonths: this.loanTermMonths
			},
			{
				principal: this.principal,
				termMonths: this.tfsTermMonths,
				organizationFee: this.tfsOrganizationFee
			}
		);
	});

	// Validation
	isValid = $derived.by((): boolean => {
		return (
			this.principal > 0 &&
			this.loanInterestRate >= 0 &&
			this.loanTermMonths > 0 &&
			this.tfsTermMonths > 0 &&
			this.tfsOrganizationFee >= 0 &&
			this.deliveryMonth > 0 &&
			this.deliveryMonth <= this.tfsTermMonths
		);
	});

	// Methods to update values
	setPrincipal(value: number) {
		this.principal = Math.max(0, value);
	}

	setLoanInterestRate(value: number) {
		this.loanInterestRate = Math.max(0, value);
	}

	setLoanTermMonths(value: number) {
		this.loanTermMonths = Math.max(1, Math.round(value));
	}

	setTfsTermMonths(value: number) {
		this.tfsTermMonths = Math.max(1, Math.round(value));
		// Ensure delivery month doesn't exceed new term
		if (this.deliveryMonth > this.tfsTermMonths) {
			this.deliveryMonth = this.tfsTermMonths;
		}
	}

	setTfsOrganizationFee(value: number) {
		this.tfsOrganizationFee = Math.max(0, value);
	}

	setDeliveryMonth(value: number) {
		this.deliveryMonth = Math.max(1, Math.min(this.tfsTermMonths, Math.round(value)));
	}
}

// Export singleton instance
export const financialStore = new FinancialStore();

