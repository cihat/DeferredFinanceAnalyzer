<script lang="ts">
	import {
		GeneralParameters,
		LoanParameters,
		TfsParameters,
		LoanSummaryCard,
		TfsSummaryCard,
		ComparisonResult,
		MonthlyAnalysisChart
	} from '$lib/components/financial';
</script>

<div class="container mx-auto p-4 md:p-8 max-w-7xl">
	<div class="mb-4">
		<h1 class="text-3xl font-bold mb-2">Finansman Karşılaştırma Aracı</h1>
		<p class="text-muted-foreground">
			Banka kredisi ile Tasarruf Finansman Sistemleri(Evim Sistemleri) arasındaki farkı hesaplayın
		</p>
		<p class="text-muted-foreground text-sm mt-2 font-bold max-w-xl">
			Bu aracı kullanarak, Banka Kredisi ile Tasarruf Finansman Sistemi arasındaki farkı kabaca hesaplayabilirsiniz. 
			Degisen Enflasyon faktörleri hesaplamaya dahil edilmemektedir.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Input Form -->
		<div class="lg:col-span-1 space-y-6">
			<GeneralParameters />
			<LoanParameters />
			<TfsParameters />
		</div>

		<!-- Results Section -->
		<div class="lg:col-span-2 space-y-6">
			<!-- Summary Cards -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<LoanSummaryCard />
				<TfsSummaryCard />
			</div>

			<!-- Comparison Result -->
			<ComparisonResult />

			<!-- Monthly Comparison Chart -->
			<MonthlyAnalysisChart />
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: system-ui, -apple-system, sans-serif;
	}
</style>
