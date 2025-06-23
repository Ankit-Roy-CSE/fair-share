"use client";

import { ConvexReactClient } from "convex/react";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

type ConvexClientProviderProps = {
  children: React.ReactNode;
};

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL environment variable is not set");
}
const convex = new ConvexReactClient(convexUrl);

export function ConvexClientProvider({ children } : ConvexClientProviderProps) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}