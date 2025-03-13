import { useChatPageParams } from "@/hooks/use-chat-page-params";
import { cn } from "@/lib/utils";
import { routes } from "@/routes/routes";
import { useQuery } from "convex/react";
import { Link } from "react-router";
import { api } from "~/_generated/api";
import { DataModel, Id } from "~/_generated/dataModel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSidebar } from "../ui/sidebar";
import { ToolTipOnHover } from "../ui/tooltip-on-hover";
import { Skeleton } from "../ui/skeleton";

interface Props {
  message: DataModel["messages"]["document"];
  userId: Id<"users">;
  isUnread?: boolean;
}
export const RecievedChat = ({ message, userId }: Props) => {
  const participantId = message.participants.find((id) => id !== userId);

  if (!participantId) return <Skeleton className="h-6 w-full" />;

  const participant = useQuery(api.services.user.getSingleUser, {
    id: participantId,
  });
  const { recieverId } = useChatPageParams();

  const { open: isSidebarExpanded } = useSidebar();

  const isChatSelected = participantId === recieverId;

  const isUnread = !message.read && message.senderId !== userId;

  return (
    <Link
      to={routes.chat.createPath(userId, participantId)}
      key={message._id}
      className={cn(
        "group hover:bg-accent relative flex items-start gap-3 border-b border-gray-100 p-4 transition-colors dark:border-gray-800",
        { "bg-accent [&_*]:text-primary": isChatSelected },
        { "[&_*]:font-semibold": isUnread },
        "chat-container",
      )}
    >
      {!isChatSelected && isUnread && (
        <span className="bg-primary absolute top-5 right-2 z-1 flex aspect-square w-5 -translate-y-1/2 items-center justify-center rounded-full text-white">
          1
        </span>
      )}

      <ToolTipOnHover
        content={participant?.name}
        shouldOpen={!isSidebarExpanded}
      >
        <Avatar className="h-10 w-10 ring-2 ring-gray-100 dark:ring-gray-700">
          <AvatarImage src={participant?.image} alt={participant?.name} />
          <AvatarFallback className="bg-primary/10">
            {participant?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </ToolTipOnHover>

      <div
        className={cn("flex flex-1 flex-col overflow-hidden", {
          hidden: !isSidebarExpanded,
        })}
      >
        <span
          className={cn("conversation-participant", {
            "font-medium": isChatSelected,
          })}
        >
          {participant?.name || "Unknown User"}
        </span>

        <p className="line-clamp-2 text-sm">
          {message.body || "No message content"}
        </p>

        <span className="mt-1 text-right text-[10px]">
          {new Date(message._creationTime).toLocaleString()}
        </span>
      </div>
    </Link>
  );
};
