import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { AppWithRoutes } from "./routes";
import { UserProvider } from "./components/providers/auth-context";
import { ThemeProvider } from "./components/providers/theme-provider";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <UserProvider>
          <ThemeProvider>
            <AppWithRoutes />
          </ThemeProvider>
        </UserProvider>
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>,
);
