const Select = ({
  label,
  options = [],
  value,
  onChange,
  name,
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

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-sm border border-zinc-200 bg-transparent px-3 py-2 text-sm text-black outline-none transition-colors hover:border-zinc-400 focus:border-black focus:ring-0 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
