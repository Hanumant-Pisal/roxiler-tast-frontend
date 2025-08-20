import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "./Button";
import { logoutThunk } from "../features/auth/authThunks";
import { ROUTES } from "../utils/constants";

export default function Navbar() {
  const { user } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dispatch(logoutThunk());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="w-full bg-white border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="font-semibold">Store Rating</Link>
        <div className="flex items-center gap-4">
          {user && (
            <>
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
              <Link className="hover:underline" to={ROUTES.CHANGE_PASSWORD}>Change Password</Link>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
          {!user && <Link to={ROUTES.LOGIN}>Login</Link>}
        </div>
      </div>
    </div>
  );
}
