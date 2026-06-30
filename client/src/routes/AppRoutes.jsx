import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

/* Authentication */

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

/* Customer */

import Dashboard from "../pages/customer/Dashboard";
import CreateOrder from "../pages/customer/CreateOrder";
import MyOrders from "../pages/customer/MyOrders";
import OrderDetails from "../pages/customer/OrderDetails";
import Profile from "../pages/customer/Profile";

/* Admin */

import AdminDashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import AdminOrderDetails from "../pages/admin/OrderDetails";
import Agents from "../pages/admin/Agents";
import Customers from "../pages/admin/Customers";
import Zones from "../pages/admin/Zones";
import RateCards from "../pages/admin/RateCards";
import Analytics from "../pages/admin/Analytics";

/* Agent */

import AgentDashboard from "../pages/agent/Dashboard";
import AssignedOrders from "../pages/agent/AssignedOrders";
import AgentOrderDetails from "../pages/agent/OrderDetails";
import AgentProfile from "../pages/agent/Profile";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<AuthLayout />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

        </Route>

        <Route
          element={
            <ProtectedRoute>

              <DashboardLayout />

            </ProtectedRoute>
          }
        >

          {/* Customer */}

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/create-order"
            element={<CreateOrder />}
          />

          <Route
            path="/orders"
            element={<MyOrders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderDetails />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Admin */}

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/orders"
            element={<Orders />}
          />

          <Route
            path="/admin/orders/:id"
            element={<AdminOrderDetails />}
          />

          <Route
            path="/admin/agents"
            element={<Agents />}
          />

          <Route
            path="/admin/customers"
            element={<Customers />}
          />

          <Route
            path="/admin/zones"
            element={<Zones />}
          />

          <Route
            path="/admin/rate-cards"
            element={<RateCards />}
          />

          <Route
            path="/admin/analytics"
            element={<Analytics />}
          />

          {/* Agent */}

          <Route
            path="/agent"
            element={<AgentDashboard />}
          />

          <Route
            path="/agent/orders"
            element={<AssignedOrders />}
          />

          <Route
            path="/agent/orders/:id"
            element={<AgentOrderDetails />}
          />

          <Route
            path="/agent/profile"
            element={<AgentProfile />}
          />

        </Route>

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;