import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { query } from "~/_generated/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getUsers = query({
  args: { take: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const authedUserId = await getAuthUserId(ctx);
    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("_id"), authedUserId))
      .take(args.take || 50);
    return users;
  },
});

export const getSingleUser = query({
  args: { id: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.id) return null;
    return ctx.db.get(args.id);
  },
});
