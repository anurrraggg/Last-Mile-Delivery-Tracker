/* eslint-disable react/prop-types */

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="mb-5">

      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-600">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3.5 text-slate-900 shadow-sm shadow-slate-900/5 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100 ${className}`}
      />

    </div>
  );
};

export default Input;