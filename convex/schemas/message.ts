import { defineTable } from "convex/server";
import { v } from "convex/values";

export const messageSchema = defineTable({
  senderId: v.id("users"),
  participants: v.array(v.id("users")),
  body: v.string(),
  type: v.string(),
}).index("by_participants", ["participants"]);
