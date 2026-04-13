import { useMemo, useState } from "react";

const MIN_TERM = 12;
const MAX_TERM = 84;
const DEFAULT_TERM = 36;

const currency = new Intl.NumberFormat("en-NZ", {
  style: "currency",
  currency: "NZD",
  maximumFractionDigits: 2,
});

const toPositiveNumber = (value) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
};

const LoanCalculatorWidget = () => {
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(12.95);
  const [loanTerm, setLoanTerm] = useState(DEFAULT_TERM);

  const results = useMemo(() => {
    const principal = toPositiveNumber(loanAmount);
    const annualRate = toPositiveNumber(interestRate);
    const termMonths = Math.min(
      MAX_TERM,
      Math.max(MIN_TERM, Math.round(toPositiveNumber(loanTerm)))
    );

    if (principal === 0 || termMonths === 0) {
      return {
        monthlyPayment: 0,
        fortnightlyPayment: 0,
        weeklyPayment: 0,
        totalRepayment: 0,
        totalInterest: 0,
      };
    }

    const monthlyRate = annualRate / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate === 0) {
      monthlyPayment = principal / termMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, termMonths);
      monthlyPayment = (principal * monthlyRate * factor) / (factor - 1);
    }

    const totalRepayment = monthlyPayment * termMonths;
    const totalInterest = totalRepayment - principal;

    return {
      monthlyPayment,
      fortnightlyPayment: (monthlyPayment * 12) / 26,
      weeklyPayment: (monthlyPayment * 12) / 52,
      totalRepayment,
      totalInterest,
    };
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="mil-calculator-panel mil-mb-30">
            <h5 className="mil-mb-30">Loan Details</h5>

            <div className="mil-input-frame mil-dark-input mil-mb-30">
              <label className="mil-h6">Loan Amount</label>
              <input
                type="number"
                min="0"
                value={loanAmount}
                onChange={(event) => setLoanAmount(event.target.value)}
              />
              <p className="mil-text-sm">Specify the total amount you want to borrow.</p>
            </div>

            <div className="mil-input-frame mil-dark-input mil-mb-30">
              <label className="mil-h6">Interest Rate (%)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
              />
              <p className="mil-text-sm">Annual interest rate for the loan.</p>
            </div>

            <div className="mil-input-frame mil-dark-input mil-mb-20">
              <label className="mil-h6">Loan Term</label>
              <div className="mil-term-header">
                <span className="mil-accent">{loanTerm} months</span>
                <span className="mil-text-sm">
                  {MIN_TERM} months - {MAX_TERM} months
                </span>
              </div>
              <input
                type="range"
                min={MIN_TERM}
                max={MAX_TERM}
                value={loanTerm}
                onChange={(event) => setLoanTerm(Number(event.target.value))}
                className="mil-range-input"
              />
              <p className="mil-text-sm">The duration of the loan in months.</p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="mil-calculator-panel mil-mb-30">
            <h5 className="mil-mb-30">Payment Breakdown</h5>

            <div className="mil-result-card mil-mb-20">
              <p className="mil-text-sm">Monthly Payment</p>
              <h4>{currency.format(results.monthlyPayment)}</h4>
              <p className="mil-text-sm">Estimated monthly payment for your loan.</p>
            </div>

            <div className="mil-result-card mil-mb-20">
              <p className="mil-text-sm">Fortnightly installment</p>
              <h5>{currency.format(results.fortnightlyPayment)}</h5>
              <p className="mil-text-sm">
                Total repayment: {currency.format(results.totalRepayment)}
              </p>
            </div>

            <div className="mil-result-card">
              <p className="mil-text-sm">Weekly installment</p>
              <h5>{currency.format(results.weeklyPayment)}</h5>
              <p className="mil-text-sm">
                Total repayment: {currency.format(results.totalRepayment)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mil-calculator-panel">
        <h5 className="mil-mb-30">Loan Summary</h5>
        <div className="row">
          <div className="col-md-6">
            <div className="mil-summary-item mil-mb-20">
              <p className="mil-text-sm">Total repayment</p>
              <h4>{currency.format(results.totalRepayment)}</h4>
              <p className="mil-text-sm">Total amount payable over the loan period.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mil-summary-item mil-mb-20">
              <p className="mil-text-sm">Total Interest</p>
              <h4>{currency.format(results.totalInterest)}</h4>
              <p className="mil-text-sm">Total interest payable over the loan period.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculatorWidget;
