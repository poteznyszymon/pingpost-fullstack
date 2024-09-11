import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";
import RightPanel from "@/components/RightPanel";
import useGetNotifications from "@/hooks/useGetNotifications";

const RootLayout = () => {
  const { notifications } = useGetNotifications(
    { refetchInterval: 1000 * 10 },
    "menubar"
  );

  const newNotifications = notifications?.some(
    (notification) => !notification.read
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl flex w-full gap-5 p-5 mb-10 sm:mb-0">
        <MenuBar
          count={notifications?.length || 1}
          newNotifications={newNotifications}
          className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-6 shadow-sm sm:block lg:px-5 xl:w-80"
        />
        <Outlet />
        <RightPanel />
      </div>
      <MenuBar
        count={notifications?.length || 1}
        newNotifications={newNotifications}
        className="fixed bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden"
      />
    </div>
  );
};

export default RootLayout;
