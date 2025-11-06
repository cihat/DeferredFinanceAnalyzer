<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatMonthLabel } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Banka Kredisi</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="space-y-2">
			<Label for="loan-rate">
				Aylık Faiz Oranı (%)
				<span class="text-xs text-muted-foreground ml-1">
					(Bankanın ilan ettiği aylık oran)
				</span>
			</Label>
			<Input
				id="loan-rate"
				type="number"
				value={financialStore.loanInterestRate}
				oninput={(e: Event) => financialStore.setLoanInterestRate(Number((e.target as HTMLInputElement).value))}
				min="0"
				step="0.01"
			/>
			<p class="text-xs text-muted-foreground">
				Örnek: Banka %3 aylık faiz diyorsa, 3 yazın
			</p>
		</div>

		<div class="space-y-2">
			<Label for="loan-term">Vade (Ay)</Label>
			<Input
				id="loan-term"
				type="number"
				value={financialStore.loanTermMonths}
				oninput={(e: Event) => financialStore.setLoanTermMonths(Number((e.target as HTMLInputElement).value))}
				min="1"
				step="1"
			/>
			<p class="text-xs text-muted-foreground">
				{formatMonthLabel(financialStore.loanTermMonths)}
			</p>
		</div>
	</Card.Content>
</Card.Root>

