import { useEffect, useState } from "react";
import OwnerLayout from "../../layouts/OwnerLayout";
import api from "../../utils/apiClient";
import Table from "../../components/Table";
import ProtectedRoute from "../../components/ProtectedRoute";

function OwnerDashboardInner() {
  const [store, setStore] = useState(null);
  const [raters, setRaters] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const load = async () => {
    const s = await api.get("/stores/owner/me/store").then((r) => r.data.store);
    setStore(s);
    const list = await api
      .get("/stores/owner/me/ratings", { params: { search, page, limit: 10 } })
      .then((r) => r.data);
    setRaters(list.items || []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const cols = [
    { key: "name", title: "Name", render: (r) => r.user?.name },
    { key: "email", title: "Email", render: (r) => r.user?.email },
    { key: "address", title: "Address", render: (r) => r.user?.address },
    { key: "value", title: "Rating" },
  ];

  return (
    <OwnerLayout>
      <div className="grid gap-4">
        <div className="bg-white border rounded-2xl p-4">
          <div className="text-lg font-semibold">{store?.name || "My Store"}</div>
          <div className="text-sm text-gray-600">{store?.address}</div>
          <div className="mt-1 text-sm">
            Average: <span className="font-medium">{store?.avgRating?.toFixed?.(2) ?? store?.avgRating}</span> ({store?.ratingsCount || 0})
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-semibold">Ratings</div>
            <input className="border px-3 py-2 rounded-lg" placeholder="Search raters" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Table columns={cols} data={raters} />
        </div>
      </div>
    </OwnerLayout>
  );
}

export default function OwnerDashboard() {
  return (
    <ProtectedRoute roles={["owner"]}>
      <OwnerDashboardInner />
    </ProtectedRoute>
  );
}
