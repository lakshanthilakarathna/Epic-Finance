import ContactForm from "@/src/components/ContactForm";
import PageBanner from "@/src/components/PageBanner";
import ServicesSection from "@/src/components/sections/Services";
import Layouts from "@/src/layouts/Layouts";
import Link from "next/link";
const About = () => {
  return (
    <Layouts>
      <PageBanner pageName={"About us"} pageTitle={"Epic Finance"} />
      {/* call to action */}
      <section className="mil-p-120-60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 col-xl-6">
              <h4 className="mil-mb-60">
                Drive your future.{" "}
                <span className="mil-accent">We&apos;ll take care of the finance.</span>{" "}
                Simple vehicle finance for people across New Zealand—clear, fair, and built around you.
              </h4>
            </div>
            <div className="col-lg-12 col-xl-6">
              <div className="mil-adaptive-right">
                <Link
                  href="/contact"
                  className="mil-button mil-accent-bg mil-mr-15 mil-mb-30"
                >
                  <span>Get Started</span>
                </Link>
                <Link
                  href="/contact"
                  className="mil-button mil-border mil-mb-30"
                >
                  <span>Apply Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* call to action end */}
      {/* about */}
      <section className="mil-deep-bg mil-p-120-60">
        <div className="mil-deco" style={{ top: 0, left: "35%" }} />
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-5 mil-mb-60">
              <div className="mil-circle-illustration">
                <div className="mil-circle-bg" />
                <div className="mil-image-frame">
                  <img src="/img/faces/strong-team.webp" alt="" width={960} height={960} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <span className="mil-suptitle mil-suptitle-2 mil-mb-30">
                Company Overview
              </span>
              <h2 className="mil-mb-50">
                Finance that fits <br />
                <span className="mil-accent">real lives</span> across{" "}
                <span className="mil-accent">New Zealand</span>.
              </h2>
              <p className="mil-mb-30">
                At Epic Finance, we make it simple for people across New Zealand to access the finance they need, regardless of background, visa status, or financial situation. Whether you are a citizen, resident, student, or on a work visa, we are here to help you move forward with confidence.
              </p>
              <p className="mil-mb-50">
                We specialise in vehicle finance and work with a strong network of trusted lenders across New Zealand—so you get flexible solutions, competitive rates, and options tailored to your lifestyle without the stress of searching on your own.{" "}
                <strong>Epic Finance – Your journey, your choice, your way.</strong>
              </p>
              <p className="mil-mb-50 mil-text-sm">
                We believe everyone deserves access to fair and reliable financial solutions, no matter their circumstances.
              </p>
              <div className="row align-items-end">
                <div className="col-xl-7">
                  <ul className="mil-check-icon-list mil-mb-60">
                    <li>
                      <img src="img/icons/sm/12.svg" alt="" />
                      <span className="mil-dark">
                        Vehicle finance specialists with NZ-wide lender access.
                      </span>
                    </li>
                    <li>
                      <img src="img/icons/sm/12.svg" alt="" />
                      <span className="mil-dark">
                        Support for diverse situations—new arrivals, students, and self-employed.
                      </span>
                    </li>
                    <li>
                      <img src="img/icons/sm/12.svg" alt="" />
                      <span className="mil-dark">
                        Independent guidance—we compare options that suit you.
                      </span>
                    </li>
                    <li>
                      <img src="img/icons/sm/12.svg" alt="" />
                      <span className="mil-dark">
                        Straightforward process—clear communication from start to drive-away.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-xl-5">
                  <Link href="/contact" className="mil-post-sm mil-mb-60">
                    <div className="mil-cover-frame">
                      <img src="/img/faces/avatar-financer-1.webp" alt="Epic Finance team" width={192} height={192} />
                    </div>
                    <div className="mil-description">
                      <h4 className="mil-font-3 mil-accent">Talk to us</h4>
                      <p className="mil-text-sm">Your dedicated finance team</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about end */}
      {/* counters */}
      <section className="mil-p-120-60">
        <div className="mil-deco" style={{ top: 0, left: "25%" }} />
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="mil-h1">
                1000<span className="mil-accent">+</span>
              </div>
              <h6 className="mil-mb-60">Customers supported</h6>
              <h2 className="mil-mb-60">
                Real finance outcomes for everyday New Zealanders
              </h2>
            </div>
            <div className="col-lg-6">
              <h3 className="mil-mb-60">
                We focus on{" "}
                <span className="mil-accent">real solutions</span> that work for you—vehicle finance, trusted lenders, and support that respects your story.
              </h3>
              <div className="row">
                <div className="col-lg-6">
                  <h6 className="mil-mb-30">
                    <span className="mil-accent">500+</span>&nbsp; Loans approved
                  </h6>
                  <div className="mil-divider mil-divider-left mil-mb-60" />
                </div>
                <div className="col-lg-6">
                  <h6 className="mil-mb-30">
                    <span className="mil-accent">NZ</span>&nbsp; Nationwide lender network
                  </h6>
                  <div className="mil-divider mil-divider-left mil-mb-60" />
                </div>
                <div className="col-lg-6">
                  <h6 className="mil-mb-30">
                    <span className="mil-accent">Fast</span>&nbsp; Application turnaround
                  </h6>
                  <div className="mil-divider mil-divider-left mil-mb-60" />
                </div>
                <div className="col-lg-6">
                  <h6 className="mil-mb-30">
                    <span className="mil-accent">Clear</span>&nbsp; Fees &amp; terms explained
                  </h6>
                  <div className="mil-divider mil-divider-left mil-mb-60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* counters end */}
      <div className="container">
        <div className="mil-divider" />
      </div>
      <ServicesSection />
      <div className="container">
        <div className="mil-divider" />
      </div>
      {/* features */}
      <section className="mil-p-120-120">
        <div className="container">
          <span className="mil-suptitle mil-suptitle-2 mil-mb-30">
            Why Epic Finance
          </span>
          <h2 className="mil-mb-120">Why Choose Epic Finance?</h2>
          <p className="mil-mb-60">
            We focus on real solutions that work for you—not generic packages or pressure sales.
          </p>
          <div className="mil-divider" />
          <div className="mil-line-icon-box">
            <div className="row align-items-center">
              <div className="col-xl-2">
                <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                  <img src="img/icons/md/6.svg" alt="" />
                </div>
              </div>
              <div className="col-xl-4">
                <h4 className="mil-mb-30">We understand real situations</h4>
              </div>
              <div className="col-xl-6">
                <p className="mil-box-text mil-mb-30">
                  New to the country, self-employed, or a unique financial background—we take the time to understand your situation and find the right solution.
                </p>
              </div>
            </div>
          </div>
          <div className="mil-divider" />
          <div className="mil-line-icon-box">
            <div className="row align-items-center">
              <div className="col-xl-2">
                <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                  <img src="img/icons/md/10.svg" alt="" />
                </div>
              </div>
              <div className="col-xl-4">
                <h4 className="mil-mb-30">Experience you can rely on</h4>
              </div>
              <div className="col-xl-6">
                <p className="mil-box-text mil-mb-30">
                  Our team brings strong financial knowledge and hands-on experience to guide you through every step with clarity and confidence.
                </p>
              </div>
            </div>
          </div>
          <div className="mil-divider" />
          <div className="mil-line-icon-box">
            <div className="row align-items-center">
              <div className="col-xl-2">
                <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                  <img src="img/icons/md/2.svg" alt="" />
                </div>
              </div>
              <div className="col-xl-4">
                <h4 className="mil-mb-30">We work in your best interest</h4>
              </div>
              <div className="col-xl-6">
                <p className="mil-box-text mil-mb-30">
                  As an independent finance provider, we compare options across multiple lenders to secure the most suitable outcome for you.
                </p>
              </div>
            </div>
          </div>
          <div className="mil-divider" />
          <div className="mil-line-icon-box">
            <div className="row align-items-center">
              <div className="col-xl-2">
                <div className="mil-icon-frame mil-icon-frame-md mil-mb-30">
                  <img src="img/icons/md/4.svg" alt="" />
                </div>
              </div>
              <div className="col-xl-4">
                <h4 className="mil-mb-30">Simple, fast and transparent</h4>
              </div>
              <div className="col-xl-6">
                <p className="mil-box-text mil-mb-30">
                  No hidden fees or confusing terms—just clear communication, quick approvals, and support you can trust.
                </p>
              </div>
            </div>
          </div>
          <div className="mil-divider" />
        </div>
      </section>
      {/* features end */}
      {/* contact */}
      <ContactForm />
    </Layouts>
  );
};
export default About;
