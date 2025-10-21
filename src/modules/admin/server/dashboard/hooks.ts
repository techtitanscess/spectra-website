"use client";

import { useQuery } from "@tanstack/react-query";

type DashboardStats = {
  totalUsers: number;
  newUsersThisMonth: number;
  adminUsers: number;
  activeEvents: number;
  upcomingEvents: number;
  totalTickets: number;
  pendingTickets: number;
  totalTeams: number;
  pendingTeams: number;
  totalRevenue: number;
  recentActivity: Array<{
    type: "user" | "ticket" | "team";
    title: string;
    description: string;
    time: string;
  }>;
};

async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch("/api/admin/dashboard/stats", {
    credentials: "include",
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard statistics");
  }
  
  return res.json();
}

export function useAdminDashboardStats() {
  return useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchDashboardStats,
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });
}