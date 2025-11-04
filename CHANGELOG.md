# Changelog

All notable changes to the Financial Comparison Tool will be documented in this file.

## [1.3.0] - 2025-11-04

### 💡 Major Change: Monthly Inflation Rate Calculation

#### Breaking Change
- **Changed from annual to monthly inflation rate input**
- This matches how statistical agencies (like TÜİK in Turkey) publish inflation data
- Agencies report monthly CPI changes, not annual rates divided by 12

#### Updated Calculation
- Removed annual-to-monthly conversion (division by 12)
- Now uses monthly rate directly: `inflationDecimal = monthlyRate / 100`
- Formula: `PV = FV / (1 + inflation)^months`

#### UI Changes
- Label changed: "Yıllık Enflasyon Oranı" → "Aylık Enflasyon Oranı"
- Added helper text: "TÜİK'in açıkladığı aylık oran"
- Added example: "TÜİK aylık %2.5 enflasyon açıkladıysa, 2.5 yazın"
- Changed input step from 0.1 to 0.01 for more precision

#### Code Changes
- `TFSParams.annualInflationRate` → `TFSParams.monthlyInflationRate`
- `calculatePresentValue()` now uses monthly rate directly
- Updated store default from 3.0% to 2.5% monthly

#### Example Calculation
```
Principal: 500,000 TRY
Monthly Inflation: 2.5%
Delivery: 30 months

Present Value = 500,000 / (1.025)^30
              = 500,000 / 2.0976
              = 238,341 TRY
              
Value Loss = 261,659 TRY (52.3%)
```

#### Real-World Example
```
TÜİK Açıklaması: "Ekim ayında aylık enflasyon %2.88 oldu"
→ Uygulamaya: 2.88 yazın ✅
```

### 📝 Documentation
- Added `docs/MONTHLY_INFLATION_EXAMPLE.md` with:
  - CPI calculation methodology
  - Real TÜİK data examples (2023-2024)
  - Purchasing power loss calculations
  - Delivery month importance analysis

### 🌐 Deployment
- **Latest URL**: https://944d2a53.deferredfinance.pages.dev

---

## [1.2.0] - 2025-11-04

### 💡 Major Change: Monthly Interest Rate Calculation

#### Breaking Change
- **Changed from annual to monthly interest rate input**
- This matches how banks in Turkey actually publish loan rates
- Banks quote monthly nominal interest rates, not annual rates

#### Updated Calculation
- Removed annual-to-monthly conversion (division by 12)
- Now uses monthly rate directly: `r = monthlyRate / 100`
- Formula: `Payment = P × r × (1 + r)^n / ((1 + r)^n – 1)`

#### UI Changes
- Label changed: "Yıllık Faiz Oranı" → "Aylık Faiz Oranı"
- Added helper text: "Bankanın ilan ettiği aylık oran"
- Added example: "Örnek: Banka %3 aylık faiz diyorsa, 3 yazın"
- Changed input step from 0.1 to 0.01 for more precision

#### Code Changes
- `LoanParams.annualInterestRate` → `LoanParams.monthlyInterestRate`
- Updated all calculations to use monthly rate directly
- Updated store default from 2.5% to 3.0% monthly

#### Example Calculation
```
Principal: 1,000,000 TRY
Monthly Rate: 3% (0.03)
Term: 36 months

Payment = 1,000,000 × 0.04581 = 45,810 TRY/month
Total = 45,810 × 36 = 1,649,160 TRY
Interest = 649,160 TRY
```

### 📝 Documentation
- Added `docs/MONTHLY_RATE_EXAMPLE.md` with detailed examples
- Includes 3 realistic scenarios
- Explains KKDF and BSMV tax implications
- Clarifies difference between monthly and annual rates

### 🌐 Deployment
- **Latest URL**: https://56c49e11.deferredfinance.pages.dev

---

## [1.1.1] - 2025-11-04

### 🚀 Deployment Improvements
- Added `deploy` script to package.json for one-command deployment
- Added `deploy:build` script for build-only operations
- Added `deploy:push` script for deploy-only operations
- Updated deployment documentation

### 📝 Documentation
- Updated README.md with new deploy commands
- Updated DEPLOYMENT_INFO.md with deployment options

### 🌐 Deployment
- **Previous URL**: https://fbec739a.deferredfinance.pages.dev

---

## [1.1.0] - 2025-11-04

### ✨ Added - Inflation Feature

#### New Functionality
- **Inflation Rate Input**: Added annual inflation rate parameter (default: 3%)
- **Present Value Calculation**: Shows real value of money considering inflation
- **Value Loss Display**: Shows how much purchasing power is lost over time
- **Inflation-Adjusted Comparisons**: All comparisons now factor in inflation impact

#### UI Enhancements
- Inflation rate input field in General Parameters section
- Amber-colored warning card in TFS results showing:
  - Present value of principal at delivery month
  - Absolute value loss in currency
  - Percentage of value loss
- Enhanced monthly comparison chart with:
  - Inflation-adjusted differences
  - Per-month value loss percentages
  - Visual highlighting with amber colors
  - Explanatory notes about inflation impact

#### Technical Implementation
- `calculatePresentValue()`: New function using PV = FV / (1+i)^n formula
- Enhanced `calculateTFS()`: Returns inflation metrics
- Enhanced `compareOptions()`: Includes inflation-adjusted comparisons
- Enhanced `generateMonthlyComparison()`: Per-month inflation calculations
- Store updates: Added `inflationRate` state and setter

#### Formula
```
Present Value = Future Value / (1 + monthly_inflation_rate)^months
```

#### Example Impact
- **Scenario**: ₺500,000, 30-month delivery, 3% annual inflation
- **Result**: 
  - Nominal value: ₺500,000
  - Present value: ~₺464,500
  - Value loss: ~₺35,500 (7.1%)

### 📝 Documentation
- Added `docs/INFLATION_FEATURE.md`: Complete feature documentation
- Updated `README.md`: Added inflation features to feature list
- Updated `DEPLOYMENT_INFO.md`: Latest deployment URL

### 🚀 Deployment
- **New URL**: https://8c274ae1.deferredfinance.pages.dev
- **Previous**: https://556c2047.deferredfinance.pages.dev
- Platform: Cloudflare Pages

---

## [1.0.0] - 2025-11-04

### 🎉 Initial Release

#### Core Features
- Bank loan amortization calculator
- Tasarruf Finansman System cost calculator
- Side-by-side comparison
- Dynamic delivery month slider
- Visual comparison chart
- Responsive design (mobile, tablet, desktop)

#### Technologies
- SvelteKit 5.0 with Svelte runes
- shadcn-svelte UI components
- Tailwind CSS 4.0
- TypeScript
- Cloudflare Pages deployment

#### Components
- Financial calculation utilities
- Reactive store with Svelte 5 runes
- Input forms with validation
- Results dashboard with cards
- Month-by-month comparison visualization

#### Deployment
- **URL**: https://556c2047.deferredfinance.pages.dev
- Platform: Cloudflare Pages
- Build: Optimized (~31 KB gzipped)

---

## Version History

- **v1.1.0** - Inflation adjustment feature
- **v1.0.0** - Initial production release

