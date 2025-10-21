"use server";

import { db } from "@/lib/db";
import { team, user } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type AdminTeamWithDetails = {
  id: string;
  name: string;
  status: "pending" | "approved";
  teamLeaderId: string;
  teamMembers: string[];
  createdAt: Date;
  updatedAt: Date;
  teamLeader: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
    phone: string;
  }>;
  totalMembers: number;
};

export async function getAllTeamsWithDetails() {
  try {
    const teams = await db
      .select({
        id: team.id,
        name: team.name,
        status: team.status,
        teamLeaderId: team.teamLeaderId,
        teamMembers: team.teamMembers,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        teamLeader: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      })
      .from(team)
      .leftJoin(user, eq(team.teamLeaderId, user.id))
      .orderBy(desc(team.createdAt));

    // Fetch team members details
    const teamsWithMembers = await Promise.all(
      teams.map(async (teamData) => {
        let members: Array<{
          id: string;
          name: string;
          email: string;
          phone: string;
        }> = [];

        if (teamData.teamMembers && teamData.teamMembers.length > 0) {
          const memberDetails = await db
            .select({
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
            })
            .from(user)
            .where(
              // Use a proper query for array membership
              // This is a simplified version - you might need to adjust based on your DB
              eq(user.id, teamData.teamMembers[0]) // For now, handle first member
            );

          // For multiple members, we need to fetch each one
          const allMembers = await Promise.all(
            teamData.teamMembers.map(async (memberId) => {
              const memberDetail = await db
                .select({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                })
                .from(user)
                .where(eq(user.id, memberId))
                .limit(1);
              return memberDetail[0] || null;
            })
          );

          members = allMembers.filter(Boolean);
        }

        return {
          ...teamData,
          members,
          totalMembers: members.length + 1, // +1 for team leader
        };
      })
    );

    return { success: true, data: teamsWithMembers as AdminTeamWithDetails[] };
  } catch (error) {
    console.error("Failed to get teams with details:", error);
    return { success: false, error: "Failed to get teams with details" };
  }
}

export async function getTeamById(id: string) {
  try {
    const teamData = await db
      .select({
        id: team.id,
        name: team.name,
        status: team.status,
        teamLeaderId: team.teamLeaderId,
        teamMembers: team.teamMembers,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        teamLeader: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      })
      .from(team)
      .leftJoin(user, eq(team.teamLeaderId, user.id))
      .where(eq(team.id, id))
      .limit(1);

    if (teamData.length === 0) {
      return { success: false, error: "Team not found" };
    }

    const teamInfo = teamData[0];
    let members: Array<{
      id: string;
      name: string;
      email: string;
      phone: string;
    }> = [];

    if (teamInfo.teamMembers && teamInfo.teamMembers.length > 0) {
      const allMembers = await Promise.all(
        teamInfo.teamMembers.map(async (memberId) => {
          const memberDetail = await db
            .select({
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
            })
            .from(user)
            .where(eq(user.id, memberId))
            .limit(1);
          return memberDetail[0] || null;
        })
      );

      members = allMembers.filter(Boolean);
    }

    const result = {
      ...teamInfo,
      members,
      totalMembers: members.length + 1,
    };

    return { success: true, data: result as AdminTeamWithDetails };
  } catch (error) {
    console.error("Failed to get team:", error);
    return { success: false, error: "Failed to get team" };
  }
}

export async function approveTeam(id: string) {
  try {
    const updatedTeam = await db
      .update(team)
      .set({
        status: "approved",
        updatedAt: new Date(),
      })
      .where(eq(team.id, id))
      .returning();

    if (updatedTeam.length === 0) {
      return { success: false, error: "Team not found" };
    }

    revalidatePath("/admin/teams");
    return { success: true, data: updatedTeam[0] };
  } catch (error) {
    console.error("Failed to approve team:", error);
    return { success: false, error: "Failed to approve team" };
  }
}

export async function deleteTeam(id: string) {
  try {
    const deletedTeam = await db
      .delete(team)
      .where(eq(team.id, id))
      .returning();

    if (deletedTeam.length === 0) {
      return { success: false, error: "Team not found" };
    }

    revalidatePath("/admin/teams");
    return { success: true, data: deletedTeam[0] };
  } catch (error) {
    console.error("Failed to delete team:", error);
    return { success: false, error: "Failed to delete team" };
  }
}

export async function getAllTeams() {
  try {
    const teams = await db.select().from(team).orderBy(desc(team.createdAt));
    return { success: true, data: teams };
  } catch (error) {
    console.error("Failed to get teams:", error);
    return { success: false, error: "Failed to get teams" };
  }
}
