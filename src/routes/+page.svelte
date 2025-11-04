<script lang="ts">
	import { financialStore } from '$lib/stores/financialStore.svelte';
	import { formatCurrency, formatPercentage } from '$lib/utils/financial';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Slider } from '$lib/components/ui/slider';

	// Helper to format month display
	function formatMonthLabel(month: number): string {
		const years = Math.floor(month / 12);
		const months = month % 12;
		if (years === 0) return `${months} ay`;
		if (months === 0) return `${years} yıl`;
		return `${years} yıl ${months} ay`;
	}
</script>

<div class="container mx-auto p-4 md:p-8 max-w-7xl">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Finansman Karşılaştırma Aracı</h1>
		<p class="text-muted-foreground">
			Banka kredisi ile Tasarruf Finansman Sistemi arasındaki farkı hesaplayın
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Input Form -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Genel Parametreler -->
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
							oninput={(e) => financialStore.setPrincipal(Number(e.currentTarget.value))}
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
							oninput={(e) => financialStore.setInflationRate(Number(e.currentTarget.value))}
							min="0"
							step="0.01"
						/>
						<p class="text-xs text-muted-foreground">
							Örnek: TÜİK aylık %2.5 enflasyon açıkladıysa, 2.5 yazın
						</p>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- Banka Kredisi Parametreleri -->
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
							oninput={(e) => financialStore.setLoanInterestRate(Number(e.currentTarget.value))}
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
							oninput={(e) => financialStore.setLoanTermMonths(Number(e.currentTarget.value))}
							min="1"
							step="1"
						/>
						<p class="text-xs text-muted-foreground">
							{formatMonthLabel(financialStore.loanTermMonths)}
						</p>
					</div>
				</Card.Content>
			</Card.Root>

			<!-- TFS Parametreleri -->
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
							oninput={(e) => financialStore.setTfsTermMonths(Number(e.currentTarget.value))}
							min="1"
							step="1"
						/>
						<p class="text-xs text-muted-foreground">
							{formatMonthLabel(financialStore.tfsTermMonths)}
						</p>
					</div>

					<div class="space-y-2">
						<Label for="tfs-fee">Organizasyon Ücreti (₺)</Label>
						<Input
							id="tfs-fee"
							type="number"
							value={financialStore.tfsOrganizationFee}
							oninput={(e) => financialStore.setTfsOrganizationFee(Number(e.currentTarget.value))}
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
						<Slider
							id="delivery-month"
							value={[financialStore.deliveryMonth]}
							onValueChange={(v) => financialStore.setDeliveryMonth(v[0])}
							min={1}
							max={financialStore.tfsTermMonths}
							step={1}
							class="cursor-pointer"
						/>
						<div class="flex justify-between text-xs text-muted-foreground">
							<span>1. ay</span>
							<span>{financialStore.tfsTermMonths}. ay</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<!-- Results Section -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Summary Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<!-- Bank Loan Result -->
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

				<!-- TFS Result -->
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
			</div>

			<!-- Comparison Result -->
			<Card.Root
				class={financialStore.comparisonResult.betterOption === 'tfs'
					? 'border-2 border-green-500'
					: 'border-2 border-blue-500'}
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
					<div
						class="text-center p-6 rounded-lg border-2 transition-all"
						class:border-green-500={financialStore.comparisonResult.betterOption === 'tfs'}
						class:bg-green-50={financialStore.comparisonResult.betterOption === 'tfs'}
						class:dark:bg-green-950={financialStore.comparisonResult.betterOption === 'tfs'}
						class:border-blue-500={financialStore.comparisonResult.betterOption === 'loan'}
						class:bg-blue-50={financialStore.comparisonResult.betterOption === 'loan'}
						class:dark:bg-blue-950={financialStore.comparisonResult.betterOption === 'loan'}
					>
						<div class="flex items-center justify-center gap-2 mb-2">
							<span class="text-3xl">
								{financialStore.comparisonResult.betterOption === 'tfs' ? '🏆' : '🏦'}
							</span>
						</div>
						<p
							class="text-sm font-medium mb-1"
							class:text-green-700={financialStore.comparisonResult.betterOption === 'tfs'}
							class:dark:text-green-300={financialStore.comparisonResult.betterOption === 'tfs'}
							class:text-blue-700={financialStore.comparisonResult.betterOption === 'loan'}
							class:dark:text-blue-300={financialStore.comparisonResult.betterOption === 'loan'}
						>
							{financialStore.deliveryMonth}. Ayda Daha Avantajlı
						</p>
						<p
							class="text-3xl font-bold mb-2"
							class:text-green-800={financialStore.comparisonResult.betterOption === 'tfs'}
							class:dark:text-green-300={financialStore.comparisonResult.betterOption === 'tfs'}
							class:text-blue-800={financialStore.comparisonResult.betterOption === 'loan'}
							class:dark:text-blue-300={financialStore.comparisonResult.betterOption === 'loan'}
						>
							{financialStore.comparisonResult.betterOption === 'tfs'
								? 'Tasarruf Finansman'
								: 'Banka Kredisi'}
						</p>
						<p
							class="text-xl font-semibold mb-1"
							class:text-green-700={financialStore.comparisonResult.betterOption === 'tfs'}
							class:dark:text-green-400={financialStore.comparisonResult.betterOption === 'tfs'}
							class:text-blue-700={financialStore.comparisonResult.betterOption === 'loan'}
							class:dark:text-blue-400={financialStore.comparisonResult.betterOption === 'loan'}
						>
							{formatCurrency(Math.abs(financialStore.comparisonResult.difference))} tasarruf
						</p>
						<p
							class="text-sm font-medium"
							class:text-green-600={financialStore.comparisonResult.betterOption === 'tfs'}
							class:dark:text-green-400={financialStore.comparisonResult.betterOption === 'tfs'}
							class:text-blue-600={financialStore.comparisonResult.betterOption === 'loan'}
							class:dark:text-blue-400={financialStore.comparisonResult.betterOption === 'loan'}
						>
							({formatPercentage(financialStore.comparisonResult.savingsPercentage)} daha ucuz)
						</p>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div
							class="p-4 rounded-lg border-2 transition-all"
							class:border-blue-500={financialStore.comparisonResult.betterOption === 'loan'}
							class:bg-blue-50={financialStore.comparisonResult.betterOption === 'loan'}
							class:dark:bg-blue-950={financialStore.comparisonResult.betterOption === 'loan'}
							class:border-muted={financialStore.comparisonResult.betterOption !== 'loan'}
							class:bg-muted={financialStore.comparisonResult.betterOption !== 'loan'}
						>
							<p class="text-xs text-muted-foreground mb-1">Banka Kredisi</p>
							<p class="text-xl font-bold">
								{formatCurrency(financialStore.comparisonResult.loanTotal)}
							</p>
							{#if financialStore.comparisonResult.betterOption === 'loan'}
								<p class="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
									✓ {financialStore.deliveryMonth}. ayda en ucuz
								</p>
							{/if}
						</div>
						<div
							class="p-4 rounded-lg border-2 transition-all"
							class:border-green-500={financialStore.comparisonResult.betterOption === 'tfs'}
							class:bg-green-50={financialStore.comparisonResult.betterOption === 'tfs'}
							class:dark:bg-green-950={financialStore.comparisonResult.betterOption === 'tfs'}
							class:border-muted={financialStore.comparisonResult.betterOption !== 'tfs'}
							class:bg-muted={financialStore.comparisonResult.betterOption !== 'tfs'}
						>
							<p class="text-xs text-muted-foreground mb-1">Tasarruf Finansman</p>
							<p class="text-xl font-bold">
								{formatCurrency(financialStore.comparisonResult.tfsTotal)}
							</p>
							{#if financialStore.comparisonResult.betterOption === 'tfs'}
								<p class="text-xs text-green-700 dark:text-green-400 mt-2 font-medium">
									✓ {financialStore.deliveryMonth}. ayda en ucuz
								</p>
							{/if}
						</div>
					</div>

					{#if financialStore.inflationRate > 0 && financialStore.tfsResult.realValueLoss}
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

					<!-- En iyi teslimat ayı önerisi -->
					{@const bestMonthData = financialStore.monthlyComparisonData.reduce(
						(best, current) => {
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
					)}
					{#if bestMonthData && bestMonthData.month !== financialStore.deliveryMonth && Math.abs(
							(financialStore.inflationRate > 0 && bestMonthData.inflationAdjustedDifference
								? bestMonthData.inflationAdjustedDifference
								: bestMonthData.difference) -
								(financialStore.inflationRate > 0 &&
								financialStore.comparisonResult.inflationAdjustedDifference
									? financialStore.comparisonResult.inflationAdjustedDifference
									: financialStore.comparisonResult.difference)
						) > 1000}
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
														(financialStore.inflationRate > 0 &&
														financialStore.comparisonResult.inflationAdjustedDifference
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

			<!-- Monthly Comparison Chart -->
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
							{@const displayDifference =
								financialStore.inflationRate > 0 && data.inflationAdjustedDifference
									? data.inflationAdjustedDifference
									: data.difference}
							{@const maxDiff = Math.max(
								...financialStore.monthlyComparisonData.map((d) =>
									Math.abs(
										financialStore.inflationRate > 0 && d.inflationAdjustedDifference
											? d.inflationAdjustedDifference
											: d.difference
									)
								)
							)}
							<div class="flex items-center gap-2">
								<div class="w-16 text-sm text-muted-foreground shrink-0">
									{data.month}. ay
								</div>
								<div class="flex-1 h-8 relative">
									<div
										class="absolute top-0 h-full rounded transition-all"
										class:bg-green-500={displayDifference > 0}
										class:bg-red-500={displayDifference < 0}
										style="width: {Math.min(
											(Math.abs(displayDifference) / maxDiff) * 100,
											100
										)}%; opacity: {data.month === financialStore.deliveryMonth ? 1 : 0.6};"
									></div>
									{#if data.month === financialStore.deliveryMonth}
										<div
											class="absolute top-0 h-full border-2 border-white rounded pointer-events-none"
											style="width: {Math.min((Math.abs(displayDifference) / maxDiff) * 100, 100)}%;"
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
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: system-ui, -apple-system, sans-serif;
	}
</style>
