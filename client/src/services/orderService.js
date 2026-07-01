import api from "./api";

export const createOrder = (data) =>
  api.post("/orders", data);

export const getOrders = () =>
  api.get("/orders");

export const getOrder = (id) =>
  api.get(`/orders/${id}`);

export const updateStatus = (id, status, remarks) =>
  api.patch(`/orders/${id}/status`, {
    status,
    remarks,
  });

export const cancelOrder = (id) =>
  api.delete(`/orders/${id}`);

export const estimateCharge = (data) =>
  api.post("/orders/estimate", data);

export const rescheduleOrder = (id, rescheduleDate) =>
  api.patch(`/orders/${id}/reschedule`, { rescheduleDate });