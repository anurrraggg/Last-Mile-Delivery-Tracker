/* eslint-disable react/prop-types */

import Card from "../ui/Card";

const AgentCard = ({ agent }) => {
  return (
    <Card className="bg-white/85">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h3 className="text-lg font-semibold tracking-tight text-slate-950">
            {agent.name}
          </h3>

          <p className="text-sm text-slate-500">
            {agent.zone}
          </p>

        </div>

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            agent.available
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {agent.available
            ? "Available"
            : "Busy"}
        </span>

      </div>

      <div className="mt-5 space-y-2 rounded-2xl bg-slate-50/80 p-4 text-sm text-slate-700">

        <p>
          Deliveries : {agent.deliveries}
        </p>

        <p>
          Rating : ⭐ {agent.rating}
        </p>

      </div>

    </Card>
  );
};

export default AgentCard;