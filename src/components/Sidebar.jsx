import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ items = [] }) {
  const loc = useLocation();
  return (
    <div className="w-64 bg-white border-r h-full p-4">
      <div className="text-lg font-semibold mb-4">Menu</div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.to}>
            <Link
              to={it.to}
              className={`block px-3 py-2 rounded-lg hover:bg-gray-100 ${
                loc.pathname === it.to ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
