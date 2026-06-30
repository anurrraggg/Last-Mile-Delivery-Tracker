import { createContext, useContext, useEffect, useState } from "react";

import * as orderService from "../services/orderService";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const { data } =
        await orderService.getOrders();

      setOrders(data);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (payload) => {
    const { data } =
      await orderService.createOrder(payload);

    setOrders((prev) => [data, ...prev]);
  };

  const updateOrderStatus = async (
    id,
    status
  ) => {
    await orderService.updateStatus(id, status);

    loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        updateOrderStatus,
        loadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;