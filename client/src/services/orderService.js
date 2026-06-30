import api from "./api";

export const createOrder = (data) =>
  api.post("/orders", data);

export const getOrders = () =>
  api.get("/orders");

export const getOrder = (id) =>
  api.get(`/orders/${id}`);

export const updateStatus = (id, status) =>
  api.patch(`/orders/${id}/status`, {
    status,
  });

export const cancelOrder = (id) =>
  api.delete(`/orders/${id}`);