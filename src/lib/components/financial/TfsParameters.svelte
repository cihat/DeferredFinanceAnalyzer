<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency, formatMonthLabel } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Tasarruf Finansman Sistemi</Card.Title>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="space-y-2">
			<Label for="tfs-term">Vade (Ay)</Label>
			<Input
				id="tfs-term"
				type="number"
				value={financialStore.tfsTermMonths}
				oninput={(e: Event) => financialStore.setTfsTermMonths(Number((e.target as HTMLInputElement).value))}
				min="6"
				step="1"
			/>
			<p class="text-xs text-muted-foreground">
				{formatMonthLabel(financialStore.tfsTermMonths)} (minimum 6 ay)
			</p>
		</div>

		<div class="space-y-2">
			<Label for="tfs-fee">Organizasyon Ücreti (₺)</Label>
			<Input
				id="tfs-fee"
				type="number"
				value={financialStore.tfsOrganizationFee}
				oninput={(e: Event) => financialStore.setTfsOrganizationFee(Number((e.target as HTMLInputElement).value))}
				min="0"
				step="1000"
			/>
			<p class="text-xs text-muted-foreground">
				{formatCurrency(financialStore.tfsOrganizationFee)}
			</p>
		</div>

		<div class="space-y-3">
			<Label for="delivery-month">
				Teslimat Ayı: <strong>{financialStore.deliveryMonth}</strong>
				<span class="text-muted-foreground text-xs ml-1">
					({formatMonthLabel(financialStore.deliveryMonth)})
				</span>
			</Label>
			<p class="text-xs text-amber-600 dark:text-amber-400">
				⚠️ İlk 150 gün içinde teslimat alınamaz (minimum 6. ay)
			</p>
			<Slider
				id="delivery-month"
				value={[financialStore.deliveryMonth]}
				onValueChange={(v: number[]) => financialStore.setDeliveryMonth(v[0])}
				min={6}
				max={financialStore.tfsTermMonths}
				step={1}
				class="cursor-pointer"
			/>
			<div class="flex justify-between text-xs text-muted-foreground">
				<span>6. ay (minimum)</span>
				<span>{financialStore.tfsTermMonths}. ay</span>
			</div>
		</div>
	</Card.Content>
</Card.Root>

