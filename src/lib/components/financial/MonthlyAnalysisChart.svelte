<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';

	function getDisplayDifference(data: any): number {
		return financialStore.inflationRate > 0 && data.inflationAdjustedDifference
			? data.inflationAdjustedDifference
			: data.difference;
	}

	function getMaxDifference(): number {
		return Math.max(
			...financialStore.monthlyComparisonData.map((d: any) =>
				Math.abs(getDisplayDifference(d))
			)
		);
	}

	function getBarWidth(data: any): number {
		const maxDiff = getMaxDifference();
		return Math.min((Math.abs(getDisplayDifference(data)) / maxDiff) * 100, 100);
	}

	function getBarOpacity(month: number): number {
		return month === financialStore.deliveryMonth ? 1 : 0.6;
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Teslimat Ayına Göre Fark Analizi</Card.Title>
		<p class="text-sm text-muted-foreground">
			Her teslimat ayı için maliyet farkı
			{#if financialStore.inflationRate > 0}
				<span class="text-amber-600 dark:text-amber-400">(enflasyon dahil)</span>
			{/if}
		</p>
	</Card.Header>
	<Card.Content>
		<div class="space-y-2">
			{#each financialStore.monthlyComparisonData as data}
				{@const displayDifference = getDisplayDifference(data)}
				{@const barWidth = getBarWidth(data)}
				{@const barOpacity = getBarOpacity(data.month)}
				<div class="flex items-center gap-2">
					<div class="w-16 text-sm text-muted-foreground shrink-0">
						{data.month}. ay
					</div>
					<div class="flex-1 h-8 relative">
						<div
							class="absolute top-0 h-full rounded transition-all"
							class:bg-green-500={displayDifference > 0}
							class:bg-red-500={displayDifference < 0}
							style="width: {barWidth}%; opacity: {barOpacity};"
						></div>
						{#if data.month === financialStore.deliveryMonth}
							<div
								class="absolute top-0 h-full border-2 border-white rounded pointer-events-none"
								style="width: {barWidth}%;"
							></div>
						{/if}
					</div>
					<div class="w-36 text-sm text-right shrink-0">
						<div>{formatCurrency(Math.abs(displayDifference))}</div>
						{#if financialStore.inflationRate > 0 && data.inflationImpact}
							<div class="text-xs text-amber-600 dark:text-amber-400">
								-{formatPercentage(data.inflationImpact)} değer
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-4 space-y-2">
			<div class="flex items-center gap-4 text-xs">
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 bg-green-500 rounded"></div>
					<span>TFS Daha Avantajlı</span>
				</div>
				<div class="flex items-center gap-2">
					<div class="w-4 h-4 bg-red-500 rounded"></div>
					<span>Kredi Daha Avantajlı</span>
				</div>
			</div>
			{#if financialStore.inflationRate > 0}
				<div class="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 p-2 rounded">
					💡 Enflasyon hesaplamalara dahil edildi. Geç teslimat alındığında paranın satın
					alma gücü azalır.
				</div>
			{/if}
		</div>
	</Card.Content>
</Card.Root>

