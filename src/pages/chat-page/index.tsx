import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/chat/chat-bubble";
import { MessagesList } from "@/components/chat/chat-message-list";
import { MessageReadHandler } from "@/components/chat/MessageReadHandler";
import { NewMessage } from "@/components/chat/new-message";
import { useChatPageParams } from "@/hooks/use-chat-page-params";
import { useQuery } from "convex/react";
import { RefCallback, useCallback } from "react";
import { api } from "~/_generated/api";
import { Id } from "~/_generated/dataModel";

export default function ChatPage() {
  const { userId, recieverId } = useChatPageParams();

  const reciever = useQuery(api.services.user.getSingleUser, {
    id: recieverId,
  });

  const messages = useQuery(api.services.chat.getMessages, {
    take: 30,
    participants: [userId as Id<"users">, recieverId as Id<"users">],
  });

  const scrollCallback: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (node) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    },
    [messages],
  );

  return (
    <div>
      <section className="h-full overflow-y-hidden">
        <MessagesList>
          {messages?.map((message, index) => {
            const senderId = message.senderId;
            const nextSenderId = messages[index + 1]?.senderId;
            return (
              <ChatBubble
                key={message._id}
                variant={message.senderId === userId ? "sent" : "received"}
                className="animate-in slide-in-from-bottom"
              >
                {message.senderId === userId ? null : (
                  <MessageReadHandler
                    messageId={message._id}
                    read={message.read}
                  />
                )}
                {message.senderId === userId ? null : (
                  <ChatAvatar
                    shouldShow={senderId !== nextSenderId}
                    fallback={reciever?.name?.charAt(0) || ""}
                    src={reciever?.image}
                  />
                )}

                <ChatBubbleMessage
                  variant={message.senderId === userId ? "sent" : "received"}
                >
                  {message.body}
                </ChatBubbleMessage>
              </ChatBubble>
            );
          })}
          <div ref={scrollCallback} />
        </MessagesList>
      </section>
      <NewMessage />
    </div>
  );
}

interface AvatarProps {
  shouldShow: boolean;
  fallback: string;
  src?: string;
}
function ChatAvatar({ shouldShow, src, fallback }: AvatarProps) {
  if (!shouldShow) return <div className="size-6" />;
  return (
    <ChatBubbleAvatar
      className="size-6 shrink-0"
      src={src}
      fallback={fallback}
    />
  );
}
