import { Navigate, Outlet } from "react-router";
import { ChatHeader } from "../header/chat-header";
import { AppSidebar } from "../sidebar/app-sidebar";
import { Separator } from "../ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "~/_generated/api";
import { routes } from "@/routes/routes";

export function ChatLayout() {
  const isAuthenticated = useQuery(api.auth.isAuthenticated);
  if (isAuthenticated !== undefined && !isAuthenticated)
    return <Navigate to={routes.login.path} />;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <ChatHeader />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
