"use client";

import { authClient } from "@/lib/auth-client";

// Check if current user is admin
export function useIsAdmin(): boolean {
  const { data: session } = authClient.useSession();
  return session?.user?.isAdmin || false;
}

// Check if user is authenticated
export function useIsAuthenticated(): boolean {
  const { data: session } = authClient.useSession();
  return !!session?.user;
}

// Get current user session
export function useCurrentUser() {
  const { data: session, isPending } = authClient.useSession();
  return {
    user: session?.user || null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    isAdmin: session?.user?.isAdmin || false,
  };
}