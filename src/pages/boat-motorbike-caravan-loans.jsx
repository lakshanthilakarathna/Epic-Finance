import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";

const whyChoose = [
  {
    title: "Healthy Cash Flow",
    text: "Leasing helps manage costs while keeping working capital available for operations.",
  },
  {
    title: "Tailored to Your Work",
    text: "From one vehicle to a full fleet, we shape a plan for current and future needs.",
  },
  {
    title: "Fast Setup Process",
    text: "Move quickly with a smooth, focused process and responsive support.",
  },
  {
    title: "Built-In Upgrade Flexibility",
    text: "Scale or refresh your vehicles as your business evolves.",
  },
  {
    title: "Ongoing Support",
    text: "Get help beyond paperwork with guidance throughout your finance term.",
  },
  {
    title: "Sole Traders Welcome",
    text: "Whether you run solo or manage a larger team, we can support your plans.",
  },
];

const faqs = [
  {
    question: "Can I lease more than one vehicle?",
    answer:
      "Yes. We can structure leases for single vehicles or multi-vehicle fleets, depending on your business needs and lender approval.",
  },
  {
    question: "Is leasing better than buying for my business?",
    answer:
      "It depends on your cash flow, tax position, and long-term plans. Leasing can reduce upfront costs and keep capital free for operations.",
  },
  {
    question: "Can I get a lease if I'm a sole trader?",
    answer:
      "Absolutely. Sole traders are welcome, and we work with lenders who support small and growing businesses.",
  },
  {
    question: "What happens at the end of the lease?",
    answer:
      "End-of-term options vary by agreement and may include upgrading, refinancing, or finalizing ownership terms. We guide you through the best option.",
  },
];

const Service2 = () => {
  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Service"} pageTitle={"Boat, Motorbike & Caravan Loans"} />

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">Financing for Boats, Motorbikes, Caravans & More</h3>
          <p className="mil-mb-30">
            At Epic Finance, we provide tailored funding solutions for a wide range of
            recreational vehicles. Whether you are purchasing a motorbike for convenience, a
            boat for leisure, or a caravan for travel, we connect you with competitive finance
            options designed to suit your goals and financial situation.
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
          <h3 className="mil-mb-30">Why Choose Our Business Leasing?</h3>
          <p className="mil-mb-60">
            We make recreational vehicle finance simple, transparent, and accessible to everyone.
          </p>
          <div className="mil-why-choose-grid">
            {whyChoose.map((item, idx) => (
              <article className="mil-why-choose-card" key={`rv-why-${idx}`}>
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
          <h3 className="mil-mb-15">Ready to Hit the Road or Water?</h3>
          <p className="mil-mb-30">
            Apply for recreational vehicle finance today and start your adventure sooner.
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
            Everything you need to know about our recreational vehicle finance options.
          </p>
          <div>
            {faqs.map((item, idx) => (
              <div key={`rv-faq-${idx}`}>
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

export default Service2;
