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
import type * as contacts from "../contacts.js";
import type * as dashboard from "../dashboard.js";
import type * as dummy from "../dummy.js";
import type * as expenses from "../expenses.js";
import type * as grpExpenses from "../grpExpenses.js";
import type * as settlements from "../settlements.js";
import type * as types from "../types.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  contacts: typeof contacts;
  dashboard: typeof dashboard;
  dummy: typeof dummy;
  expenses: typeof expenses;
  grpExpenses: typeof grpExpenses;
  settlements: typeof settlements;
  types: typeof types;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
