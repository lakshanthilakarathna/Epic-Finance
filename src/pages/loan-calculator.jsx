import Layouts from "@/src/layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";
import LoanCalculatorWidget from "@/src/components/LoanCalculatorWidget";

const LoanCalculatorPage = () => {
  return (
    <Layouts>
      <PageBanner pageName={"Loan Calculator"} pageTitle={"Calculate Your Loan"} />

      <section className="mil-contact mil-loan-calculator mil-p-120-60">
        <div className="container">
          <div className="mil-mb-60">
            <h3 className="mil-mb-20">Loan Calculator</h3>
            <p>
              Calculate your loan payments and find the perfect loan terms for your needs.
              Get instant estimates with our free calculator.
            </p>
          </div>

          <LoanCalculatorWidget />
        </div>
      </section>
    </Layouts>
  );
};

export default LoanCalculatorPage;
