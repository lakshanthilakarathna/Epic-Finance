import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";

const whyChoose = [
  {
    title: "Adventure-Fit Finance",
    text: "Get a tailored loan for new or used purchases that matches your plans and budget.",
  },
  {
    title: "Simple, Fast Results",
    text: "Apply online and receive quick responses, often on the same day.",
  },
  {
    title: "Private Seller Support",
    text: "Finance options are available for private purchases, not just dealership sales.",
  },
  {
    title: "Flexible Deposit Choices",
    text: "Choose a structure with or without deposit based on what works for you.",
  },
  {
    title: "All Credit Situations",
    text: "We assess your full financial picture rather than relying on one score alone.",
  },
  {
    title: "Local Real Support",
    text: "Speak with a local team that understands your circumstances and goals.",
  },
];

const faqs = [
  {
    question: "Can I finance both the boat and the trailer together?",
    answer:
      "Yes. In many cases we can include related equipment like a trailer in one finance package, subject to lender assessment.",
  },
  {
    question: "Do you offer loans for second-hand boats or trailers?",
    answer:
      "Yes. We support both new and used recreational vehicle purchases, including second-hand options from dealers and private sellers.",
  },
  {
    question: "What if I've had credit issues in the past?",
    answer:
      "You can still apply. We review your current situation and work with lenders that consider more than just past credit events.",
  },
  {
    question: "How quickly can I get on the water?",
    answer:
      "If your documents are ready, approvals can be fast and many clients receive decisions within the same day.",
  },
];

const Service3 = () => {
  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Service"} pageTitle={"Commercial Vehicle Loan"} />

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">The Right Vehicle for the Job</h3>
          <p className="mil-mb-30">
            Whether you are a sole trader or running a growing business, we help you secure the
            vehicle you need to get the job done. From utes to vans and everything in between,
            our commercial vehicle loans include flexible terms, fast approvals, and
            straightforward support.
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
          <h3 className="mil-mb-30">Why Choose Commercial Vehicle Loan?</h3>
          <p className="mil-mb-60">
            We make commercial vehicle finance simple, transparent, and accessible to every business.
          </p>
          <div className="mil-why-choose-grid">
            {whyChoose.map((item, idx) => (
              <article className="mil-why-choose-card" key={`cv-why-${idx}`}>
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
          <h3 className="mil-mb-15">Ready to Grow Your Business?</h3>
          <p className="mil-mb-30">
            Apply for commercial vehicle finance today and get the tools you need to succeed.
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
            Everything you need to know about our commercial vehicle finance options.
          </p>
          <div>
            {faqs.map((item, idx) => (
              <div key={`cv-faq-${idx}`}>
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

export default Service3;
