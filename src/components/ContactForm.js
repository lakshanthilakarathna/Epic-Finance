import { useState } from "react";
import Link from "next/link";
import { submitContact } from "@/src/lib/submitContact";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      await submitContact({
        name,
        email,
        phone,
        message,
        source: "about",
        marketingOptIn,
      });
      setStatus("success");
      setFeedback("Thank you — your message has been sent. We will get back to you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setMarketingOptIn(false);
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong.");
    }
  };

  return (
    <section className="mil-contact mil-gradient-bg mil-p-120-0">
      <div
        className="mil-deco mil-deco-accent"
        style={{ top: 0, right: "10%" }}
      />
      <div className="container">
        <h2 className="mil-light mil-mb-90">
          Contact <span className="mil-accent">Us</span>
        </h2>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <div className="mil-input-frame mil-mb-30">
                <label htmlFor="about-contact-name">
                  <span className="mil-light">Name</span>
                  <span className="mil-accent">Required</span>
                </label>
                <input
                  id="about-contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Enter Your Name Here"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mil-input-frame mil-mb-30">
                <label htmlFor="about-contact-email">
                  <span className="mil-light">Email Address</span>
                  <span className="mil-accent">Required</span>
                </label>
                <input
                  id="about-contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mil-input-frame mil-mb-60">
                <label htmlFor="about-contact-phone">
                  <span className="mil-light">Phone</span>
                  <span className="mil-light-soft">Optional</span>
                </label>
                <input
                  id="about-contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <p className="mil-text-sm mil-light-soft mil-mb-60">
                To send documents, email us directly after we reply — file upload
                is not available in this form.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="mil-input-frame mil-mb-30">
                <label htmlFor="about-contact-message">
                  <span className="mil-light">Message</span>
                  <span className="mil-accent">Required</span>
                </label>
                <textarea
                  id="about-contact-message"
                  name="message"
                  required
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                />
              </div>
              <p className="mil-text-sm mil-light-soft mil-mb-15">
                We will process your personal information in accordance with our{" "}
                <Link href="/privacy-policy" className="mil-accent">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="mil-checbox-frame mil-mb-60">
                <input
                  className="mil-checkbox"
                  id="about-contact-news"
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                />
                <label
                  htmlFor="about-contact-news"
                  className="mil-text-sm mil-light"
                >
                  I would like to be contacted with news and updates about your{" "}
                  <Link href="/privacy-policy" className="mil-accent">
                    events and services
                  </Link>
                </label>
              </div>
            </div>
            <div className="col-12">
              {feedback ? (
                <p
                  className={`mil-mb-30 mil-text-sm ${
                    status === "success" ? "mil-light" : "mil-accent"
                  }`}
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}
              <button
                type="submit"
                className="mil-button mil-accent-bg mil-fw"
                disabled={status === "sending"}
              >
                <span>
                  {status === "sending" ? "Sending…" : "Send Message Now"}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default ContactForm;
