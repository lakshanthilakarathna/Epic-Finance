import Layouts from "@/src/layouts/Layouts";
import PageBanner from "@/src/components/PageBanner";
import {
  initialData,
  REQUIRED_FIELDS,
} from "@/src/config/loanApplicationForm";
import { submitLoanApplication } from "@/src/lib/submitLoanApplication";
import { useMemo, useState } from "react";

const LoanApplicationPage = () => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [fileNames, setFileNames] = useState({
    driverFront: "No file chosen",
    driverBack: "No file chosen",
    visaCopy: "No file chosen",
    passportCopy: "No file chosen",
  });
  const [fileSlots, setFileSlots] = useState({
    driverFront: null,
    driverBack: null,
    visaCopy: null,
    passportCopy: null,
  });
  const [fileInputKey, setFileInputKey] = useState(0);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

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
    const { name, type, value, checked } = event.target;
    updateField(name, type === "checkbox" ? checked : value);
  };

  const onFileChange = (name, event) => {
    const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
    setFileSlots((prev) => ({ ...prev, [name]: file }));
    setFileNames((prev) => ({
      ...prev,
      [name]: file ? file.name : "No file chosen",
    }));
  };

  const validate = () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach((field) => {
      const value = formData[field];
      const isEmpty =
        typeof value === "boolean" ? value !== true : String(value).trim() === "";
      if (isEmpty) {
        nextErrors[field] = "This field is required.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setStatus("idle");
    if (!validate()) return;
    setStatus("sending");
    try {
      const fd = new FormData();
      fd.append("payload", JSON.stringify(formData));
      const docKeys = ["driverFront", "driverBack", "visaCopy", "passportCopy"];
      for (const key of docKeys) {
        const f = fileSlots[key];
        if (f) fd.append(key, f, f.name);
      }
      await submitLoanApplication(fd);
      setStatus("success");
      setFeedback(
        "Thank you — your application has been sent. We will be in touch soon."
      );
      setFormData(initialData);
      setFileSlots({
        driverFront: null,
        driverBack: null,
        visaCopy: null,
        passportCopy: null,
      });
      setFileNames({
        driverFront: "No file chosen",
        driverBack: "No file chosen",
        visaCopy: "No file chosen",
        passportCopy: "No file chosen",
      });
      setFileInputKey((k) => k + 1);
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong. Please try again.");
    }
  };

  const renderError = (name) =>
    errors[name] ? <p className="mil-text-sm mil-accent">{errors[name]}</p> : null;

  return (
    <Layouts>
      <PageBanner pageName={"Loan Application"} pageTitle={"Apply with Epic Finance"} />
      <section className="mil-contact mil-loan-application mil-p-120-60">
        <div className="container">
          <form onSubmit={onSubmit}>
            <h4 className="mil-mb-60">
              <span className="mil-accent">01.</span> Personal Details
            </h4>
            <div className="row">
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">First Name *</label>
                  <input name="firstName" value={formData.firstName} onChange={onInputChange} />
                  {renderError("firstName")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Middle Name</label>
                  <input name="middleName" value={formData.middleName} onChange={onInputChange} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Last Name *</label>
                  <input name="lastName" value={formData.lastName} onChange={onInputChange} />
                  {renderError("lastName")}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                  />
                  {renderError("email")}
                </div>
              </div>
              <div className="col-lg-2">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Country Code</label>
                  <input
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Phone Number *</label>
                  <input name="phone" value={formData.phone} onChange={onInputChange} />
                  {renderError("phone")}
                </div>
              </div>
            </div>

            <h4 className="mil-mb-60">
              <span className="mil-accent">02.</span> Address Details
            </h4>
            <div className="row">
              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">House # and Street Address *</label>
                  <input
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={onInputChange}
                  />
                  {renderError("streetAddress")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">City *</label>
                  <input name="city" value={formData.city} onChange={onInputChange} />
                  {renderError("city")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">State/Region *</label>
                  <input
                    name="stateRegion"
                    value={formData.stateRegion}
                    onChange={onInputChange}
                  />
                  {renderError("stateRegion")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Country/Region Code *</label>
                  <input
                    name="countryRegionCode"
                    value={formData.countryRegionCode}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Postal Code *</label>
                  <input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={onInputChange}
                  />
                  {renderError("postalCode")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Months Lived at Address *</label>
                  <input
                    type="number"
                    name="monthsAtAddress"
                    value={formData.monthsAtAddress}
                    onChange={onInputChange}
                  />
                  {renderError("monthsAtAddress")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Date of Birth *</label>
                  <input
                    type="date"
                    placeholder="yyyy-mm-dd"
                    name="dob"
                    value={formData.dob}
                    onChange={onInputChange}
                  />
                  {renderError("dob")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Gender *</label>
                  <select name="gender" value={formData.gender} onChange={onInputChange}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {renderError("gender")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Marital Status *</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={onInputChange}
                  >
                    <option value="">Select status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="De Facto">De Facto</option>
                    <option value="Separated">Separated</option>
                  </select>
                  {renderError("maritalStatus")}
                </div>
              </div>
              <div className="col-lg-3">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Number of Dependants *</label>
                  <input
                    type="number"
                    name="dependants"
                    value={formData.dependants}
                    onChange={onInputChange}
                  />
                  {renderError("dependants")}
                </div>
              </div>
            </div>

            <h4 className="mil-mb-60">
              <span className="mil-accent">03.</span> Reference Details
            </h4>
            <div className="row">
              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Reference Name (Friend or family in NZ)</label>
                  <input
                    name="referenceName"
                    placeholder="Enter reference name"
                    value={formData.referenceName}
                    onChange={onInputChange}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Reference Phone Number</label>
                  <input
                    name="referencePhone"
                    placeholder="Enter phone number"
                    value={formData.referencePhone}
                    onChange={onInputChange}
                  />
                </div>
              </div>
            </div>

            <h4 className="mil-mb-60">
              <span className="mil-accent">04.</span> Employment and Income
            </h4>
            <div className="row">
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Employer *</label>
                  <input name="employer" value={formData.employer} onChange={onInputChange} />
                  {renderError("employer")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Months with Current Employer *</label>
                  <input
                    type="number"
                    name="monthsWithEmployer"
                    value={formData.monthsWithEmployer}
                    onChange={onInputChange}
                  />
                  {renderError("monthsWithEmployer")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Job Title *</label>
                  <input name="jobTitle" value={formData.jobTitle} onChange={onInputChange} />
                  {renderError("jobTitle")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Income Type *</label>
                  <select name="incomeType" value={formData.incomeType} onChange={onInputChange}>
                    <option value="">Select income type</option>
                    <option value="Salary">Salary</option>
                    <option value="Wages">Wages</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Benefit">Benefit</option>
                  </select>
                  {renderError("incomeType")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Salary After Tax *</label>
                  <input
                    type="number"
                    name="salaryAfterTax"
                    value={formData.salaryAfterTax}
                    onChange={onInputChange}
                  />
                  {renderError("salaryAfterTax")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Salary Frequency *</label>
                  <select
                    name="salaryFrequency"
                    value={formData.salaryFrequency}
                    onChange={onInputChange}
                  >
                    <option value="">Select frequency</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {renderError("salaryFrequency")}
                </div>
              </div>
            </div>

            <h4 className="mil-mb-60">
              <span className="mil-accent">05.</span> Loan Details
            </h4>
            <div className="row">
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Visa Type *</label>
                  <select name="visaType" value={formData.visaType} onChange={onInputChange}>
                    <option value="">Select visa type</option>
                    <option value="NZ Citizen">NZ Citizen</option>
                    <option value="Resident">Resident</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Student Visa">Student Visa</option>
                  </select>
                  {renderError("visaType")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Living Condition *</label>
                  <select
                    name="livingCondition"
                    value={formData.livingCondition}
                    onChange={onInputChange}
                  >
                    <option value="Renting">Renting</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Own Home">Own Home</option>
                    <option value="With Family">With Family</option>
                  </select>
                  {renderError("livingCondition")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Rent or Mortgage Payment *</label>
                  <input
                    type="number"
                    name="rentMortgagePayment"
                    value={formData.rentMortgagePayment}
                    onChange={onInputChange}
                  />
                  {renderError("rentMortgagePayment")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Payment Frequency *</label>
                  <select
                    name="paymentFrequency"
                    value={formData.paymentFrequency}
                    onChange={onInputChange}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {renderError("paymentFrequency")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Monthly Expenses *</label>
                  <input
                    type="number"
                    name="monthlyExpenses"
                    value={formData.monthlyExpenses}
                    onChange={onInputChange}
                  />
                  {renderError("monthlyExpenses")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Loan Type *</label>
                  <select name="loanType" value={formData.loanType} onChange={onInputChange}>
                    <option value="">Select loan type</option>
                    <option value="Car Finance">Car Finance</option>
                    <option value="Boat, Motorbike & Caravan Loans">
                      Boat, Motorbike & Caravan Loans
                    </option>
                    <option value="Commercial Vehicle Loan">Commercial Vehicle Loan</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Debt Consolidation Loans">Debt Consolidation Loans</option>
                  </select>
                  {renderError("loanType")}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Loan Amount *</label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={onInputChange}
                  />
                  {renderError("loanAmount")}
                </div>
              </div>
              <div className="col-lg-8">
                <div className="mil-input-frame mil-dark-input mil-mb-20">
                  <label className="mil-h6">Income/Expense Changes *</label>
                  <select
                    name="incomeExpenseChanges"
                    value={formData.incomeExpenseChanges}
                    onChange={onInputChange}
                  >
                    <option value="">Select an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  <p className="mil-text-sm">
                    Are you aware of any reason your expenses or income may change within the
                    loan term?
                  </p>
                  {renderError("incomeExpenseChanges")}
                </div>
              </div>
            </div>

            <h4 className="mil-mb-60">
              <span className="mil-accent">06.</span> Upload Required Documents
            </h4>
            <div className="row" key={fileInputKey}>
              <div className="col-lg-6">
                <div className="mil-attach-frame mil-dark mil-mb-30">
                  <i className="fas fa-paperclip" />
                  <label className="mil-custom-file-input">
                    <span>Driver Licence Front</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => onFileChange("driverFront", e)}
                    />
                  </label>
                  <p className="mil-text-sm">{fileNames.driverFront}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mil-attach-frame mil-dark mil-mb-30">
                  <i className="fas fa-paperclip" />
                  <label className="mil-custom-file-input">
                    <span>Driver Licence Back</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => onFileChange("driverBack", e)}
                    />
                  </label>
                  <p className="mil-text-sm">{fileNames.driverBack}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mil-attach-frame mil-dark mil-mb-30">
                  <i className="fas fa-paperclip" />
                  <label className="mil-custom-file-input">
                    <span>Visa Copy (if not NZ Citizen)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => onFileChange("visaCopy", e)}
                    />
                  </label>
                  <p className="mil-text-sm">{fileNames.visaCopy}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mil-attach-frame mil-dark mil-mb-30">
                  <i className="fas fa-paperclip" />
                  <label className="mil-custom-file-input">
                    <span>Passport Copy (if not NZ Citizen)</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => onFileChange("passportCopy", e)}
                    />
                  </label>
                  <p className="mil-text-sm">{fileNames.passportCopy}</p>
                </div>
              </div>
            </div>

            <h4 className="mil-mb-30">
              <span className="mil-accent">07.</span> Consent and Loan Information
            </h4>
            <p className="mil-mb-20">
              Epic Finance is committed to protecting and respecting your privacy. We use your
              personal information to administer your account and provide services you requested.
            </p>
            <p className="mil-mb-20">
              We may contact you occasionally about other products and services that may interest
              you.
            </p>
            <div className="mil-mb-20">
              <label>
                <input
                  type="checkbox"
                  name="consentMarketing"
                  checked={formData.consentMarketing}
                  onChange={onInputChange}
                />{" "}
                I agree to receive other communications from Epic Finance
              </label>
              {renderError("consentMarketing")}
            </div>
            <p className="mil-mb-20">
              To provide the requested content, we need to store and process your personal data.
            </p>
            <div className="mil-mb-20">
              <label>
                <input
                  type="checkbox"
                  name="consentDataProcessing"
                  checked={formData.consentDataProcessing}
                  onChange={onInputChange}
                />{" "}
                I agree to allow Epic Finance to store and process my personal data
              </label>
              {renderError("consentDataProcessing")}
            </div>
            <p className="mil-mb-20">
              By submitting, you consent to Epic Finance conducting a credit check, including
              court fine data access.
            </p>
            <div className="mil-mb-30">
              <h6 className="mil-mb-10">Loan Information</h6>
              <p className="mil-text-sm">
                Interest rates range from 8.95% p.a. to 29.25% p.a. Loan terms from 12 to 84
                months. Rates depend on financials, loan type, and lender assessment.
              </p>
              <p className="mil-text-sm">
                Quick Approval: Within 1 hour, subject to checks. Same-Day Payout: If documents
                are completed before 12 PM.
              </p>
            </div>

            {groupedErrors > 0 && (
              <p className="mil-accent mil-mb-20">
                Please complete all required fields before submitting.
              </p>
            )}
            {feedback ? (
              <p
                className={`mil-mb-20 mil-text-sm ${
                  status === "success" ? "" : "mil-accent"
                }`}
                style={status === "success" ? { color: "#2e7d32" } : undefined}
                role="status"
              >
                {feedback}
              </p>
            ) : null}

            <button
              className="mil-button mil-accent-bg"
              type="submit"
              disabled={status === "sending"}
            >
              <span>
                {status === "sending" ? "Sending…" : "Submit Loan Application"}
              </span>
            </button>
          </form>
        </div>
      </section>
    </Layouts>
  );
};

export default LoanApplicationPage;
