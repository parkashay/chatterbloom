/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as http from "../http.js";
import type * as schemas_friend from "../schemas/friend.js";
import type * as schemas_message from "../schemas/message.js";
import type * as services_chat from "../services/chat.js";
import type * as services_photo from "../services/photo.js";
import type * as services_user from "../services/user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  http: typeof http;
  "schemas/friend": typeof schemas_friend;
  "schemas/message": typeof schemas_message;
  "services/chat": typeof services_chat;
  "services/photo": typeof services_photo;
  "services/user": typeof services_user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
