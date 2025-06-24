"use client";

import { Authenticated } from "convex/react";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Authenticated>
      <div className="container mx-auto mt-24 mb-20 px-4">{children}</div>
    </Authenticated>
  );
};

export default MainLayout;