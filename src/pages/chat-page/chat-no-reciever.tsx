import { AuthContext } from "@/components/providers/auth-context";
import { useContext } from "react";

export function ChatPageNoReciever() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4">
      <div className="bg-background border-border w-full max-w-md rounded-lg border p-6 shadow-md">
        <h2 className="text-primary text-2xl font-semibold">
          Welcome, {user?.name} 👋
        </h2>
        <p className="text-muted-foreground mt-2">
          Select a conversation to start chatting.
        </p>
      </div>
    </div>
  );
}
