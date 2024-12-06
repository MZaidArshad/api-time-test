import "./editHeader.scss";

const EditHeader = ({ endPoint, setEndPoint, setDocType, docType }) => {
  const handleChange = (event) => {
    setEndPoint(event.target.value);
  };

  const handleDocType = (e) => {
    setDocType(e.target.value);
  };

  const documentTypes = [
    "Fidelity",
    "Etrade Summary",
    "Bank Statement",
    "Etrade",
    "Utility Bills",
    "Tax Clearance Certificate",
    "Self Assessment Chapter 4 Income Tax",
    "Pay Slip",
    "Mortgage Statements",
    "Marriage Certificate",
    "Loan Statements",
    "Id Document",
    "Form 11",
    "Employment Details Summary",
    "Company Accounts Report",
    "Card Statements",
    "Mercer Disbursement Statement",
    "Mercer Current Appropriation",
  ];

  return (
    <div className="editHeader d-flex align-items-center gap-2">
      <select className="ms-auto" onChange={handleChange} value={endPoint}>
        <option value="analyze">Analyze</option>
        <option value="brokerage">Brokerage</option>
        <option value="general">General</option>
      </select>

      {endPoint === "analyze" && (
        <select
          id="documentType"
          name="documentType"
          value={docType}
          onChange={handleDocType}
        >
          {documentTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default EditHeader;
