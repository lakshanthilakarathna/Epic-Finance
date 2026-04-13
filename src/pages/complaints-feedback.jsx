import Layouts from "@/src/layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";
import { useMemo, useState } from "react";

const REQUIRED_FIELDS = ["fullName", "email", "complaintType", "description"];

const initialData = {
  fullName: "",
  email: "",
  phone: "",
  accountNumber: "",
  complaintType: "",
  description: "",
  preferredContactMethod: "Email",
};

const ComplaintsFeedbackPage = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const groupedErrors = useMemo(
    () => Object.keys(errors).filter((key) => errors[key]).length,
    [errors]
  );

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    updateField(name, value);
  };

  const validate = () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      if (String(formData[field]).trim() === "") {
        nextErrors[field] = "This field is required.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);
    if (!validate()) return;
    setSubmitted(true);
  };

  const renderError = (name) =>
    errors[name] ? <p className="mil-text-sm mil-accent">{errors[name]}</p> : null;

  return (
    <Layouts footer={1}>
      <PageBanner pageName={"Complaints & Feedback"} pageTitle={"Submit a Complaint"} />

      <section className="mil-contact mil-loan-application mil-p-120-60">
        <div className="container">
          <div className="mil-mb-60">
            <h3 className="mil-mb-20">Complaints & Feedback</h3>
            <p className="mil-mb-15">
              We value your feedback and take all complaints seriously. Submit your concerns
              and we&apos;ll investigate thoroughly.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <h4 className="mil-mb-20">Submit a Complaint</h4>
            <p className="mil-mb-30">
              We take all complaints seriously and will investigate them thoroughly.
            </p>

            <div className="row">
              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Full Name *</label>
                  <input
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={onInputChange}
                  />
                  {renderError("fullName")}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={onInputChange}
                  />
                  {renderError("email")}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Phone Number</label>
                  <input
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Account Number (if applicable)</label>
                  <input
                    name="accountNumber"
                    placeholder="Enter your account number"
                    value={formData.accountNumber}
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Type of Complaint *</label>
                  <select
                    name="complaintType"
                    value={formData.complaintType}
                    onChange={onInputChange}
                  >
                    <option value="">Select complaint type</option>
                    <option value="Service Quality">Service Quality</option>
                    <option value="Application Process">Application Process</option>
                    <option value="Repayment Issue">Repayment Issue</option>
                    <option value="Staff Conduct">Staff Conduct</option>
                    <option value="Other">Other</option>
                  </select>
                  {renderError("complaintType")}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Preferred Contact Method</label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={onInputChange}
                  >
                    <option value="Email">Email</option>
                    <option value="Phone">Phone</option>
                  </select>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Description *</label>
                  <textarea
                    className="mil-shortened"
                    name="description"
                    placeholder="Please provide a detailed description of your complaint"
                    value={formData.description}
                    onChange={onInputChange}
                  />
                  {renderError("description")}
                </div>
              </div>
            </div>

            {groupedErrors > 0 && (
              <p className="mil-accent mil-mb-20">
                Please complete all required fields before submitting.
              </p>
            )}

            {submitted && (
              <p className="mil-mb-20" style={{ color: "#2e7d32" }}>
                Thank you. Your complaint has been recorded locally in this demo form.
              </p>
            )}

            <button className="mil-button mil-accent-bg mil-mb-60" type="submit">
              <span>Submit Complaint</span>
            </button>
          </form>

          <div className="mil-divider mil-mb-60" />

          <h4 className="mil-mb-20">Our Commitment</h4>
          <p className="mil-mb-30">
            We are committed to providing excellent customer service and resolving any issues
            you may have. All complaints are handled with confidentiality and professionalism.
          </p>

          <h4 className="mil-mb-20">What Happens Next?</h4>
          <ul className="mil-simple-list mil-mb-30">
            <li>We acknowledge your complaint within 24 hours</li>
            <li>We investigate your complaint thoroughly</li>
            <li>We provide a response within 2 business days</li>
            <li>We work to resolve the issue to your satisfaction</li>
          </ul>

          <h4 className="mil-mb-20">Contact Information</h4>
          <p className="mil-mb-10">
            <strong>Phone:</strong> +64 800 070 404
          </p>
          <p className="mil-mb-10">
            <strong>Email:</strong> hello@epicfinance.co.nz
          </p>
          <p className="mil-mb-30">
            <strong>Mail:</strong>
            <br />
            Auckland, New Zealand
          </p>

          <h4 className="mil-mb-20">External Dispute Resolution</h4>
          <p className="mil-mb-30">
            If you&apos;re not satisfied with our response, you can contact the Banking
            Ombudsman or the Financial Services Complaints Limited for independent dispute
            resolution.
          </p>
        </div>
      </section>
    </Layouts>
  );
};

export default ComplaintsFeedbackPage;
