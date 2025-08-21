import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "./Button";
import { logoutThunk } from "../features/auth/authThunks";
import { ROUTES } from "../utils/constants";
import { useState } from "react";
import { FiUser, FiChevronDown, FiLogOut, FiKey } from "react-icons/fi";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.LOGIN);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-end p-4">
       
        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="hidden md:flex items-center gap-4">
                {user.role === "admin" && (
                  <>
                    <Link className="hover:underline" to={ROUTES.ADMIN_DASH}>Admin</Link>
                    <Link className="hover:underline" to={ROUTES.ADMIN_USERS}>Users</Link>
                    <Link className="hover:underline" to={ROUTES.ADMIN_STORES}>Stores</Link>
                  </>
                )}
                {user.role === "owner" && (
                  <Link className="hover:underline" to={ROUTES.OWNER_DASH}>Owner</Link>
                )}
                <Link className="hover:underline" to={ROUTES.STORES}>Stores</Link>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors focus:outline-none"
                >
                  <FiUser className="text-gray-600" size={20} />
                </button>
                
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name || user.email}</p>
                      <div className="flex items-center justify-between">
                      
                        <span className="mt-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <Link 
                      to={ROUTES.CHANGE_PASSWORD}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiKey className="mr-2" /> Change Password
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {!user && (
            <Link 
              to={ROUTES.LOGIN}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
