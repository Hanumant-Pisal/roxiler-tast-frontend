import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  const loc = useLocation();
  
  // Check if a route is active (including subroutes)
  const isActive = (path) => {
    return loc.pathname.startsWith(path) && path !== '/admin';
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Logo/Brand */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="bg-indigo-600 text-white p-1.5 rounded-lg mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </span>
          <Link to="/" className="font-semibold">Rating Management</Link>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 mr-3 rounded-lg ${
                    active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-500'
                  }`}>
                    <Icon className={`w-4 h-4 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                  </span>
                  {item.label}
                  {active && (
                    <span className="ml-auto w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

     
    </div>
  );
}
