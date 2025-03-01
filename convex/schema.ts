import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { messageSchema } from "./schemas/message";

const schema = defineSchema({
  ...authTables,
  messages: messageSchema,
});

export default schema;
