# Finansman Karşılaştırma Aracı (Financial Comparison Tool)

A modern, responsive web application built with SvelteKit and shadcn-svelte that helps users compare the total cost of traditional bank loans versus Tasarruf Finansman System (TFS).

![SvelteKit](https://img.shields.io/badge/SvelteKit-5.0-FF3E00?style=flat&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## Features

- 🧮 **Accurate Financial Calculations**: Standard amortization formulas for bank loans and TFS cost modeling
- 📊 **Interactive Visualizations**: Real-time bar charts showing cost differences across delivery months
- 🎯 **Dynamic Delivery Month**: Slider to test different delivery scenarios
- 📱 **Fully Responsive**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Real-time Updates**: All calculations update instantly as you change inputs
- 🎨 **Clean UI**: Built with shadcn-svelte components for a modern, professional look
- 🌍 **Turkish Locale**: Currency and number formatting in Turkish format
- ⚙️ **No Backend Required**: Runs entirely client-side with zero latency

## What Does It Compare?

### Bank Loan
- Calculates monthly payments using standard amortization formula
- Shows total interest paid over the loan term
- Displays total cost (principal + interest)

### Tasarruf Finansman System (TFS)
- Equal monthly savings plan
- Delivery at user-selected month
- Total cost = principal + organization fee
- No interest charges

## Technologies

- **Framework**: SvelteKit 5.0 (with Svelte 5 runes)
- **UI Components**: shadcn-svelte
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript
- **Deployment**: Cloudflare Pages/Workers

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/DeferredFinance.git
cd DeferredFinance

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the application.

## Usage

1. **Set General Parameters**
   - Enter the target amount (principal)

2. **Configure Bank Loan**
   - Set annual interest rate
   - Set loan term in months

3. **Configure Tasarruf Finansman**
   - Set TFS term in months
   - Set organization fee
   - Use slider to select delivery month

4. **View Results**
   - Compare total costs side-by-side
   - See which option is more advantageous
   - Review the visualization showing cost differences across all delivery months

## Project Structure

```
DeferredFinance/
├── src/
│   ├── lib/
│   │   ├── components/ui/     # shadcn-svelte components
│   │   ├── stores/            # Reactive state management
│   │   │   └── financialStore.svelte.ts
│   │   └── utils/             # Utility functions
│   │       ├── financial.ts   # Financial calculation logic
│   │       └── utils.ts       # UI utilities
│   └── routes/
│       ├── +layout.svelte     # App layout
│       └── +page.svelte       # Main comparison page
├── docs/
│   └── steps.md              # Development checklist
├── DEPLOYMENT.md             # Deployment instructions
├── components.json           # shadcn-svelte config
├── wrangler.toml            # Cloudflare config
└── package.json
```

## Key Components

### Financial Calculations (`src/lib/utils/financial.ts`)

- `calculateLoan()`: Standard amortization formula for bank loans
- `calculateTFS()`: Tasarruf Finansman cost calculation
- `compareOptions()`: Comparison logic determining better option
- `generateMonthlyComparison()`: Data for visualization chart

### Reactive Store (`src/lib/stores/financialStore.svelte.ts`)

- Uses Svelte 5 runes (`$state`, `$derived`)
- Real-time reactivity on all inputs
- Automatic validation
- Computed comparison results

## Building for Production

```bash
# Build the application
pnpm run build

# Preview production build locally
pnpm run preview
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Cloudflare Pages/Workers.

Quick deploy:
```bash
pnpm run build
npx wrangler pages deploy .svelte-kit/cloudflare
```

## Development Roadmap

- [x] Core financial calculations
- [x] Responsive UI with shadcn-svelte
- [x] Interactive delivery month slider
- [x] Visual comparison chart
- [x] Production build
- [x] Cloudflare deployment setup
- [ ] Add inflation rate adjustments
- [ ] Export comparison as PDF
- [ ] Add more financial products
- [ ] Multi-language support

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ using SvelteKit and shadcn-svelte
