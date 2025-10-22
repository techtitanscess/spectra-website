"use client";

import React from "react";
import { useIsAuthenticated } from "@/lib/rbac";

interface AuthOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AuthOnly({ children, fallback = null }: AuthOnlyProps) {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}