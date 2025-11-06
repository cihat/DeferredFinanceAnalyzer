<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Genel Parametreler</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="space-y-2">
			<Label for="principal">Hedef Tutar (₺)</Label>
			<Input
				id="principal"
				type="number"
				value={financialStore.principal}
				oninput={(e: Event) => financialStore.setPrincipal(Number((e.target as HTMLInputElement).value))}
				min="0"
				step="10000"
			/>
			<p class="text-xs text-muted-foreground">
				{formatCurrency(financialStore.principal)}
			</p>
		</div>

		<div class="space-y-2">
			<Label for="inflation-rate">
				Aylık Enflasyon Oranı (%)
				<span class="text-xs text-muted-foreground ml-1">
					(TÜİK'in açıkladığı aylık oran)
				</span>
			</Label>
			<Input
				id="inflation-rate"
				type="number"
				value={financialStore.inflationRate}
				oninput={(e: Event) => financialStore.setInflationRate(Number((e.target as HTMLInputElement).value))}
				min="0"
				step="0.01"
			/>
			<p class="text-xs text-muted-foreground">
				Örnek: TÜİK aylık %2.5 enflasyon açıkladıysa, 2.5 yazın
			</p>
		</div>
	</Card.Content>
</Card.Root>

