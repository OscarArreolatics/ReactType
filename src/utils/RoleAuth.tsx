import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useAuth = ( allowedRoles: string[]): boolean => {
  const role = useSelector((state: RootState) => state.auth.user?.role);
  return  allowedRoles.includes(role);
};

