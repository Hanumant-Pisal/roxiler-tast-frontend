import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../features/auth/authThunks";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

/** Ensure user is loaded from /auth/me if cookie exists */
export function useEnsureAuthLoaded() {
  const dispatch = useAppDispatch();
  const { user, initialized } = useAppSelector((s) => s.auth);
  useEffect(() => {
    if (!initialized) dispatch(fetchMe());
  }, [initialized, dispatch]);
  return { user, initialized };
}
