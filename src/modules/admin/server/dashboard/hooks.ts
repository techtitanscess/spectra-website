"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "./actions";

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}