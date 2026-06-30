/* eslint-disable react/prop-types */

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`surface-card rounded-3xl border p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-white/35 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;