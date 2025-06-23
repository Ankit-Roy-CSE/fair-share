"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("convex/server");
var values_1 = require("convex/values");
exports.default = (0, server_1.defineSchema)({
    // Users Schema
    users: (0, server_1.defineTable)({
        name: values_1.v.string(),
        email: values_1.v.string(),
        tokenIdentifier: values_1.v.string(),
        imageUrl: values_1.v.optional(values_1.v.string()),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("by_email", ["email"])
        .searchIndex("search_name", { searchField: "name" })
        .searchIndex("search_email", { searchField: "email" }),
});
