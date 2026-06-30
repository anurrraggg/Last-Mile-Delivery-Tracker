import { useContext } from "react";

import AdminContext from "../context/AdminContext";

const useAdmin = () => {
  return useContext(AdminContext);
};

export default useAdmin;