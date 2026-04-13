import Link from "next/link";
import LoanCalculatorWidget from "../LoanCalculatorWidget";
import Content from "../../data/sections/loan-calculator-section.json";

const LoanCalculatorSection = () => {
  return (
    <section className="mil-loan-calculator mil-p-120-90">
      <div className="mil-deco" style={{ top: 0, right: "20%" }} />
      <div className="container">
        <h2 className="mil-mb-30">
          {Content.title.first}{" "}
          <span className="mil-accent">{Content.title.second}</span>
        </h2>
        <p className="mil-mb-60">{Content.description}</p>

        <LoanCalculatorWidget />

        <div className="mil-adaptive-right mil-mt-60">
          <Link href={Content.button.link} className="mil-button mil-border">
            <span>{Content.button.label}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculatorSection;
