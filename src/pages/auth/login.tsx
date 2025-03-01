import { AuthContext } from "@/components/providers/auth-context";
import { InteractiveHoverButton } from "@/components/ui/hover-button";
import { routes } from "@/routes/routes";
import { useAuthActions } from "@convex-dev/auth/react";
import { MessageCircle } from "lucide-react";
import { useContext } from "react";
import { Navigate } from "react-router";

export function Login() {
  const { signIn } = useAuthActions();

  const { user } = useContext(AuthContext);

  if (user !== undefined && user !== null) {
    return <Navigate to={routes.chat.noReciever.createPath(user.id)} />;
  }

  const handleSignIn = () => signIn("google");

  return (
    <div className="bg-background relative h-screen w-full overflow-hidden">
      {/* Decorative background elements */}
      <div className="bg-primary/5 absolute top-[-10%] right-[-5%] h-96 w-96 rounded-full blur-3xl"></div>
      <div className="bg-secondary/10 absolute bottom-[-15%] left-[-10%] h-[30rem] w-[30rem] rounded-full blur-3xl"></div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto flex h-full flex-col items-center justify-center px-4">
        {/* Logo and app name */}
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-primary/10 rounded-full p-3">
            <MessageCircle className="text-primary h-7 w-7" />
          </div>
          <h1 className="text-primary text-3xl font-bold md:text-4xl">
            ChatterBloom
          </h1>
        </div>

        {/* Tagline */}
        <h2 className="text-foreground mb-6 max-w-md text-center text-2xl font-medium md:text-3xl">
          Where conversations <span className="text-primary">bloom</span> and
          connections thrive
        </h2>

        {/* Short description */}
        <p className="text-muted mb-10 max-w-md text-center">
          Experience a chat platform designed with a personal touch. Connect
          with friends and make new ones.
        </p>

        {/* Sign-in button */}
        <InteractiveHoverButton
          text="Sign In With Google"
          onClick={handleSignIn}
          className="border-primary bg-accent text-primary w-full max-w-md py-4"
        />

        {/* Decorative circles */}
        <div className="bg-primary/30 absolute top-1/4 left-1/4 h-6 w-6 animate-pulse rounded-full"></div>
        <div
          className="bg-secondary/40 absolute top-3/4 right-1/3 h-4 w-4 animate-pulse rounded-full"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="bg-primary/20 absolute bottom-1/4 left-2/3 h-5 w-5 animate-pulse rounded-full"
          style={{ animationDelay: "0.7s" }}
        ></div>
      </div>
    </div>
  );
}
