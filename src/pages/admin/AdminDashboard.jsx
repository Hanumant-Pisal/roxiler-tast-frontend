import { useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminFetchStatsThunk } from "../../features/admin/adminThunks";

function Inner() {
  const dispatch = useAppDispatch();
  const { stats, statsLoading } = useAppSelector((s) => s.admin);

  useEffect(() => {
    dispatch(adminFetchStatsThunk());
  }, [dispatch]);

  return (
    <AdminLayout>
      <div className="grid md:grid-cols-3 gap-4">
        {["users", "stores", "ratings"].map((k) => (
          <div key={k} className="bg-white border rounded-2xl p-6">
            <div className="text-sm text-gray-500 capitalize">{k}</div>
            <div className="text-3xl font-semibold mt-1">
              {statsLoading ? "…" : stats[k]}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
