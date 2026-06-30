import api from "./api";

export const getAssignedOrders = () =>
  api.get("/agent/orders");

export const updateLocation = (data) =>
  api.patch("/agent/location", data);

export const updateDeliveryStatus = (
  id,
  status
) =>
  api.patch(`/agent/orders/${id}`, {
    status,
  });