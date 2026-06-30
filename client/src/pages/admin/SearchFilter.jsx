import Input from "../ui/Input";
import Select from "../ui/Select";

const SearchFilter = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">

      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={[
          { label: "All", value: "All" },
          { label: "Pending", value: "Pending" },
          { label: "Assigned", value: "Assigned" },
          { label: "In Transit", value: "In Transit" },
          { label: "Delivered", value: "Delivered" },
          { label: "Failed", value: "Failed" },
        ]}
      />

    </div>
  );
};

export default SearchFilter;