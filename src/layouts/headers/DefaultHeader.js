import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MOBILE_NAV_MQ = "(max-width: 1200px)";

const DefaultHeader = ({ transparent, headerTop, extarClass }) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    if (!toggle) setServicesOpen(false);
  }, [toggle]);

  useEffect(() => {
    const onRoute = () => {
      setServicesOpen(false);
      setToggle(false);
    };
    router.events.on("routeChangeComplete", onRoute);
    return () => router.events.off("routeChangeComplete", onRoute);
  }, [router]);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_NAV_MQ);
    const onChange = () => {
      if (!mql.matches) setServicesOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const handleServicesClick = (e) => {
    if (typeof window === "undefined") return;
    if (window.matchMedia(MOBILE_NAV_MQ).matches) {
      e.preventDefault();
      setServicesOpen((open) => !open);
    }
  };

  return (
    <div
      className={`mil-top-position mil-fixed ${extarClass ? extarClass : ""}`}
    >
      {headerTop && (
        <div className="mil-additional-panel">
          <div className="container-fluid">
            <ul className="mil-ap-list">
              <li>
                Phone: <span className="mil-accent">+64</span> 800 070 404
              </li>
              <li>hello@epicfinance.co.nz</li>
            </ul>
            <div className="mil-ap-call-to-action">
              <div className="mil-icon-frame mil-icon-frame-sm">
                <img src="img/icons/sm/4.svg" alt="icon" />
              </div>
              <p>Find out how Epic Finance can help you secure vehicle finance faster.</p>
            </div>
            <ul className="mil-ap-list">
              <li>
                <a href="#.">Apply</a>
              </li>
              <li>
                <a href="#.">English</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className={`mil-top-panel ${
          transparent ? "mil-top-panel-transparent mil-animated" : ""
        }`}
      >
        {/* mil-top-panel-transparent */}
        <div className="container">
          <Link href="/" legacyBehavior>
            <a className="mil-logo mil-header-logo"></a>
          </Link>
          <div className={`mil-navigation ${toggle ? "mil-active" : ""}`}>
            <nav>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li
                  className={`mil-has-children${
                    servicesOpen ? " mil-submenu-open" : ""
                  }`}
                >
                  <Link
                    href="/#services"
                    onClick={handleServicesClick}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    Services
                  </Link>
                  <ul>
                    <li>
                      <Link href="/car-finance">Car Finance</Link>
                    </li>
                    <li>
                      <Link href="/boat-motorbike-caravan-loans">
                        Boat, Motorbike &amp; Caravan Loans
                      </Link>
                    </li>
                    <li>
                      <Link href="/commercial-vehicle-loan">
                        Commercial Vehicle Loan
                      </Link>
                    </li>
                    <li>
                      <Link href="/personal-loan">Personal Loan</Link>
                    </li>
                    <li>
                      <Link href="/debt-consolidation-loans">
                        Debt Consolidation Loans
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
              </ul>
              <Link
                href="/loan-application"
                className={`mil-button mil-button-sm mil-header-apply ${
                  transparent ? "mil-border mil-light" : "mil-accent-bg"
                }`}
              >
                <span>Apply Now</span>
              </Link>
            </nav>
          </div>
          {/* mobile menu button */}
          <div
            className={`mil-menu-btn ${toggle ? "mil-active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <span />
          </div>
          {/* mobile menu button end */}
        </div>
      </div>
    </div>
  );
};
export default DefaultHeader;
