/* eslint-disable react/prop-types */

import Card from "../ui/Card";

const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-500">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-black">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs text-zinc-400">{trend}</p>
          )}
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-zinc-100 text-zinc-600 transition-colors duration-200 group-hover:bg-black group-hover:text-white">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
