import "./simpleHeader.scss";

const SimpleHeader = ({ title }) => {
  return (
    <div className="px-4 py-3 simpleHeader">
      <h3>{title}</h3>
    </div>
  );
};

export default SimpleHeader;
