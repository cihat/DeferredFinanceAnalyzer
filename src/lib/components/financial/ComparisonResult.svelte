<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';

	interface MonthData {
		month: number;
		difference: number;
		inflationAdjustedDifference?: number;
	}

	function getBestMonth(): MonthData | null {
		if (financialStore.monthlyComparisonData.length === 0) return null;

		return financialStore.monthlyComparisonData.reduce(
			(best: MonthData, current: MonthData) => {
				const bestDiff = Math.abs(
					financialStore.inflationRate > 0 && best.inflationAdjustedDifference
						? best.inflationAdjustedDifference
						: best.difference
				);
				const currentDiff = Math.abs(
					financialStore.inflationRate > 0 && current.inflationAdjustedDifference
						? current.inflationAdjustedDifference
						: current.difference
				);
				return currentDiff > bestDiff ? current : best;
			},
			financialStore.monthlyComparisonData[0]
		);
	}

	$: bestMonthData = getBestMonth();
	$: isBetterOption = financialStore.comparisonResult.betterOption === 'tfs';
	$: showInflation = financialStore.inflationRate > 0 && financialStore.tfsResult.realValueLoss;
	$: showBestMonthSuggestion = bestMonthData && 
		bestMonthData.month !== financialStore.deliveryMonth && 
		Math.abs(
			(financialStore.inflationRate > 0 && bestMonthData.inflationAdjustedDifference
				? bestMonthData.inflationAdjustedDifference
				: bestMonthData.difference) -
			(financialStore.inflationRate > 0 && financialStore.comparisonResult.inflationAdjustedDifference
				? financialStore.comparisonResult.inflationAdjustedDifference
				: financialStore.comparisonResult.difference)
		) > 1000;
</script>

<Card.Root
	class={isBetterOption ? 'border-2 border-green-500' : 'border-2 border-blue-500'}
>
	<Card.Header>
		<Card.Title class="flex items-center justify-between">
			<span>Karşılaştırma Sonucu</span>
			<span class="text-sm font-normal text-muted-foreground">
				{financialStore.deliveryMonth}. Ayda
			</span>
		</Card.Title>
		<p class="text-sm text-muted-foreground">
			Seçili teslimat ayına göre maliyet analizi
		</p>
	</Card.Header>
	<Card.Content class="space-y-4">
		<!-- Main Winner Display -->
		<div
			class="text-center p-6 rounded-lg border-2 transition-all bg-white dark:bg-gray-900"
			class:border-green-500={isBetterOption}
			class:shadow-green-100={isBetterOption}
			class:border-blue-500={!isBetterOption}
			class:shadow-blue-100={!isBetterOption}
		>
			<div class="flex items-center justify-center gap-2 mb-2">
				<span class="text-3xl">
					{isBetterOption ? '🏆' : '🏦'}
				</span>
			</div>
			<p
				class="text-sm font-medium mb-1"
				class:text-green-700={isBetterOption}
				class:dark:text-green-300={isBetterOption}
				class:text-blue-700={!isBetterOption}
				class:dark:text-blue-300={!isBetterOption}
			>
				{financialStore.deliveryMonth}. Ayda Daha Avantajlı
			</p>
			<p
				class="text-3xl font-bold mb-2"
				class:text-green-800={isBetterOption}
				class:dark:text-green-300={isBetterOption}
				class:text-blue-800={!isBetterOption}
				class:dark:text-blue-300={!isBetterOption}
			>
				{isBetterOption ? 'Tasarruf Finansman' : 'Banka Kredisi'}
			</p>
			<p
				class="text-xl font-semibold mb-1"
				class:text-green-700={isBetterOption}
				class:dark:text-green-400={isBetterOption}
				class:text-blue-700={!isBetterOption}
				class:dark:text-blue-400={!isBetterOption}
			>
				{formatCurrency(Math.abs(financialStore.comparisonResult.difference))} tasarruf
			</p>
			<p
				class="text-sm font-medium"
				class:text-green-600={isBetterOption}
				class:dark:text-green-400={isBetterOption}
				class:text-blue-600={!isBetterOption}
				class:dark:text-blue-400={!isBetterOption}
			>
				({formatPercentage(financialStore.comparisonResult.savingsPercentage)} daha ucuz)
			</p>
		</div>

		<!-- Side by Side Comparison -->
		<div class="grid grid-cols-2 gap-4">
			<!-- Loan Card -->
			<div
				class="p-4 rounded-lg border-2 transition-all"
				class:border-blue-500={!isBetterOption}
				class:bg-blue-50={!isBetterOption}
				class:dark:bg-blue-950={!isBetterOption}
				class:border-muted={isBetterOption}
				class:bg-muted={isBetterOption}
			>
				<p
					class="text-xs mb-1"
					class:text-muted-foreground={isBetterOption}
					class:text-blue-700={!isBetterOption}
					class:dark:text-blue-300={!isBetterOption}
				>
					Banka Kredisi
				</p>
				<p
					class="text-xl font-bold"
					class:text-blue-900={!isBetterOption}
					class:dark:text-blue-100={!isBetterOption}
				>
					{formatCurrency(financialStore.comparisonResult.loanTotal)}
				</p>
				{#if !isBetterOption}
					<p class="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
						✓ {financialStore.deliveryMonth}. ayda en ucuz
					</p>
				{/if}
			</div>

			<!-- TFS Card -->
			<div
				class="p-4 rounded-lg border-2 transition-all"
				class:border-green-500={isBetterOption}
				class:bg-green-50={isBetterOption}
				class:dark:bg-green-950={isBetterOption}
				class:border-muted={!isBetterOption}
				class:bg-muted={!isBetterOption}
			>
				<p
					class="text-xs mb-1"
					class:text-muted-foreground={!isBetterOption}
					class:text-green-700={isBetterOption}
					class:dark:text-green-300={isBetterOption}
				>
					Tasarruf Finansman
				</p>
				<p
					class="text-xl font-bold"
					class:text-green-900={isBetterOption}
					class:dark:text-green-100={isBetterOption}
				>
					{formatCurrency(financialStore.comparisonResult.tfsTotal)}
				</p>
				{#if isBetterOption}
					<p class="text-xs text-green-700 dark:text-green-400 mt-2 font-medium">
						✓ {financialStore.deliveryMonth}. ayda en ucuz
					</p>
				{/if}
			</div>
		</div>

		<!-- Inflation Warning -->
		{#if showInflation}
			<div class="rounded-lg bg-amber-50 dark:bg-amber-950 p-4 border border-amber-200 dark:border-amber-800">
				<div class="flex items-start gap-2">
					<span class="text-amber-600 dark:text-amber-400 text-xl">⚠️</span>
					<div class="flex-1">
						<p class="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-1">
							{financialStore.deliveryMonth}. Ayda Enflasyon Etkisi
						</p>
						<p class="text-xs text-amber-800 dark:text-amber-200">
							Alacağınız {formatCurrency(financialStore.principal)}'nin bugünkü değeri:
							<strong class="font-semibold">
								{formatCurrency(financialStore.tfsResult.principalPresentValue || 0)}
							</strong>
						</p>
						<p class="text-xs text-amber-700 dark:text-amber-300 mt-2">
							Değer kaybı: {formatCurrency(financialStore.tfsResult.realValueLoss || 0)}
							({formatPercentage(financialStore.tfsResult.inflationImpact || 0)})
						</p>
					</div>
				</div>
			</div>
		{/if}

		<!-- Best Month Suggestion -->
		{#if showBestMonthSuggestion && bestMonthData}
			<div class="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 border border-blue-200 dark:border-blue-800">
				<div class="flex items-start gap-2">
					<span class="text-blue-600 dark:text-blue-400 text-xl">💡</span>
					<div class="flex-1">
						<p class="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
							Daha İyi Bir Seçenek Var!
						</p>
						<p class="text-xs text-blue-800 dark:text-blue-200">
							<strong>{bestMonthData.month}. ayda</strong> teslimat alırsanız,
							<strong>
								{formatCurrency(
									Math.abs(
										(financialStore.inflationRate > 0 && bestMonthData.inflationAdjustedDifference
											? bestMonthData.inflationAdjustedDifference
											: bestMonthData.difference) -
										(financialStore.inflationRate > 0 && financialStore.comparisonResult.inflationAdjustedDifference
											? financialStore.comparisonResult.inflationAdjustedDifference
											: financialStore.comparisonResult.difference)
									)
								)}
							</strong>
							daha fazla tasarruf edebilirsiniz.
						</p>
					</div>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>

