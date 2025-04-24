import { AppDispatch, RootState } from "@/store";
import { clearUser, setUser } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const isInitialized = useSelector(
    (state: RootState) => state.user.isInitialized
  );
  const dispatch = useDispatch<AppDispatch>();

  const login = (userData: any) => dispatch(setUser(userData));
  const logout = () => dispatch(clearUser());

  return {
    user,
    isInitialized,
    login,
    logout,
    isAdmin: user?.role === "ROLE_ADMIN",
  };
};
