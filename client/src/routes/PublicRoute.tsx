import useAuthUser from "@/hooks/useAuthUser";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin h-5" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
