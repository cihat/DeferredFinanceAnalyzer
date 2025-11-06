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
	loanInterestRate = $state(3.0); // Aylık faiz oranı (%)
	loanTermMonths = $state(24);
	tfsTermMonths = $state(36);
	tfsOrganizationFee = $state(10000);
	deliveryMonth = $state(12);
	inflationRate = $state(2.55); // Aylık enflasyon oranı (%)

	// Computed results
	loanResult = $derived.by((): LoanResult => {
		return calculateLoan({
			principal: this.principal,
			monthlyInterestRate: this.loanInterestRate,
			termMonths: this.loanTermMonths
		});
	});

	tfsResult = $derived.by((): TFSResult => {
		return calculateTFS({
			principal: this.principal,
			termMonths: this.tfsTermMonths,
			organizationFee: this.tfsOrganizationFee,
			deliveryMonth: this.deliveryMonth,
			monthlyInflationRate: this.inflationRate
		});
	});

	comparisonResult = $derived.by((): ComparisonResult => {
		return compareOptions(
			{
				principal: this.principal,
				monthlyInterestRate: this.loanInterestRate,
				termMonths: this.loanTermMonths
			},
			{
				principal: this.principal,
				termMonths: this.tfsTermMonths,
				organizationFee: this.tfsOrganizationFee,
				deliveryMonth: this.deliveryMonth,
				monthlyInflationRate: this.inflationRate
			}
		);
	});

	monthlyComparisonData = $derived.by(() => {
		return generateMonthlyComparison(
			{
				principal: this.principal,
				monthlyInterestRate: this.loanInterestRate,
				termMonths: this.loanTermMonths
			},
			{
				principal: this.principal,
				termMonths: this.tfsTermMonths,
				organizationFee: this.tfsOrganizationFee,
				monthlyInflationRate: this.inflationRate
			}
		);
	});

	// Validation
	isValid = $derived.by((): boolean => {
		return (
			this.principal > 0 &&
			this.loanInterestRate >= 0 &&
			this.loanTermMonths > 0 &&
			this.tfsTermMonths >= 6 &&
			this.tfsOrganizationFee >= 0 &&
			this.deliveryMonth >= 6 &&
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
		// Minimum 6 ay (150 gün kuralı)
		this.tfsTermMonths = Math.max(6, Math.round(value));
		// Ensure delivery month doesn't exceed new term and is at least 6
		if (this.deliveryMonth > this.tfsTermMonths) {
			this.deliveryMonth = this.tfsTermMonths;
		}
		if (this.deliveryMonth < 6) {
			this.deliveryMonth = 6;
		}
	}

	setTfsOrganizationFee(value: number) {
		this.tfsOrganizationFee = Math.max(0, value);
	}

	setDeliveryMonth(value: number) {
		// Minimum 6 ay (150 gün kuralı)
		this.deliveryMonth = Math.max(6, Math.min(this.tfsTermMonths, Math.round(value)));
	}

	setInflationRate(value: number) {
		this.inflationRate = Math.max(0, value);
	}
}

// Export singleton instance
export const financialStore = new FinancialStore();

