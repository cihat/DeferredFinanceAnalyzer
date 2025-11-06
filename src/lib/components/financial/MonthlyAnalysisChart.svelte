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
		// Sadece geçerli ayları (6+) kullan
		return Math.max(
			...financialStore.monthlyComparisonData
				.filter((d: any) => d.month >= 6)
				.map((d: any) => Math.abs(getDisplayDifference(d)))
		);
	}

	function getBarWidth(data: any): number {
		const maxDiff = getMaxDifference();
		return Math.min((Math.abs(getDisplayDifference(data)) / maxDiff) * 100, 100);
	}

	function getBarOpacity(month: number): number {
		// İlk 5 ay için daha düşük opacity (devre dışı görünümü)
		if (month < 6) return 0.2;
		return month === financialStore.deliveryMonth ? 1 : 0.6;
	}
	
	function isMonthDisabled(month: number): boolean {
		return month < 6;
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
				{@const disabled = isMonthDisabled(data.month)}
				<div class="flex items-center gap-2" class:opacity-40={disabled}>
					<div class="w-16 text-sm shrink-0" class:text-muted-foreground={!disabled} class:text-gray-400={disabled}>
						{data.month}. ay
					</div>
					<div class="flex-1 h-8 relative">
						{#if disabled}
							<!-- Devre dışı çubuk -->
							<div
								class="absolute top-0 h-full rounded bg-gray-300 dark:bg-gray-700"
								style="width: {barWidth}%; opacity: 0.3;"
							></div>
							<div class="absolute top-0 left-2 h-full flex items-center">
								<span class="text-[10px] text-gray-500 dark:text-gray-400">❌ Teslimat yok</span>
							</div>
						{:else}
							<!-- Normal çubuk -->
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
						{/if}
					</div>
					<div class="w-36 text-sm text-right shrink-0">
						{#if disabled}
							<div class="text-xs text-gray-400">Devre Dışı</div>
						{:else}
							<div>{formatCurrency(Math.abs(displayDifference))}</div>
							{#if financialStore.inflationRate > 0 && data.inflationImpact}
								<div class="text-xs text-amber-600 dark:text-amber-400">
									-{formatPercentage(data.inflationImpact)} değer
								</div>
							{/if}
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
			<div class="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 p-2 rounded border border-red-200 dark:border-red-800">
				⚠️ İlk 5 ay (150 gün) teslimat alınamaz. Minimum teslimat süresi 6. aydır.
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

