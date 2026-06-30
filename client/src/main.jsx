import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <AuthProvider>

      <OrderProvider>

        <AdminProvider>

          <App />

        </AdminProvider>

      </OrderProvider>

    </AuthProvider>

  </React.StrictMode>
);