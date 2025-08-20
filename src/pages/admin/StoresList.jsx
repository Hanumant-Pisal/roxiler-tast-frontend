import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminFetchStoresThunk } from "../../features/stores/storeThunks";
import { ROUTES } from "../../utils/constants";
import ProtectedRoute from "../../components/ProtectedRoute";

function Inner() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.stores);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", minRating: "" });

  useEffect(() => {
    dispatch(adminFetchStoresThunk(filters));
  }, [dispatch]); // initial

  const submit = () => dispatch(adminFetchStoresThunk(filters));

  const cols = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { key: "avgRating", title: "Rating", render: (r) => (r.avgRating ?? 0).toFixed(2) },
  ];

  return (
    <AdminLayout>
      <div className="bg-white border rounded-2xl p-4 mb-4">
        <div className="grid md:grid-cols-5 gap-3">
          <input className="border px-3 py-2 rounded-lg" placeholder="Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Address" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Min Rating" value={filters.minRating} onChange={(e) => setFilters({ ...filters, minRating: e.target.value })} />
          <Button onClick={submit}>Apply</Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-lg font-semibold">Stores</div>
        <Link to={ROUTES.ADMIN_STORES_NEW}>
          <Button>Create Store</Button>
        </Link>
      </div>

      {loading ? <div>Loading...</div> : <Table columns={cols} data={list} />}
    </AdminLayout>
  );
}

export default function AdminStoresList() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
