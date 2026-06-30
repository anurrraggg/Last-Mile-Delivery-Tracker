/* eslint-disable react/prop-types */

const DataTable = ({
  columns = [],
  data = [],
}) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/90 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.22)] backdrop-blur">

      <table className="min-w-full">

        <thead className="bg-slate-50/90 text-xs uppercase tracking-[0.18em] text-slate-500">

          <tr>

            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left font-semibold"
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
                className="py-12 text-center text-slate-500"
              >
                No records found.
              </td>
            </tr>

          ) : (

            data.map((row, index) => (

              <tr
                key={row.id ?? row._id ?? row.orderId ?? row.email ?? row.customer ?? row.name ?? JSON.stringify(row)}
                className="border-t border-slate-100 transition hover:bg-slate-50/90"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-6 py-4 text-slate-700"
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