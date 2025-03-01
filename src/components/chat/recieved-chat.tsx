import { Doc } from "@convex-dev/auth/server";
import { DataModel, Id } from "~/_generated/dataModel";
import { AuthContextState } from "../providers/auth-context";
import { useQuery } from "convex/react";
import { api } from "~/_generated/api";
import { Link } from "react-router";
import { routes } from "@/routes/routes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { useChatPageParams } from "@/hooks/use-chat-page-params";

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

  return (
    <Link
      to={routes.chat.createPath(userId, participantId)}
      key={message._id}
      className={cn(
        "group dark:hover:bg-accent flex items-start gap-3 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 dark:border-gray-800",
        { "bg-secondary": participantId === recieverId },
      )}
    >
      <Avatar className="h-10 w-10 ring-2 ring-gray-100 dark:ring-gray-700">
        <AvatarImage src={participant?.image} alt={participant?.name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {participant?.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-1 flex-col overflow-hidden">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {participant?.name || "Unknown User"}
        </span>

        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {message.body || "No message content"}
        </p>

        <span className="mt-1 text-right text-[10px] text-gray-500 dark:text-gray-400">
          {new Date(message._creationTime).toLocaleString()}
        </span>
      </div>
    </Link>
  );
};
