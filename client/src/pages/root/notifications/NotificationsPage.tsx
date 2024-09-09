import { NotificationComponent } from "@/components/NotificationComponent";
import NotificationSkeleton from "@/components/NotificationSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteNotifications from "@/hooks/useDeleteNotifications";
import useGetNotifications from "@/hooks/useGetNotifications";
import useSetNotificationsReaded from "@/hooks/useSetNotificationsReaded";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotificationsPage = () => {
  const { pathname } = useLocation();
  const { notifications, isPending, isRefetching } = useGetNotifications(
    { refetchInterval: 0 },
    "page"
  );
  const { setReaded } = useSetNotificationsReaded();
  const { deleteNotifications } = useDeleteNotifications();

  useEffect(() => {
    document.title = `notifications | pingpost`;
    setReaded();
  }, [pathname, setReaded]);

  return (
    <div className="w-full min-h-screen space-y-5">
      <div className="bg-card w-full relative shadow-sm h-[2.7rem] px-5 flex items-center justify-center rounded-2xl  text-center">
        Notifications
        {!isPending && !isRefetching && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute right-3 hover:bg-primary/10 p-1 rounded-full cursor-pointer">
                <MoreHorizontal />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                className="flex gap-2"
                onClick={() => deleteNotifications()}
              >
                <Trash2 className="size-4" />
                Delete all
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {notifications?.length === 0 && !isPending && !isRefetching && (
        <p className="text-center font-semibold">
          You don't have any activity yet
        </p>
      )}
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
          <NotificationComponent
            key={notification._id}
            notification={notification}
          />
        ))}
    </div>
  );
};

export default NotificationsPage;
