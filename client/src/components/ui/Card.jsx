const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`surface-card rounded-2xl border border-slate-200 p-6 shadow-sm shadow-slate-200/50 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;