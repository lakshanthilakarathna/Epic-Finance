import Link from "next/link";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";

const whyChoose = [
  {
    title: "Fast Approval Turnaround",
    text: "Get a response within hours, with full approvals often completed in a day.",
  },
  {
    title: "Rates That Make Sense",
    text: "Access competitive pricing from 8.95% through trusted lender options.",
  },
  {
    title: "No Deposit Options",
    text: "Apply even if you have not saved a deposit yet.",
  },
  {
    title: "All Credit Histories",
    text: "We consider a full picture and support applicants from varied credit backgrounds.",
  },
  {
    title: "Fully Online Process",
    text: "Complete everything from your phone or laptop without office visits.",
  },
  {
    title: "Clear and Simple Steps",
    text: "Move through straightforward stages with no hidden complexity.",
  },
];

const faqs = [
  {
    question: "Can I apply if I haven't chosen a car yet?",
    answer:
      "Yes. You can get pre-approval first, which helps you shop with confidence and know your budget range before choosing a vehicle.",
  },
  {
    question: "What's the difference between leasing and taking a loan?",
    answer:
      "A loan usually means you own the car after repayments are completed, while leasing can offer lower upfront costs and flexible upgrade options depending on your agreement.",
  },
  {
    question: "Do I need a deposit to get started?",
    answer:
      "Not always. We offer both deposit and no-deposit options, subject to lender criteria and your financial profile.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Many applications receive an initial response within hours, and full approval is often completed within one business day when documents are ready.",
  },
];

const Service1 = () => {
  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Service"} pageTitle={"Car Finance"} />

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">Drive Away with Ease</h3>
          <p className="mil-mb-30">
            Whether you're buying your first car or upgrading to something bigger, we're here
            to help you get on the road without the stress. At Epic Finance, our car loans and
            leasing options are built around your needs: quick approvals, clear terms, and a
            team that actually listens.
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
          <h3 className="mil-mb-30">Why Choose Our Car Loans?</h3>
          <p className="mil-mb-60">We make car finance simple, transparent, and accessible to everyone.</p>
          <div className="mil-why-choose-grid">
            {whyChoose.map((item, idx) => (
              <article className="mil-why-choose-card" key={`car-why-${idx}`}>
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
          <h3 className="mil-mb-15">Ready to Drive Your Dream Car?</h3>
          <p className="mil-mb-30">Apply for car finance today and get behind the wheel faster than you think.</p>
          <Link href="/loan-application" className="mil-button mil-accent-bg mil-mb-30">
            <span>Apply Now</span>
          </Link>
        </div>
      </section>

      <div className="container"><div className="mil-divider" /></div>

      <section className="mil-p-120-90">
        <div className="container">
          <h3 className="mil-mb-30">FAQs</h3>
          <p className="mil-mb-30">Everything you need to know about our car finance options.</p>
          <div>
            {faqs.map((item, idx) => (
              <div key={`car-faq-${idx}`}>
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

export default Service1;
