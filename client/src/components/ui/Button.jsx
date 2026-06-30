/* eslint-disable react/prop-types */

const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-[linear-gradient(135deg,#2563eb_0%,#0ea5e9_100%)] text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35",

    secondary:
      "border border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white",

    success:
      "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-700",

    danger:
      "bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:bg-rose-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold tracking-tight transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;