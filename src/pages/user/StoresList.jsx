import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import RatingStars from "../../components/RatingStars";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchStoresThunk } from "../../features/stores/storeThunks";
import { upsertRatingThunk } from "../../features/ratings/ratingThunks";

export default function StoresList() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.stores);
  const [filters, setFilters] = useState({ name: "", address: "", page: 1, limit: 10 });

  useEffect(() => {
    dispatch(fetchStoresThunk(filters));
  }, [dispatch, filters]);

  const submitRating = (storeId, value) => {
    dispatch(upsertRatingThunk({ storeId, value, refetchParams: filters }));
  };

  return (
    <UserLayout>
      <div className="bg-white border rounded-2xl p-4 mb-4">
        <div className="grid md:grid-cols-3 gap-3">
          <input className="border px-3 py-2 rounded-lg" placeholder="Search by name" value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value, page: 1 })} />
          <input className="border px-3 py-2 rounded-lg" placeholder="Search by address" value={filters.address} onChange={(e) => setFilters({ ...filters, address: e.target.value, page: 1 })} />
          <Button onClick={() => dispatch(fetchStoresThunk(filters))}>Search</Button>
        </div>
      </div>

      {loading && <div>Loading...</div>}

      <div className="grid gap-4">
        {list.map((s) => (
          <div key={s._id} className="bg-white border rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{s.name}</div>
                <div className="text-sm text-gray-600">{s.address}</div>
                <div className="mt-1 text-sm">
                  Overall Rating: <span className="font-medium">{s.avgRating?.toFixed ? s.avgRating.toFixed(2) : s.avgRating}</span> ({s.ratingsCount || 0})
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-sm text-gray-500">Your Rating</div>
                <RatingStars value={s.myRating || 0} onChange={(v) => submitRating(s._id, v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
}
