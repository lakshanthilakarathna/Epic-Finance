import { useState } from "react";
import PageBanner from "@/src/components/PageBanner";
import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
import { submitContact } from "@/src/lib/submitContact";

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.7351664622392!2d174.7826221!3d-36.8488182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d48053dad0fc7%3A0x198f22fa371c3349!2s307%2F88%20The%20Strand%2C%20Parnell%2C%20Auckland%201010%2C%20New%20Zealand!5e0!3m2!1sen!2slk!4v1776002400054!5m2!1sen!2slk";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      await submitContact({
        name: fullName,
        email,
        phone,
        message,
        source: "contact-page",
        marketingOptIn: false,
      });
      setStatus("success");
      setFeedback("Thank you — your message has been sent. We will get back to you soon.");
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong.");
    }
  };

  return (
    <Layouts>
      <PageBanner pageName="Contact Us" pageTitle="Get in touch" />
      <section className="mil-contact mil-p-120-0">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-8 col-xl-8 mil-mb-120">
              <form onSubmit={onSubmit}>
                <h4 className="mil-mb-30">Send us a message</h4>
                <p className="mil-mb-40 mil-dark-soft">
                  Have a question about vehicle finance or your application? Fill
                  in the form below and we&apos;ll get back to you.
                </p>
                <h4 className="mil-mb-30">
                  <span className="mil-accent">01.</span> Your details
                </h4>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mil-input-frame mil-dark-input mil-mb-30">
                      <label
                        className="mil-h6 mil-dark"
                        htmlFor="contact-page-fullname"
                      >
                        <span>Full name</span>
                      </label>
                      <input
                        id="contact-page-fullname"
                        type="text"
                        name="fullName"
                        required
                        placeholder="Your full name"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mil-input-frame mil-dark-input mil-mb-30">
                      <label className="mil-h6" htmlFor="contact-page-email">
                        <span>Email address</span>
                      </label>
                      <input
                        id="contact-page-email"
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mil-input-frame mil-dark-input mil-mb-30">
                      <label className="mil-h6" htmlFor="contact-page-phone">
                        <span>Phone</span>
                      </label>
                      <input
                        id="contact-page-phone"
                        type="tel"
                        name="phone"
                        placeholder="+64 22 000 0000"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <h4 className="mil-mb-30">
                  <span className="mil-accent">02.</span> Your message
                </h4>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mil-input-frame mil-dark-input mil-mb-30">
                      <label className="mil-h6" htmlFor="contact-page-message">
                        <span>How can we help?</span>
                      </label>
                      <textarea
                        id="contact-page-message"
                        name="message"
                        required
                        placeholder="Tell us what you need help with"
                        className="mil-shortened"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  {feedback ? (
                    <div className="col-lg-12 mil-mb-30">
                      <p
                        className={
                          status === "success" ? "mil-dark-soft" : "mil-accent"
                        }
                        role="status"
                      >
                        {feedback}
                      </p>
                    </div>
                  ) : null}
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="mil-button mil-border mil-fw"
                      disabled={status === "sending"}
                    >
                      <span>{status === "sending" ? "Sending…" : "Submit"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-4 col-xl-3 mil-mb-120">
              <div className="mil-mb-60">
                <h5 className="mil-list-title mil-mb-30">Talk to Epic Finance</h5>
                <p className="mil-mb-20">
                  We&apos;re happy to answer questions about vehicle finance,
                  applications, and our services.
                </p>
                <p className="mil-mb-15">
                  <a href="tel:+64228548221" className="mil-accent">
                    +64 22 854 8221
                  </a>
                </p>
                <p className="mil-mb-30">
                  <a
                    href="mailto:info@epicfinance.co.nz"
                    className="mil-accent"
                  >
                    info@epicfinance.co.nz
                  </a>
                </p>
              </div>
              <div className="mil-divider mil-mb-60" />
              <h5 className="mil-list-title mil-mb-20">Quick links</h5>
              <ul className="mil-mb-30" style={{ listStyle: "none", padding: 0 }}>
                <li className="mil-mb-15">
                  <Link href="/loan-application" className="mil-link mil-link-sm">
                    <span>Apply now</span>
                    <i className="fas fa-arrow-right" />
                  </Link>
                </li>
                <li className="mil-mb-15">
                  <Link href="/loan-calculator" className="mil-link mil-link-sm">
                    <span>Loan calculator</span>
                    <i className="fas fa-arrow-right" />
                  </Link>
                </li>
                <li className="mil-mb-15">
                  <Link href="/privacy-policy" className="mil-link mil-link-sm">
                    <span>Privacy policy</span>
                    <i className="fas fa-arrow-right" />
                  </Link>
                </li>
                <li className="mil-mb-15">
                  <Link
                    href="/complaints-feedback"
                    className="mil-link mil-link-sm"
                  >
                    <span>Complaints &amp; feedback</span>
                    <i className="fas fa-arrow-right" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="mil-map-frame">
          <iframe
            src={MAP_EMBED_SRC}
            width={800}
            height={600}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Epic Finance office location, Flat 307, 88 The Strand, Parnell, Auckland"
          />
        </div>
        <div className="container" />
      </div>
      <section className="mil-p-120-60">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-xl-8">
              <div className="mil-mb-60">
                <h4 className="mil-mb-15">New Zealand</h4>
                <h5 className="mil-list-title mil-mb-20">Registered office</h5>
                <p className="mil-mb-20">
                  Flat 307, 88 The Strand
                  <br />
                  Parnell
                  <br />
                  Auckland 1010
                </p>
                <div className="mil-divider mil-divider-left mil-mb-30" />
                <ul
                  className="mil-mb-30 mil-dark-soft"
                  style={{ listStyle: "none", padding: 0 }}
                >
                  <li className="mil-mb-10">
                    <strong className="mil-dark">Company No.</strong> 9417044
                  </li>
                  <li className="mil-mb-10">
                    <strong className="mil-dark">NZBN</strong> 9429053561459
                  </li>
                  <li className="mil-mb-10">
                    <strong className="mil-dark">FSP number</strong> FSP1012234
                  </li>
                </ul>
                <h6 className="mil-mb-15">
                  <a href="tel:+64228548221" className="mil-accent">
                    +64 22 854 8221
                  </a>
                </h6>
                <h6>
                  <a
                    href="mailto:info@epicfinance.co.nz"
                    className="mil-accent"
                  >
                    info@epicfinance.co.nz
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default Contact;
