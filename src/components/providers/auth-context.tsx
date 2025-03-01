import { useQuery } from "convex/react";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { api } from "~/_generated/api";

interface AuthContextState {
  user?: {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
  } | null;
}

const initialState: AuthContextState = {
  user: null,
};

export const AuthContext = createContext(initialState);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const currentUser = useQuery(api.services.user.getCurrentUser);
  const [user, setUser] = useState(initialState.user);

  useEffect(() => {
    if (currentUser) {
      setUser({
        email: currentUser.email,
        id: currentUser._id,
        name: currentUser.name,
        avatar: currentUser.image,
      });
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
