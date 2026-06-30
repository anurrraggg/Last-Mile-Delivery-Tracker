const DataTable = ({
  columns = [],
  data = [],
}) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left"
              >
                {column.title}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>

          ) : (

            data.map((row, index) => (

              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default DataTable;