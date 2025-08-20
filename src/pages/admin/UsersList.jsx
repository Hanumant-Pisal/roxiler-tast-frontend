import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { adminFetchUsersThunk } from "../../features/admin/adminThunks";
import { ROUTES } from "../../utils/constants";
import ProtectedRoute from "../../components/ProtectedRoute";

function Inner() {
  const dispatch = useAppDispatch();
  const { users, usersLoading } = useAppSelector((s) => s.admin);
  const [filters, setFilters] = useState({ name: "", email: "", address: "", role: "" });

  useEffect(() => {
    dispatch(adminFetchUsersThunk(filters));
  }, [dispatch]); // initial load

  const submit = () => dispatch(adminFetchUsersThunk(filters));

  const cols = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "address", title: "Address" },
    { key: "role", title: "Role" },
  ];

  return (
    <AdminLayout>
      <div className="bg-white border rounded-2xl p-4 mb-4">
        <div className="grid md:grid-cols-5 gap-3">
          <input className="border px-3 py-2 rounded-lg" placeholder="Name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Email" value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Address" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value })} />
          <select className="border px-3 py-2 rounded-lg" value={filters.role} onChange={(e) => setFilters({ ...filters, role: e.target.value })}>
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
          <Button onClick={submit}>Apply</Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="text-lg font-semibold">Users</div>
        <Link to={ROUTES.ADMIN_USERS_NEW}>
          <Button>Create User</Button>
        </Link>
      </div>

      {usersLoading ? <div>Loading...</div> : <Table columns={cols} data={users} />}
    </AdminLayout>
  );
}

export default function UsersList() {
  return (
    <ProtectedRoute roles={["admin"]}>
      <Inner />
    </ProtectedRoute>
  );
}
