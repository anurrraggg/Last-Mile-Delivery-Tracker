import { createContext, useEffect, useState } from "react";

import * as adminService from "../services/adminService";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [customers, setCustomers] =
    useState([]);

  const [agents, setAgents] =
    useState([]);

  const [zones, setZones] =
    useState([]);

  const [rateCards, setRateCards] =
    useState([]);

  const loadAdminData = async () => {
    try {
      const [
        customerRes,
        agentRes,
        zoneRes,
        rateRes,
      ] = await Promise.all([
        adminService.getCustomers(),
        adminService.getAgents(),
        adminService.getZones(),
        adminService.getRateCards(),
      ]);

      setCustomers(customerRes.data);

      setAgents(agentRes.data);

      setZones(zoneRes.data);

      setRateCards(rateRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        customers,
        agents,
        zones,
        rateCards,
        loadAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;