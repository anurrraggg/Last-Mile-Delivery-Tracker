import api from "./api";

export const getCustomers = () =>
  api.get("/admin/customers");

export const getAgents = () =>
  api.get("/admin/agents");

export const getZones = () =>
  api.get("/admin/zones");

export const getRateCards = () =>
  api.get("/admin/ratecards");

export const assignAgent = (id, data) =>
  api.patch(`/admin/orders/${id}/assign`, data);

export const createZone = (data) =>
  api.post("/admin/zones", data);

export const createRateCard = (data) =>
  api.post("/admin/ratecards", data);