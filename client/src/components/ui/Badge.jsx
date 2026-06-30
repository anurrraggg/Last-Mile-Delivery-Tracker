/* eslint-disable react/prop-types */

const Badge = ({ status }) => {
  const colors = {
    Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200/70",

    Assigned: "bg-sky-50 text-sky-700 ring-1 ring-sky-200/70",

    "Picked Up":
      "bg-violet-50 text-violet-700 ring-1 ring-violet-200/70",

    "In Transit":
      "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/70",

    "Out For Delivery":
      "bg-orange-50 text-orange-700 ring-1 ring-orange-200/70",

    Delivered:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/70",

    Failed:
      "bg-rose-50 text-rose-700 ring-1 ring-rose-200/70",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${colors[status] ?? "bg-slate-100 text-slate-700 ring-1 ring-slate-200/70"}`}
    >
      {status}
    </span>
  );
};

export default Badge;