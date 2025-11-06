<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="border-2">
	<Card.Header>
		<Card.Title class="text-lg">Tasarruf Finansman</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-3">
		<div>
			<p class="text-sm text-muted-foreground">Aylık Ödeme</p>
			<p class="text-2xl font-bold">
				{formatCurrency(financialStore.tfsResult.monthlyPayment)}
			</p>
		</div>
		<div>
			<p class="text-sm text-muted-foreground">Organizasyon Ücreti</p>
			<p class="text-lg font-semibold text-orange-600">
				{formatCurrency(financialStore.tfsOrganizationFee)}
			</p>
		</div>
		{#if financialStore.inflationRate > 0 && financialStore.tfsResult.principalPresentValue}
			<div class="rounded-lg bg-amber-50 dark:bg-amber-950 p-3 space-y-1">
				<p class="text-xs font-semibold text-amber-900 dark:text-amber-100">
					⚠️ Enflasyon Etkisi
				</p>
				<p class="text-xs text-amber-800 dark:text-amber-200">
					Alacağınız tutarın bugünkü değeri:
				</p>
				<p class="text-lg font-bold text-amber-900 dark:text-amber-100">
					{formatCurrency(financialStore.tfsResult.principalPresentValue)}
				</p>
				<p class="text-xs text-amber-700 dark:text-amber-300">
					Değer kaybı: {formatCurrency(financialStore.tfsResult.realValueLoss || 0)}
					({formatPercentage(financialStore.tfsResult.inflationImpact || 0)})
				</p>
			</div>
		{/if}
		<div class="pt-2 border-t">
			<p class="text-sm text-muted-foreground">Toplam Maliyet</p>
			<p class="text-2xl font-bold">
				{formatCurrency(financialStore.tfsResult.totalCost)}
			</p>
		</div>
	</Card.Content>
</Card.Root>

