"use client";

import React from "react";
import { useIsAdmin } from "@/lib/rbac";

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const isAdmin = useIsAdmin();

  if (!isAdmin) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}