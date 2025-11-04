# Prompt for Building the Comparison Tool (Svelte + svelte-shadcn)

Create a minimal, deterministic web application in **Svelte** using **svelte-shadcn** components. The app must compute and compare the total financial outcome of:

1. Taking a **bank loan** with interest.  
2. Joining a **Tasarruf Finansman System** with dynamic delivery month (month when the user’s turn comes).

## Requirements

### Core Inputs
- `principal`: the target amount.  
- `loan_interest_rate`: annual or monthly interest rate.  
- `loan_term_months`: duration of the bank loan.  
- `tfs_term_months`: duration of the Tasarruf Finansman plan.  
- `tfs_org_fee`: fixed or percentage-based organization fee.  
- `delivery_month`: dynamic month (1…tfs_term_months) at which the system grants the house/car.

### Computation Rules

#### Bank Loan
- Monthly payment:  
  `M = P * r * (1+r)^n / ((1+r)^n - 1)`  
- Total loan cost:  
  `loan_total = M * n`.

#### Tasarruf Finansman
- Monthly saving:  
  `A = principal / tfs_term_months`.  
- Early delivery cash-flow adjustment:  
  - The user receives the full principal at `delivery_month`.  
  - User continues paying `A` until the end.  
- Total cost:  
  `tfs_total = principal + tfs_org_fee`.  
- Net advantage calculation for each possible delivery month:  
  `delta = loan_total - (tfs_total at delivery_month)`.

### Behaviour
- All metrics must update instantly on input change (reactive Svelte stores).  
- Delivery month must be a slider with dynamic recomputation.  
- The UI must display:
  - Total cost of loan.  
  - Total cost of Tasarruf Finansman.  
  - Profit/Loss comparison for each delivery month.  
  - A visual chart showing which option becomes better depending on delivery month.

### UI Rules
- Use svelte-shadcn for all inputs, sliders, cards, layout elements.  
- Strict, minimal styling.  
- No animations, no transitions, no decorative features.  
- A single-page structure.

### To-Do List (Step-by-Step)

- [ ] Install and configure svelte-shadcn.  
- [ ] Create the core input form using shadcn components.  
- [ ] Define reactive stores for all financial parameters.  
- [ ] Implement loan amortization formula.  
- [ ] Implement Tasarruf Finansman cash-flow and total-cost logic.  
- [ ] Implement dynamic delivery-month recomputation.  
- [ ] Add a comparison module returning cost difference per month.  
- [ ] Create a results panel using cards.  
- [ ] Add a chart (simple SVG or lightweight library) to visualize month-by-month delta.  
- [ ] Add boundary validation for all inputs.  
- [ ] Add minimal layout and typography.  
- [ ] Perform manual tests for multiple input combinations.  
- [ ] Produce a clean, self-contained build.
- [ ] Deploy the application to a cloudflare workers.

