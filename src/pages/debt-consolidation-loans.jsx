import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";

const whyChoose = [
  {
    title: "One Monthly Repayment",
    text: "Combine multiple debts into one clear and manageable repayment plan.",
  },
  {
    title: "Competitive Rate Matching",
    text: "We compare trusted lenders to find a suitable lower-rate structure.",
  },
  {
    title: "Improved Cash Flow",
    text: "Reduce monthly pressure and create breathing room in your budget.",
  },
  {
    title: "Fast, Hassle-Free Processing",
    text: "Expect quick assessments and approvals, often completed within 24 hours.",
  },
  {
    title: "All Credit Types Considered",
    text: "Options may be available even with less-than-perfect credit history.",
  },
  {
    title: "Fully Online Experience",
    text: "From application to approval, everything can be handled remotely.",
  },
];

const faqs = [
  {
    question: "What is a debt consolidation loan used for?",
    answer:
      "It combines multiple debts into one loan, so you make one repayment instead of managing several accounts with different due dates.",
  },
  {
    question: "Will consolidating my debt save me money?",
    answer:
      "It can, depending on your current rates, fees, and loan term. We compare options to help you find a structure that reduces pressure and cost where possible.",
  },
  {
    question: "Can I apply if I've missed payments in the past?",
    answer:
      "Yes. Past missed payments do not automatically disqualify you. We review your current affordability and available lender options.",
  },
  {
    question: "What happens if I want to pay it off early?",
    answer:
      "Early repayment is often available, but terms differ by lender. We will clearly outline any potential break fees or conditions upfront.",
  },
];

const Service5 = () => {
  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Service"} pageTitle={"Debt Consolidation Loans"} />

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">One Simple Payment. Less Stress. More Control.</h3>
          <p className="mil-mb-30">
            Managing multiple debts can feel overwhelming. At Epic Finance, our Debt
            Consolidation Loans are designed to bring it all together into one easy-to-manage
            payment. Whether it is credit cards, personal loans, or store finance, we help
            simplify your finances and put you back in control.
          </p>
          <div className="mil-buttons-frame">
            <Link href="/loan-application" className="mil-button mil-accent-bg mil-mb-30">
              <span>Apply Now</span>
            </Link>
            <Link href="/loan-calculator" className="mil-button mil-border mil-mb-30">
              <span>Loan Calculator</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="container"><div className="mil-divider" /></div>

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">Why Choose Debt Consolidation Loan?</h3>
          <p className="mil-mb-60">
            We make debt consolidation simple, transparent, and accessible to everyone.
          </p>
          <div className="mil-why-choose-grid">
            {whyChoose.map((item, idx) => (
              <article className="mil-why-choose-card" key={`dc-why-${idx}`}>
                <div className="mil-why-choose-head mil-mb-20">
                  <div className="mil-number-icon mil-circle">
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <h5>{item.title}</h5>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="container"><div className="mil-divider" /></div>

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-15">Ready to Take Control?</h3>
          <p className="mil-mb-30">
            Apply for debt consolidation today and simplify your financial life.
          </p>
          <Link href="/loan-application" className="mil-button mil-accent-bg mil-mb-30">
            <span>Apply Now</span>
          </Link>
        </div>
      </section>

      <div className="container"><div className="mil-divider" /></div>

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">FAQs</h3>
          <p className="mil-mb-30">
            Everything you need to know about our debt consolidation options.
          </p>
          <div>
            {faqs.map((item, idx) => (
              <div key={`dc-faq-${idx}`}>
                <div className="mil-accordion">{item.question}</div>
                <div className="mil-panel">
                  <p className="mil-mb-30">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default Service5;
