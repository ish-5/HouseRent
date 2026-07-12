import { Routes, Route } from "react-router-dom";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RenterDashboard from "./pages/RenterDashboard";

export default function App() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route
          path="/properties/:id"
          element={
            <ProtectedRoute roles={["renter", "owner", "admin"]}>
              <PropertyDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/owner"
          element={
            <ProtectedRoute roles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/renter"
          element={
            <ProtectedRoute roles={["renter"]}>
              <RenterDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}
