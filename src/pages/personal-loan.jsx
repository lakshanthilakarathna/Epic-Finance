import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";

const whyChoose = [
  {
    title: "Borrow for What Matters",
    text: "Use funds for medical bills, holidays, renovations, and other important needs.",
  },
  {
    title: "Apply in Minutes",
    text: "Complete a simple online application without long forms or queues.",
  },
  {
    title: "Fast Decisions, Quick Access",
    text: "Approvals are often completed within hours with rapid fund availability.",
  },
  {
    title: "Support Beyond Credit Scores",
    text: "We review your overall position, not just a single file record.",
  },
  {
    title: "Flexible Repayment Terms",
    text: "Choose weekly, fortnightly, or monthly repayments to match your budget.",
  },
  {
    title: "Transparent and Honest",
    text: "Expect clear terms, practical advice, and no hidden surprises.",
  },
];

const faqs = [
  {
    question: "What can I use a personal loan for?",
    answer:
      "Personal loans can be used for many needs, including bills, travel, renovations, medical costs, or other planned expenses.",
  },
  {
    question: "How fast can I get the money?",
    answer:
      "Timing depends on lender checks and document completion, but many applications are processed quickly with same-day outcomes possible.",
  },
  {
    question: "Do I need perfect credit to apply?",
    answer:
      "No. We assess your full financial profile and can often find options even if your credit history is not perfect.",
  },
  {
    question: "Can I repay the loan early?",
    answer:
      "In many cases yes, though early repayment terms can vary by lender. We will explain any fees or conditions before you proceed.",
  },
];

const Service4 = () => {
  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Service"} pageTitle={"Personal Loan"} />

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">A Loan That Fits Your Life</h3>
          <p className="mil-mb-30">
            From covering unexpected bills to ticking off a long-awaited project, our personal
            loans are designed to make life easier. With flexible terms, a quick online process,
            and real people ready to help, getting the funds you need does not have to be
            complicated.
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
          <h3 className="mil-mb-30">Why Choose Our Personal Loans?</h3>
          <p className="mil-mb-60">
            We make personal finance simple, transparent, and accessible to everyone.
          </p>
          <div className="mil-why-choose-grid">
            {whyChoose.map((item, idx) => (
              <article className="mil-why-choose-card" key={`pl-why-${idx}`}>
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
          <h3 className="mil-mb-15">Ready to Make Life Easier?</h3>
          <p className="mil-mb-30">
            Apply for a personal loan today and get the funds you need when you need them.
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
            Everything you need to know about our personal loan options.
          </p>
          <div>
            {faqs.map((item, idx) => (
              <div key={`pl-faq-${idx}`}>
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

export default Service4;
