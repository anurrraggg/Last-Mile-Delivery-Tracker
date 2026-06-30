/* eslint-disable react/prop-types */

import Card from "../ui/Card";

const StatsCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <Card className="flex items-center justify-between gap-4 bg-white/85">

      <div className="min-w-0">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {value}
        </h2>
      </div>

      <div
        className={`${color} rounded-2xl p-4 text-white shadow-lg shadow-slate-300/40 ring-1 ring-white/25`}
      >
        {icon}
      </div>

    </Card>
  );
};

export default StatsCard;