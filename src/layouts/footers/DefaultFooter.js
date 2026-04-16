import Link from "next/link";

const DefaultFooter = () => {
  return (
    <footer className="mil-dark-bg">
      <img src="img/deco/map.png" alt="background" className="mil-footer-bg" />
      <div className="container">
        <div className="mil-footer-content mil-p-120-90">
          <div className="row justify-content-between align-items-center">
            <div className="col-xl-4 mil-mb-30">
              <img
                src="/img/logo/footer%20logo.png"
                width={6414}
                height={2825}
                alt="Epic Finance"
                className="mil-logo mil-mb-30"
                style={{ width: 140, height: "auto" }}
              />
              <p className="mil-light-soft mil-mb-30">
                Epic Finance makes vehicle finance simple, fast, and transparent
                for people across New Zealand with support you can trust.
              </p>
              <Link
                href="/loan-application"
                className="mil-button mil-accent-bg mil-fw mil-mb-15"
              >
                <span>Apply Now</span>
              </Link>
              <Link
                href="/loan-calculator"
                className="mil-button mil-border mil-light mil-fw"
              >
                <span>Loan Calculator</span>
              </Link>
            </div>
            <div className="col-xl-7 mil-mt-60-adapt">
              <div className="row">
                <div className="col-lg-7 mil-mb-30">
                  <h3 className="mil-light mil-up-font mil-mb-30">
                    Join the <span className="mil-accent">Epic Finance</span>{" "}
                    <br />
                    journey
                  </h3>
                  <p className="mil-light-soft">
                    Apply with confidence and get support
                    <br /> tailored to your situation.
                  </p>
                </div>
                <div className="col-lg-5 mil-mb-30">
                  <p className="mil-light-soft mil-mb-15 mil-text-sm">
                    Questions or updates? Reach us on the contact page or by email.
                  </p>
                  <Link
                    href="/contact"
                    className="mil-button mil-accent-bg mil-fw mil-mb-10"
                  >
                    <span>Contact us</span>
                  </Link>
                  <a
                    href="mailto:info@epicfinance.co.nz"
                    className="mil-button mil-border mil-light mil-fw"
                  >
                    <span>info@epicfinance.co.nz</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mil-divider mil-light" />
        <div className="mil-footer-links">
          <ul className="mil-social mil-light">
            <li className="mil-adapt-links">
              <a href="#.">Facebook</a>
              <a href="#.">FB</a>
            </li>
            <li className="mil-adapt-links">
              <a href="#.">Instagram</a>
              <a href="#.">IG</a>
            </li>
            <li className="mil-adapt-links">
              <a href="#.">LinkedIn</a>
              <a href="#.">IN</a>
            </li>
            <li className="mil-adapt-links">
              <a href="#.">Twitter</a>
              <a href="#.">TW</a>
            </li>
            <li className="mil-adapt-links">
              <a href="#.">YouTube</a>
              <a href="#.">YT</a>
            </li>
          </ul>
          <ul className="mil-additional-links mil-light">
            <li>
              <a href="#.">Terms &amp; conditions</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <Link href="/complaints-feedback">Complaints &amp; feedback</Link>
            </li>
            <li>
              <Link href="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mil-footer-bottom">
        <div className="container">
          <p className="mil-text-sm mil-light">
            © {new Date().getFullYear()} Epic Finance Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default DefaultFooter;
