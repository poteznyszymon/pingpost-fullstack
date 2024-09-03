import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationsPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `notifications | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full h-screen flex-col space-y-5">NotificationsPage</div>
  );
};

export default NotificationsPage;
