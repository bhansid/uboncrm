import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../modules/admin/AdminDashboard";
import RetailersPage from "../modules/admin/RetailersPage";
import OrdersPage from "../modules/admin/OrdersPage";
import MapsPage from "../modules/admin/MapsPage";
import RetailerProfile from "../modules/admin/RetailerProfile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/retailers" element={<RetailersPage />} />
      <Route path="/retailers/:id" element={<RetailerProfile />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/maps" element={<MapsPage />} />
    </Routes>
  );
}
