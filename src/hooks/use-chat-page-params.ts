import { useParams } from "react-router";
import { Id } from "~/_generated/dataModel";

export function useChatPageParams() {
  const { userId, recieverId } = useParams<{
    userId: Id<"users">;
    recieverId?: Id<"users">;
  }>();
  return { userId, recieverId };
}
