import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ROUTES } from "../utils/constants";

export default function AdminLayout({ children }) {
  const items = [
    { label: "Dashboard", to: ROUTES.ADMIN_DASH },
    { label: "Users", to: ROUTES.ADMIN_USERS },
    { label: "Stores", to: ROUTES.ADMIN_STORES },
  ];
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex max-w-7xl mx-auto">
        <Sidebar items={items} />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </div>
  );
}
