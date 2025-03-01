import { routes } from "@/routes/routes";
import { useQuery } from "convex/react";
import { Send } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { api } from "~/_generated/api";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const SuggestedUsers = () => {
  const users = useQuery(api.services.user.getUsers, {});

  const navigate = useNavigate();
  const { userId } = useParams();

  const handleMessage = (recieverId: string) => {
    if (!userId) return;
    navigate(routes.chat.createPath(userId, recieverId));
  };

  return (
    <div className="space-y-4 p-3">
      <h1 className="text-primary text-xl font-semibold">Suggested Users</h1>
      {users?.map((user) => (
        <div className="flex gap-3">
          <Avatar className="mt-1">
            <AvatarImage src={user?.image} />
            <AvatarFallback>({user?.name?.charAt(0)})</AvatarFallback>
          </Avatar>
          <div className="flex grow flex-col gap-3">
            <div className="space-y-1">
              <p className="text-primary text-sm font-semibold">{user?.name}</p>
              <p className="text-muted-foreground text-xs">2 min ago</p>
            </div>
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                size="sm"
                onClick={() => handleMessage(user._id)}
              >
                Message <Send className="size-4" />
              </Button>
              {/* <Button size="sm" variant="outline">
                Decline
              </Button> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
