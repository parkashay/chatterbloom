import { Route, Routes } from "react-router";
import { routes } from "./routes";
import { Login } from "@/pages/auth/login";
import { lazy, Suspense } from "react";
import { ChatLayout } from "@/components/layouts/chat-layout";
import { ChatPageNoReciever } from "@/pages/chat-page/chat-no-reciever";

const ChatPage = lazy(() => import("@/pages/chat-page"));

export const AppWithRoutes = () => {
  return (
    <Routes>
      <Route path={routes.home.path} element={<Login />} />
      <Route path={routes.chat.layout.path} element={<ChatLayout />}>
        <Route
          path={routes.chat.noReciever.path}
          element={<ChatPageNoReciever />}
        />
        <Route
          path={routes.chat.path}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ChatPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
