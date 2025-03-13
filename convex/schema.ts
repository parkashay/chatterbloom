import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";
import { messageSchema } from "./schemas/message";

const schema = defineSchema({
  ...authTables,
  messages: messageSchema,
});

export default schema;
