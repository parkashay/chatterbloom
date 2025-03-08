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

interface Props {
  message: DataModel["messages"]["document"];
  userId: Id<"users">;
}
export const RecievedChat = ({ message, userId }: Props) => {
  const participantId = message.participants.filter((i) => i !== userId)[0];
  const participant = useQuery(api.services.user.getSingleUser, {
    id: participantId,
  });
  const { recieverId } = useChatPageParams();

  const { open: isSidebarExpanded } = useSidebar();

  return (
    <Link
      to={routes.chat.createPath(userId, participantId)}
      key={message._id}
      className={cn(
        "group hover:bg-accent flex items-start gap-3 border-b border-gray-100 p-4 transition-colors dark:border-gray-800",
        { "bg-accent [&_*]:text-primary": participantId === recieverId },
        "chat-container",
      )}
    >
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
        <span className="conversation-participant font-medium">
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
