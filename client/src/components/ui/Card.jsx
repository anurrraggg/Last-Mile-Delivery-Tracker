/* eslint-disable react/prop-types */

const Card = ({ children, className = "", padding = true }) => {
  return (
    <div
      className={`surface-card ${padding ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
