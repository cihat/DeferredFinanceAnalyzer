# Test Scenarios

## Testing the Financial Comparison Tool

Below are several test scenarios to verify the application works correctly across different use cases.

## Scenario 1: High Interest Rate Bank Loan

**Inputs:**
- Principal: ₺500,000
- Bank Loan Interest Rate: 3.5% annually
- Bank Loan Term: 120 months (10 years)
- TFS Term: 60 months (5 years)
- TFS Organization Fee: ₺10,000
- Delivery Month: 30

**Expected Results:**
- Bank loan should have significant interest costs
- TFS should be more advantageous in most scenarios
- Monthly payment for TFS should be higher than bank loan (shorter term)

## Scenario 2: Low Interest Rate

**Inputs:**
- Principal: ₺300,000
- Bank Loan Interest Rate: 1.0% annually
- Bank Loan Term: 60 months
- TFS Term: 60 months
- TFS Organization Fee: ₺5,000
- Delivery Month: 30

**Expected Results:**
- Close competition between both options
- Delivery month choice becomes critical
- Lower TFS organization fee makes it competitive

## Scenario 3: Early Delivery vs Late Delivery

**Test A - Early Delivery (Month 10):**
- Principal: ₺400,000
- TFS Term: 48 months
- Delivery Month: 10

**Test B - Late Delivery (Month 40):**
- Principal: ₺400,000
- TFS Term: 48 months
- Delivery Month: 40

**Expected Results:**
- Both should show same TFS total cost (independent of delivery month)
- Bank loan cost remains constant
- Visualization should highlight selected month

## Scenario 4: Zero Interest Rate (Edge Case)

**Inputs:**
- Principal: ₺200,000
- Bank Loan Interest Rate: 0%
- Bank Loan Term: 36 months
- TFS Term: 36 months
- TFS Organization Fee: ₺8,000
- Delivery Month: 18

**Expected Results:**
- Bank loan total = principal (no interest)
- TFS total = principal + organization fee
- Bank loan should be cheaper (no interest vs organization fee)

## Scenario 5: Large Amount, Long Term

**Inputs:**
- Principal: ₺2,000,000
- Bank Loan Interest Rate: 2.8% annually
- Bank Loan Term: 240 months (20 years)
- TFS Term: 120 months (10 years)
- TFS Organization Fee: ₺50,000
- Delivery Month: 60

**Expected Results:**
- Very large interest amount on bank loan
- TFS significantly cheaper despite shorter term
- Higher monthly payments for TFS due to shorter duration

## Scenario 6: Responsive Design Test

**Actions:**
1. Open application on desktop (1920x1080)
2. Resize to tablet (768px)
3. Resize to mobile (375px)

**Expected Results:**
- Layout adapts smoothly to all screen sizes
- Input form stacks vertically on mobile
- Cards remain readable and accessible
- Chart visualization adapts to screen width
- No horizontal scrolling on any device

## Scenario 7: Real-time Reactivity

**Actions:**
1. Set initial values
2. Slowly drag delivery month slider
3. Change interest rate incrementally
4. Modify principal amount

**Expected Results:**
- All results update instantly (no lag)
- Chart updates in real-time as slider moves
- No UI flickering or layout shifts
- Smooth transitions in visual elements

## Scenario 8: Input Validation

**Actions:**
1. Try entering negative values
2. Try entering zero
3. Try entering very large numbers
4. Try delivery month > TFS term

**Expected Results:**
- Negative values are prevented or clamped to 0
- Zero values handled gracefully (especially for interest rate)
- Large numbers formatted correctly with Turkish locale
- Delivery month automatically clamped to max TFS term

## Verification Checklist

- [ ] All calculations are mathematically correct
- [ ] Currency formatting shows Turkish Lira (₺) with proper separators
- [ ] Percentage formatting is correct
- [ ] Month labels show years and months correctly
- [ ] Chart visualization is accurate
- [ ] Better option is correctly highlighted
- [ ] Responsive design works on all devices
- [ ] No console errors
- [ ] No visual glitches or layout issues
- [ ] All inputs validate correctly

## Manual Calculation Verification

For Scenario 1 (Principal: ₺500,000, Rate: 3.5% annual, Term: 120 months):

**Bank Loan Calculation:**
- Monthly rate: 3.5% / 12 = 0.2917%
- Monthly payment: P * r * (1+r)^n / ((1+r)^n - 1)
- Using formula: ≈ ₺4,944
- Total cost: ₺4,944 * 120 ≈ ₺593,280
- Total interest: ≈ ₺93,280

**TFS Calculation:**
- Monthly payment: ₺500,000 / 60 = ₺8,333
- Total cost: ₺500,000 + ₺10,000 = ₺510,000

**Comparison:**
- TFS saves: ₺593,280 - ₺510,000 = ₺83,280
- Percentage: (83,280 / 593,280) * 100 ≈ 14.04%

Compare these manual calculations with application output to verify accuracy.

