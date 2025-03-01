import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "~/_generated/server";
import schema from "~/schema";

export const sendMessage = mutation({
  args: schema.tables.messages.validator,
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      senderId: args.senderId,
      participants: args.participants.sort(),
      body: args.body,
      type: args.type,
    });
  },
});

export const getMessages = query({
  args: { take: v.optional(v.number()), participants: v.array(v.id("users")) },
  async handler(ctx, args) {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_participants", (q) =>
        q.eq("participants", args.participants.sort()),
      )
      .order("desc")
      .take(args.take || 50);
    return messages.reverse();
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getLatestMessages = query({
  args: {},
  async handler(ctx) {
    const authedUserId = await getAuthUserId(ctx);
    const messages = await ctx.db.query("messages").order("desc").collect();
    const usersMap = new Map<string, (typeof messages)[number]>();
    for (const message of messages) {
      if (usersMap.size >= 5) {
        break;
      }
      if (usersMap.has(message.participants.toString())) {
        continue;
      }
      usersMap.set(message.participants.toString(), message);
    }
    return Array.from(usersMap.values());
  },
});
