import GloabaLoader from "@/components/globalLoader";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useIsSessionLoaded, useSession } from "@/store/session";
import { Navigate, Outlet } from "react-router";

export default function AdminOnlyLayout() {
  const session = useSession();
  const isSessionLoaded = useIsSessionLoaded();

  const { data: profile, isLoading } = useProfileData(session?.user.id);

  if (!isSessionLoaded) return <GloabaLoader />;

  if (!session) return <Navigate to="/signin" replace />;

  if (isLoading) return <GloabaLoader />;

  const isAdmin = profile?.role === "admin";
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
