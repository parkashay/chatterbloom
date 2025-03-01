import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/chat/chat-bubble";
import { MessagesList } from "@/components/chat/chat-message-list";
import { NewMessage } from "@/components/chat/new-message";
import { AuthContext } from "@/components/providers/auth-context";
import { useChatPageParams } from "@/hooks/use-chat-page-params";
import { useQuery } from "convex/react";
import { useContext, useEffect } from "react";
import { api } from "~/_generated/api";
import { Id } from "~/_generated/dataModel";

export default function ChatPage() {
  const { userId, recieverId } = useChatPageParams();

  const { user } = useContext(AuthContext);
  const reciever = useQuery(api.services.user.getSingleUser, {
    id: recieverId,
  });

  const messages = useQuery(api.services.chat.getMessages, {
    take: 30,
    participants: [userId as Id<"users">, recieverId as Id<"users">],
  });

  useEffect(() => {
    const newMessageIndicator = document.getElementById(
      "new-message-indicator",
    );
    if (newMessageIndicator) {
      newMessageIndicator.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages?.length]);

  return (
    <div>
      <section className="h-full overflow-y-hidden">
        <MessagesList>
          {messages?.map((message) => {
            return (
              <ChatBubble
                key={message._id}
                variant={message.senderId === user?.id ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.senderId === user?.id
                      ? user?.avatar
                      : reciever?.image
                  }
                  fallback={
                    message.senderId === user?.id
                      ? user?.name?.charAt(0)
                      : reciever?.name?.charAt(0)
                  }
                />

                <ChatBubbleMessage
                  variant={message.senderId === user?.id ? "sent" : "received"}
                >
                  {message.body}
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
          <div id="new-message-indicator" />
        </MessagesList>
      </section>
      <NewMessage />
    </div>
  );
}
