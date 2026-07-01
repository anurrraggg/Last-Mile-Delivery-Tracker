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
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="mb-1.5 block text-sm font-medium text-zinc-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-sm border border-zinc-200 bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors placeholder:text-zinc-400 hover:border-zinc-400 focus:border-black focus:ring-0 ${className}`}
      />
    </div>
  );
};

export default Input;
