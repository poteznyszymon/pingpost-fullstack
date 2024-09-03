import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/login/LoginPage";
import RegisterPage from "@/pages/auth/register/RegisterPage";
import HomePage from "@/pages/root/home/HomePage";
import RootLayout from "@/pages/root/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "./NotFound";
import ProfilePage from "@/pages/root/profile/ProfilePage";
import HashtagPage from "@/pages/root/hashtag/HashtagPage";
import ScrollToTop from "@/lib/ScrollToTop";
import NotificationsPage from "@/pages/root/notifications/NotificationsPage";
import BookmarksPage from "@/pages/root/bookmarks/BookmarksPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ScrollToTop>
        <ProtectedRoute />
      </ScrollToTop>
    ),
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "profile/:username",
            element: <ProfilePage />,
          },
          {
            path: "hashtag/:tag",
            element: <HashtagPage />,
          },
          {
            path: "notifications",
            element: <NotificationsPage />,
          },
          {
            path: "bookmarks",
            element: <BookmarksPage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: "/register",
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
