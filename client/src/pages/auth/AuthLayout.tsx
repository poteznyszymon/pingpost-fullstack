import ChangeThemeButton from "@/components/ChangeThemeButton";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${pathname.split("/")[1]} | pingpost`;
  }, [pathname]);

  return (
    <div className="h-screen w-screen">
      {" "}
      <div className="bg-card fixed top-0 z-10 hidden w-full items-center justify-between px-5 py-3 shadow-sm sm:flex">
        <Link to="/login">
          <h3 className="text-primary text-2xl font-semibold tracking-tighter">
            pingpost
          </h3>
        </Link>
        <ChangeThemeButton />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
