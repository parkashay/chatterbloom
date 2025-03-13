import { useChatPageParams } from "@/hooks/use-chat-page-params";
import { useMutation } from "convex/react";
import { CornerDownLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "~/_generated/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function NewMessage() {
  const [newMessageText, setNewMessageText] = useState("");

  const { userId, recieverId } = useChatPageParams();
  const sendMessage = useMutation(api.services.chat.sendMessage);

  useEffect(() => {
    const chatInput = document.getElementById("chat-input");
    if (chatInput) {
      chatInput.focus();
    }
  }, [recieverId]);

  const handleSendMessage = async () => {
    if (!newMessageText.trim() || !userId || !recieverId) return;
    await sendMessage({
      senderId: userId,
      participants: [userId, recieverId],
      body: newMessageText,
      type: "text",
      read: false,
    });
  };

  return (
    <div className="absolute bottom-0 w-full p-3">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!newMessageText.trim()) return;
          setNewMessageText("");
          await handleSendMessage();
        }}
        className="bg-background focus-within:ring-ring w-full rounded-lg border p-1 focus-within:ring-1"
      >
        <Input
          id="chat-input"
          value={newMessageText}
          onChange={(e) => setNewMessageText(e.target.value)}
          placeholder="Type your message..."
          className="bg-background min-h-12 resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0"
          autoComplete="off"
        />
        <div className="flex items-center justify-between p-3 pt-0">
          {/* <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleAttachFile}
            >
              <Paperclip className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={handleMicrophoneClick}
            >
              <Mic className="size-4" />
            </Button>
          </div> */}
          <Button type="submit" size="sm" className="ml-auto gap-1.5">
            Send Message
            <CornerDownLeft className="size-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
