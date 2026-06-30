const AgentsTable = ({ agents }) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Zone</th>
            <th className="text-left p-4">Status</th>
            <th className="text-left p-4">Deliveries</th>
            <th className="text-left p-4">Rating</th>
          </tr>

        </thead>

        <tbody>

          {agents.map((agent) => (

            <tr
              key={agent.id}
              className="border-t"
            >

              <td className="p-4">
                {agent.name}
              </td>

              <td className="p-4">
                {agent.zone}
              </td>

              <td className="p-4">
                {agent.available ? "Available" : "Busy"}
              </td>

              <td className="p-4">
                {agent.deliveries}
              </td>

              <td className="p-4">
                ⭐ {agent.rating}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default AgentsTable;