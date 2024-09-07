import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationsPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `notifications | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full min-h-screen space-y-5">
      <div className="bg-card w-full shadow-sm h-[2.7rem] px-5 flex items-center justify-center rounded-2xl font-semibold text-center">
        Notifications
      </div>
    </div>
  );
};

export default NotificationsPage;
