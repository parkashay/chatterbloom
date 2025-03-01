import { defineTable } from "convex/server";
import { v } from "convex/values";

export const friendSchema = defineTable({
  p1: v.id("users"),
  p2: v.id("users"),
});
