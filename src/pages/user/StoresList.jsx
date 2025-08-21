import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import RatingStars from "../../components/RatingStars";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchStoresThunk } from "../../features/stores/storeThunks";
import { upsertRatingThunk } from "../../features/ratings/ratingThunks";

export default function StoresList() {
  const dispatch = useAppDispatch();
  const { list, loading, total } = useAppSelector((s) => s.stores);
  const [filters, setFilters] = useState({ name: "", address: "", page: 1, limit: 10 });
  const [hoveredRating, setHoveredRating] = useState({});

  useEffect(() => {
    dispatch(fetchStoresThunk(filters));
  }, [dispatch, filters]);

  const submitRating = (storeId, value) => {
    dispatch(upsertRatingThunk({ storeId, value, refetchParams: filters }));
  };

  // Calculate stats
  const stats = [
    {
      id: 'totalStores',
      title: 'Total Stores',
      value: total || 0,
      icon: (
        <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'from-indigo-50 to-white'
    },
    {
      id: 'totalRatings',
      title: 'Your Ratings',
      value: list.filter(store => store.myRating > 0).length,
      icon: (
        <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'from-amber-50 to-white'
    },
    {
      id: 'avgRating',
      title: 'Avg. Store Rating',
      value: list.length > 0 
        ? (list.reduce((sum, store) => sum + (store.avgRating || 0), 0) / list.length).toFixed(1)
        : 'N/A',
      icon: (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-green-50 to-white'
    }
  ];

  return (
    <UserLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.id} className={`bg-gradient-to-br ${stat.color} border rounded-2xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-white shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by name"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value, page: 1 })}
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="relative">
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by address"
                value={filters.address}
                onChange={(e) => setFilters({ ...filters, address: e.target.value, page: 1 })}
              />
              <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <Button 
              className="w-full md:w-auto justify-center"
              onClick={() => dispatch(fetchStoresThunk(filters))}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Stores List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            list.map((store) => (
              <div key={store._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{store.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{store.address}</p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-2">Overall:</span>
                          <div className="flex items-center">
                            <RatingStars value={store.avgRating || 0} readOnly />
                            <span className="ml-2 font-medium text-gray-900">
                              {store.avgRating?.toFixed(1) || 'N/A'}
                              <span className="text-gray-400 font-normal"> ({store.ratingsCount || 0})</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 min-w-[200px]">
                      <div className="text-center mb-2">
                        <p className="text-sm font-medium text-gray-700 mb-2">Your Rating</p>
                        <div 
                          className="flex justify-center space-x-1"
                          onMouseLeave={() => setHoveredRating(prev => ({ ...prev, [store._id]: null }))}
                        >
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              className={`text-2xl ${(hoveredRating[store._id] || store.myRating || 0) >= star 
                                ? 'text-yellow-400' 
                                : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                              onClick={() => submitRating(store._id, star)}
                              onMouseEnter={() => setHoveredRating(prev => ({ ...prev, [store._id]: star }))}
                              title={`Rate ${star} star${star !== 1 ? 's' : ''}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {store.myRating 
                            ? `You rated ${store.myRating} star${store.myRating !== 1 ? 's' : ''}` 
                            : 'Click to rate'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </UserLayout>
  );
}
