import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const sendPhoto = mutation({
  args: {
    user: v.string(),
    fileUrl: v.string(),
    fineName: v.string(),
    fileSize: v.number(),
  },
  handler: async (ctx, args) => {
    console.log(ctx);
  },
});
