const Badge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",

    Assigned: "bg-blue-100 text-blue-700",

    "Picked Up":
      "bg-purple-100 text-purple-700",

    "In Transit":
      "bg-indigo-100 text-indigo-700",

    "Out For Delivery":
      "bg-orange-100 text-orange-700",

    Delivered:
      "bg-green-100 text-green-700",

    Failed:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${colors[status] ?? "bg-slate-100 text-slate-700"}`}
    >
      {status}
    </span>
  );
};

export default Badge;