import Card from "../ui/Card";

const AgentCard = ({ agent }) => {
  return (
    <Card>

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold">
            {agent.name}
          </h3>

          <p className="text-gray-500 text-sm">
            {agent.zone}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            agent.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {agent.available
            ? "Available"
            : "Busy"}
        </span>

      </div>

      <div className="mt-4 text-sm space-y-1">

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