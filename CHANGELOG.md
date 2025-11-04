# Changelog

All notable changes to the Financial Comparison Tool will be documented in this file.

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
- **Latest URL**: https://fbec739a.deferredfinance.pages.dev

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

