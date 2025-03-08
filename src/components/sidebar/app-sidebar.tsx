"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  useSidebar,
} from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { MessageCircle } from "lucide-react";
import { api } from "~/_generated/api";
import { RecievedChat } from "../chat/recieved-chat";
import { AuthContext } from "../providers/auth-context";
import { Skeleton } from "../ui/skeleton";
import { SuggestedUsers } from "./suggested-users";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(AuthContext);
  const { open: isSidebarExpanded } = useSidebar();

  const latestMessages = useQuery(api.services.chat.getLatestMessages);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chatElements = document.querySelectorAll(".conversation-participant");
    chatElements.forEach((element) => {
      const chatContainer = element.closest(".chat-container") as HTMLElement;
      if (!chatContainer) return;

      if (
        element.innerHTML
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      ) {
        chatContainer.style.display = "flex";
      } else {
        chatContainer.style.display = "none";
      }
    });
  };

  return (
    <Sidebar collapsible="icon" className="overflow-hidden" {...props}>
      {isSidebarExpanded ? (
        <SidebarHeader className="bg-primary/10 gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <MessageCircle className="fill-primary stroke-primary" />
            {/* <Label className="flex items-center gap-2 text-sm">
            <span>Unreads</span>
            <Switch className="shadow-none" />
          </Label> */}
          </div>
          <SidebarInput
            placeholder="Search conversation..."
            onChange={handleChange}
            className="h-10"
          />
        </SidebarHeader>
      ) : (
        <div className="bg-primary/20 flex aspect-square w-full items-center justify-center">
          <MessageCircle className="fill-primary stroke-primary" />
        </div>
      )}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {latestMessages?.map((message, idx) => {
              if (!user?.id) {
                return <Skeleton className="h-6 w-full" key={idx} />;
              }
              return (
                <RecievedChat
                  message={message}
                  userId={user.id}
                  key={user.id}
                />
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
        {isSidebarExpanded ? <SuggestedUsers /> : null}
      </SidebarContent>
    </Sidebar>
  );
}
