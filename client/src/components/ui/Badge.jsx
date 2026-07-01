/* eslint-disable react/prop-types */

const Badge = ({ status }) => {
  const colors = {
    Pending: "bg-amber-100/50 text-amber-900",
    Assigned: "bg-sky-100/50 text-sky-900",
    "Picked Up": "bg-violet-100/50 text-violet-900",
    "In Transit": "bg-indigo-100/50 text-indigo-900",
    "Out For Delivery": "bg-orange-100/50 text-orange-900",
    Delivered: "bg-emerald-100/50 text-emerald-900",
    Failed: "bg-red-100/50 text-red-900",
    Available: "bg-emerald-100/50 text-emerald-900",
    Busy: "bg-red-100/50 text-red-900",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide ${colors[status] ?? "bg-zinc-100 text-zinc-600"}`}
    >
      {status}
    </span>
  );
};

export default Badge;

