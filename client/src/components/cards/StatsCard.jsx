import Card from "../ui/Card";

const StatsCard = ({
  title,
  value,
  icon,
  color = "bg-blue-500",
}) => {
  return (
    <Card className="flex items-center justify-between border-slate-200/80 bg-slate-50/80">

      <div>
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </h2>
      </div>

      <div
        className={`${color} rounded-2xl p-4 text-white shadow-lg shadow-slate-300/40`}
      >
        {icon}
      </div>

    </Card>
  );
};

export default StatsCard;