import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useChatPageParams } from "@/hooks/use-chat-page-params";
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { User } from "lucide-react";
import { useContext } from "react";
import { api } from "~/_generated/api";
import { ThemeToggle } from "../common/theme-toggle";
import { AuthContext } from "../providers/auth-context";
import { Button } from "../ui/button";

export function ChatHeader() {
  const { recieverId } = useChatPageParams();
  const { user } = useContext(AuthContext);
  const reciever = useQuery(api.services.user.getSingleUser, {
    id: recieverId,
  });

  const { signOut } = useAuthActions();

  return (
    <header className="border-border/30 flex w-full items-center justify-between border-b px-4 py-3 shadow-sm">
      <div className="flex items-center">
        {reciever && (
          <div className="from-secondary-light to-secondary mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br font-medium text-white shadow-sm">
            <img src={reciever?.image} alt={reciever?.name?.charAt(0)} />
          </div>
        )}
        <div>
          <h2 className="text-foreground font-semibold">{reciever?.name}</h2>
          <p className="text-muted-foreground text-xs">{reciever?.email}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* <button className="text-secondary-foreground hover:text-primary hover:bg-accent/30 rounded-full p-1">
          <Search className="h-5 w-5" />
        </button> */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <User className="text-secondary-foreground hover:text-primary h-5 w-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="destructive" onClick={signOut}>
                Log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  );
}
