import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";
import RightPanel from "@/components/RightPanel";

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title =
      pathname === "/" ? "pingpost" : `${pathname.split("/")[1]} | pingpost`;
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl flex w-full gap-5 p-5">
        <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-6 shadow-sm sm:block lg:px-5 xl:w-80" />
        <Outlet />
        <RightPanel />
      </div>
      <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden" />
    </div>
  );
};

export default RootLayout;
