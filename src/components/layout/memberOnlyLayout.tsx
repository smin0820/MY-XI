import { useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const session = useSession();
  if (!session) return <Navigate to={"/signin"} replace={true} />;
  return <Outlet />;
}
