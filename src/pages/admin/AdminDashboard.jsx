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

  const cardIcons = {
    users: (
      <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    stores: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    ratings: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  };

  const cardTitles = {
    users: 'Total Users',
    stores: 'Total Stores',
    ratings: 'Total Ratings'
  };

  const cardColors = {
    users: 'from-indigo-50 to-white',
    stores: 'from-green-50 to-white',
    ratings: 'from-amber-50 to-white'
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-500">Welcome back! Here's what's happening with your platform.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["users", "stores", "ratings"].map((k) => (
            <div 
              key={k} 
              className={`bg-gradient-to-br ${cardColors[k]} rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {cardTitles[k]}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800">
                    {statsLoading ? (
                      <span className="inline-block w-16 h-8 bg-gray-200 rounded animate-pulse"></span>
                    ) : (
                      stats[k]?.toLocaleString()
                    )}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white shadow-sm">
                  {cardIcons[k]}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
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
