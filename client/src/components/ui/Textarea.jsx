const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  return (
    <div className="mb-4">

      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <textarea
        rows={4}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 ${className}`}
      />

    </div>
  );
};

export default Textarea;