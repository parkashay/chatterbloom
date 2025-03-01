import { createPath, generatePath } from "react-router";

export const routes = {
  home: {
    path: "/",
  },
  login: {
    path: "/",
  },
  chat: {
    layout: {
      path: "/chat",
    },
    noReciever: {
      path: "/chat/:userId",
      createPath: (userId: string) => generatePath("/chat/:userId", { userId }),
    },
    path: "/chat/:userId/:recieverId",
    createPath: (userId: string, recieverId: string) =>
      generatePath("/chat/:userId/:recieverId", { userId, recieverId }),
  },
};
