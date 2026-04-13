import Layouts from "@/src/layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";

const PrivacyPolicyPage = () => {
  return (
    <Layouts>
      <PageBanner pageName={"Privacy Policy"} pageTitle={"Your Privacy Matters"} />

      <section className="mil-p-120-60">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <p className="mil-mb-30">
                Your privacy is important to us. Learn how we collect, use, and protect
                your personal information.
              </p>

              <h4 className="mil-mb-20">Information We Collect</h4>
              <p className="mil-mb-30">
                We collect information you provide directly to us, such as when you create
                an account, apply for a loan, or contact us for support. This may include
                your name, email address, phone number, financial information, and other
                details necessary to process your application.
              </p>

              <h4 className="mil-mb-20">How We Use Your Information</h4>
              <p className="mil-mb-30">
                We use the information we collect to provide, maintain, and improve our
                services, process loan applications, communicate with you, and comply with
                legal obligations. We may also use your information for marketing purposes
                with your consent.
              </p>

              <h4 className="mil-mb-20">Information Sharing</h4>
              <p className="mil-mb-30">
                We do not sell, trade, or otherwise transfer your personal information to
                third parties without your consent, except as described in this policy. We
                may share your information with trusted third parties who assist us in
                operating our website and conducting our business.
              </p>

              <h4 className="mil-mb-20">Data Security</h4>
              <p className="mil-mb-30">
                We implement appropriate security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the internet is 100%
                secure.
              </p>

              <h4 className="mil-mb-20">Your Rights</h4>
              <p className="mil-mb-30">
                You have the right to access, update, or delete your personal information.
                You may also opt out of certain communications from us. To exercise these
                rights, please contact us using the information provided below.
              </p>

              <h4 className="mil-mb-20">Contact Us</h4>
              <p className="mil-mb-10">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mil-mb-10">
                <strong>Email:</strong>{" "}
                <a href="mailto:info@epicfinance.co.nz">info@epicfinance.co.nz</a>
              </p>
              <p className="mil-mb-10">
                <strong>Phone:</strong>{" "}
                <a href="tel:+64228548221">+64 22 854 8221</a>
              </p>
              <p className="mil-mb-30">
                <strong>Address:</strong> Auckland, New Zealand
              </p>

              <h4 className="mil-mb-20">Changes to This Policy</h4>
              <p className="mil-mb-30">
                We may update this Privacy Policy from time to time. We will notify you of
                any changes by posting the new Privacy Policy on this page and updating the
                Last Updated date.
              </p>

              <p className="mil-text-sm">
                <strong>Last updated:</strong> 10/04/2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layouts>
  );
};

export default PrivacyPolicyPage;
