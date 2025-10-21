"use server";

import { db } from "@/lib/db";
import { user, event, ticket, team } from "@/lib/db/schema";
import { count, eq, gte, sql } from "drizzle-orm";

export interface DashboardStats {
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
    type: 'user' | 'ticket' | 'event' | 'team';
    title: string;
    description: string;
    time: string;
  }>;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    // Get current date and first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all stats in parallel
    const [
      totalUsersResult,
      newUsersThisMonthResult,
      adminUsersResult,
      activeEventsResult,
      upcomingEventsResult,
      totalTicketsResult,
      pendingTicketsResult,
      totalTeamsResult,
      pendingTeamsResult,
    ] = await Promise.all([
      // Total users
      db.select({ count: count() }).from(user),
      
      // New users this month
      db.select({ count: count() }).from(user).where(gte(user.createdAt, firstDayOfMonth)),
      
      // Admin users
      db.select({ count: count() }).from(user).where(eq(user.isAdmin, true)),
      
      // Active events (events that are currently running)
      db.select({ count: count() }).from(event).where(
        sql`${event.startDate} <= ${now} AND ${event.endDate} >= ${now}`
      ),
      
      // Upcoming events
      db.select({ count: count() }).from(event).where(
        sql`${event.startDate} > ${now}`
      ),
      
      // Total tickets
      db.select({ count: count() }).from(ticket),
      
      // Pending tickets
      db.select({ count: count() }).from(ticket).where(eq(ticket.status, "pending")),
      
      // Total teams
      db.select({ count: count() }).from(team),
      
      // Pending teams
      db.select({ count: count() }).from(team).where(eq(team.status, "pending")),
    ]);

    // Calculate total revenue (sum of all approved tickets * event cost)
    const revenueResult = await db
      .select({
        totalRevenue: sql<number>`COALESCE(SUM(${event.ticketCost}), 0)`,
      })
      .from(ticket)
      .innerJoin(event, eq(ticket.eventId, event.id))
      .where(eq(ticket.status, "approved"));

    // Get recent activity (last 10 activities)
    const recentUsers = await db
      .select({
        name: user.name,
        createdAt: user.createdAt,
      })
      .from(user)
      .orderBy(sql`${user.createdAt} DESC`)
      .limit(3);

    const recentTickets = await db
      .select({
        name: ticket.name,
        createdAt: ticket.createdAt,
        eventName: event.name,
      })
      .from(ticket)
      .innerJoin(event, eq(ticket.eventId, event.id))
      .orderBy(sql`${ticket.createdAt} DESC`)
      .limit(3);

    const recentTeams = await db
      .select({
        name: team.name,
        createdAt: team.createdAt,
      })
      .from(team)
      .orderBy(sql`${team.createdAt} DESC`)
      .limit(2);

    // Format recent activity
    const recentActivity = [
      ...recentUsers.map(u => ({
        type: 'user' as const,
        title: 'New User Registration',
        description: `${u.name} joined the platform`,
        createdAt: u.createdAt,
      })),
      ...recentTickets.map(t => ({
        type: 'ticket' as const,
        title: 'Ticket Request',
        description: `${t.name} requested ticket for ${t.eventName}`,
        createdAt: t.createdAt,
      })),
      ...recentTeams.map(t => ({
        type: 'team' as const,
        title: 'Team Created',
        description: `Team "${t.name}" was created`,
        createdAt: t.createdAt,
      })),
    ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8)
    .map(item => ({
      type: item.type,
      title: item.title,
      description: item.description,
      time: formatTimeAgo(item.createdAt),
    }));

    return {
      totalUsers: totalUsersResult[0]?.count || 0,
      newUsersThisMonth: newUsersThisMonthResult[0]?.count || 0,
      adminUsers: adminUsersResult[0]?.count || 0,
      activeEvents: activeEventsResult[0]?.count || 0,
      upcomingEvents: upcomingEventsResult[0]?.count || 0,
      totalTickets: totalTicketsResult[0]?.count || 0,
      pendingTickets: pendingTicketsResult[0]?.count || 0,
      totalTeams: totalTeamsResult[0]?.count || 0,
      pendingTeams: pendingTeamsResult[0]?.count || 0,
      totalRevenue: revenueResult[0]?.totalRevenue || 0,
      recentActivity,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
}