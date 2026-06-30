const CustomersTable = ({ customers }) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Orders</th>
          </tr>

        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer.id}
              className="border-t"
            >

              <td className="p-4">
                {customer.name}
              </td>

              <td className="p-4">
                {customer.email}
              </td>

              <td className="p-4">
                {customer.phone}
              </td>

              <td className="p-4">
                {customer.orders}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default CustomersTable;