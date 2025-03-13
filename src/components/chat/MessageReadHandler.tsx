import { useMutation } from "convex/react";
import { RefCallback, useCallback } from "react";
import { api } from "~/_generated/api";
import { Id } from "~/_generated/dataModel";

export function MessageReadHandler({
  messageId,
  read,
}: {
  messageId: Id<"messages">;
  read: boolean;
}) {
  const markMessageAsRead = useMutation(api.services.chat.readMessage);

  const readMessageCallback: RefCallback<HTMLSpanElement> = useCallback(
    (node) => {
      if (node && !read && messageId) {
        markMessageAsRead({ messageId });
      }
    },
    [read, messageId],
  );

  return <span ref={readMessageCallback} />;
}
