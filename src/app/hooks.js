import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchMe } from "../features/auth/authThunks";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;


export function useEnsureAuthLoaded() {
  const dispatch = useAppDispatch();
  const { user, initialized, status } = useAppSelector((s) => s.auth);
  
  useEffect(() => {
    if (!initialized && status !== 'loading') {
      dispatch(fetchMe());
    }
  }, [dispatch, initialized, status]);

  return { user, initialized };
}
