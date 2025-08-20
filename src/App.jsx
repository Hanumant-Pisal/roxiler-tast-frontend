import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ChangePassword from "./pages/auth/ChangePassword";
import StoresList from "./pages/user/StoresList";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersList from "./pages/admin/UsersList";
import UserForm from "./pages/admin/UserForm";
import AdminStoresList from "./pages/admin/StoresList";
import StoreForm from "./pages/admin/StoreForm";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

      {/* User */}
      <Route path="/stores" element={<ProtectedRoute><StoresList /></ProtectedRoute>} />

      {/* Owner */}
      <Route path="/owner/dashboard" element={<ProtectedRoute><OwnerDashboard /></ProtectedRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
      <Route path="/admin/users/new" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
      <Route path="/admin/stores" element={<ProtectedRoute><AdminStoresList /></ProtectedRoute>} />
      <Route path="/admin/stores/new" element={<ProtectedRoute><StoreForm /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
