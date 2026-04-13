import Layouts from "@/src/layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";
import Link from "next/link";

const SitemapPage = () => {
  return (
    <Layouts>
      <PageBanner pageName="Sitemap" pageTitle="All pages" />
      <section className="mil-p-120-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <p className="mil-mb-60">
                Quick links to every section of the Epic Finance website.
              </p>

              <h4 className="mil-list-title mil-mb-20">Main</h4>
              <ul className="mil-mb-40">
                <li className="mil-mb-10">
                  <Link href="/">Home</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/about">About us</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/contact">Contact us</Link>
                </li>
              </ul>

              <h4 className="mil-list-title mil-mb-20">Services</h4>
              <ul className="mil-mb-40">
                <li className="mil-mb-10">
                  <Link href="/car-finance">Car finance</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/boat-motorbike-caravan-loans">
                    Boat, motorbike &amp; caravan loans
                  </Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/commercial-vehicle-loan">
                    Commercial vehicle loan
                  </Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/personal-loan">Personal loan</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/debt-consolidation-loans">
                    Debt consolidation loans
                  </Link>
                </li>
              </ul>

              <h4 className="mil-list-title mil-mb-20">Apply &amp; tools</h4>
              <ul className="mil-mb-40">
                <li className="mil-mb-10">
                  <Link href="/loan-application">Loan application</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/loan-calculator">Loan calculator</Link>
                </li>
              </ul>

              <h4 className="mil-list-title mil-mb-20">Legal &amp; support</h4>
              <ul className="mil-mb-40">
                <li className="mil-mb-10">
                  <Link href="/privacy-policy">Privacy policy</Link>
                </li>
                <li className="mil-mb-10">
                  <Link href="/complaints-feedback">Complaints &amp; feedback</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default SitemapPage;
