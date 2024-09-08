import { NotificationComponent } from "@/components/NotificationComponent";
import NotificationSkeleton from "@/components/NotificationSkeleton";
import useGetNotifications from "@/hooks/useGetNotifications";
import { MoreHorizontal } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationsPage = () => {
  const { pathname } = useLocation();
  const { notifications, isPending, isRefetching } = useGetNotifications(
    { refetchInterval: 0 },
    "page"
  );

  useEffect(() => {
    document.title = `notifications | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full min-h-screen space-y-5">
      <div className="bg-card w-full relative shadow-sm h-[2.7rem] px-5 flex items-center justify-center rounded-2xl font-semibold text-center">
        Notifications
        {!isPending && !isRefetching && (
          <div className="absolute right-5 hover:bg-primary/10 p-1 rounded-full cursor-pointer">
            <MoreHorizontal />
          </div>
        )}
      </div>
      {(isPending || isRefetching) && (
        <>
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </>
      )}
      {!isPending &&
        !isRefetching &&
        notifications?.map((notification) => (
          <NotificationComponent notification={notification} />
        ))}
    </div>
  );
};

export default NotificationsPage;
