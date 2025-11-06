<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="border-2">
	<Card.Header>
		<Card.Title class="text-lg">Banka Kredisi</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-3">
		<div>
			<p class="text-sm text-muted-foreground">Aylık Ödeme</p>
			<p class="text-2xl font-bold">
				{formatCurrency(financialStore.loanResult.monthlyPayment)}
			</p>
		</div>
		<div>
			<p class="text-sm text-muted-foreground">Toplam Faiz</p>
			<p class="text-lg font-semibold text-red-600">
				{formatCurrency(financialStore.loanResult.totalInterest)}
			</p>
		</div>
		<div class="pt-2 border-t">
			<p class="text-sm text-muted-foreground">Toplam Maliyet</p>
			<p class="text-2xl font-bold">
				{formatCurrency(financialStore.loanResult.totalCost)}
			</p>
		</div>
	</Card.Content>
</Card.Root>

