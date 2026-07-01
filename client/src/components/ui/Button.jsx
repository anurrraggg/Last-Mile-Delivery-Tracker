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
      "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950",

    secondary:
      "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300",

    ghost:
      "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
