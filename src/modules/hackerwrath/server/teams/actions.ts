"use server";

import { db } from "@/lib/db";
import { team, teamInvite, user } from "@/lib/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface CreateTeamData {
  name: string;
  teamLeaderId: string;
  memberEmails: string[];
}

export interface TeamMemberPublic {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface TeamWithDetails {
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
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
  }>;
}

export interface TeamWithFullDetails {
  id: string;
  name: string;
  status: "pending" | "approved";
  teamLeaderId: string;
  teamMembers: string[];
  createdAt: Date;
  updatedAt: Date;
  teamLeader: TeamMemberPublic;
  members: TeamMemberPublic[];
  totalMembers: number;
}

export interface TeamInviteWithDetails {
  id: string;
  teamId: string;
  inviteeId: string;
  inviterId: string;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
  updatedAt: Date;
  team: {
    id: string;
    name: string;
    teamLeader: {
      id: string;
      name: string;
      email: string;
    };
  };
  inviter: {
    id: string;
    name: string;
    email: string;
  };
}

export async function createTeam(data: CreateTeamData) {
  try {
    const { name, teamLeaderId, memberEmails } = data;

    // Find users by email
    const members = await db
      .select()
      .from(user)
      .where(or(...memberEmails.map((email) => eq(user.email, email))));

    if (members.length !== memberEmails.length) {
      const foundEmails = members.map((m) => m.email);
      const notFoundEmails = memberEmails.filter(
        (email) => !foundEmails.includes(email)
      );
      throw new Error(
        `Users not found for emails: ${notFoundEmails.join(", ")}`
      );
    }

    // Check if team leader is trying to invite themselves
    const teamLeaderEmail = members.find((m) => m.id === teamLeaderId)?.email;
    if (memberEmails.includes(teamLeaderEmail || "")) {
      throw new Error("You cannot invite yourself to the team");
    }

    // Check team size (leader + max 3 members)
    if (members.length > 3) {
      throw new Error("A team can have a maximum of 3 members plus the leader");
    }

    const teamId = nanoid();

    // Create team
    await db.insert(team).values({
      id: teamId,
      name,
      teamLeaderId,
      teamMembers: [],
    });

    // Create invites for each member
    const invites = members.map((member) => ({
      id: nanoid(),
      teamId,
      inviteeId: member.id,
      inviterId: teamLeaderId,
      status: "pending" as const,
    }));

    if (invites.length > 0) {
      await db.insert(teamInvite).values(invites);
    }

    return { success: true, teamId };
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create team"
    );
  }
}

export async function searchUsersByEmail(query: string, limit = 10) {
  try {
    if (!query || query.length < 2) {
      return [];
    }

    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
      })
      .from(user)
      .where(ilike(user.email, `%${query}%`))
      .limit(limit);

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}

export async function getUserTeamInvites(userId: string) {
  try {
    const invites = await db
      .select({
        id: teamInvite.id,
        teamId: teamInvite.teamId,
        inviteeId: teamInvite.inviteeId,
        inviterId: teamInvite.inviterId,
        status: teamInvite.status,
        createdAt: teamInvite.createdAt,
        updatedAt: teamInvite.updatedAt,
        team: {
          id: team.id,
          name: team.name,
        },
        teamLeader: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(teamInvite)
      .innerJoin(team, eq(teamInvite.teamId, team.id))
      .innerJoin(user, eq(team.teamLeaderId, user.id))
      .where(
        and(eq(teamInvite.inviteeId, userId), eq(teamInvite.status, "pending"))
      );

    return invites.map((invite) => ({
      id: invite.id,
      teamId: invite.teamId,
      inviteeId: invite.inviteeId,
      inviterId: invite.inviterId,
      status: invite.status,
      createdAt: invite.createdAt,
      updatedAt: invite.updatedAt,
      team: {
        id: invite.team.id,
        name: invite.team.name,
        teamLeader: invite.teamLeader,
      },
      inviter: invite.teamLeader,
    })) as TeamInviteWithDetails[];
  } catch (error) {
    console.error("Error getting user team invites:", error);
    return [];
  }
}

export async function respondToTeamInvite(
  inviteId: string,
  userId: string,
  response: "accepted" | "declined"
) {
  try {
    // Get the invite
    const invite = await db
      .select()
      .from(teamInvite)
      .where(
        and(
          eq(teamInvite.id, inviteId),
          eq(teamInvite.inviteeId, userId),
          eq(teamInvite.status, "pending")
        )
      )
      .limit(1);

    if (invite.length === 0) {
      throw new Error("Invite not found or already responded to");
    }

    // Update invite status
    await db
      .update(teamInvite)
      .set({
        status: response,
        updatedAt: new Date(),
      })
      .where(eq(teamInvite.id, inviteId));

    // If accepted, add user to team members
    if (response === "accepted") {
      const currentTeam = await db
        .select()
        .from(team)
        .where(eq(team.id, invite[0].teamId))
        .limit(1);

      if (currentTeam.length > 0) {
        const updatedMembers = [...currentTeam[0].teamMembers, userId];

        await db
          .update(team)
          .set({
            teamMembers: updatedMembers,
            updatedAt: new Date(),
          })
          .where(eq(team.id, invite[0].teamId));
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Error responding to team invite:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to respond to invite"
    );
  }
}

export async function getUserTeams(userId: string) {
  try {
    // Get teams where user is leader or member
    const userTeams = await db
      .select()
      .from(team)
      .where(
        or(
          eq(team.teamLeaderId, userId)
          // Note: This is a simple check. In production, you might want to use a proper array contains query
        )
      );

    // Filter teams where user is in teamMembers array
    const filteredTeams = userTeams.filter(
      (t) => t.teamLeaderId === userId || t.teamMembers.includes(userId)
    );

    return filteredTeams;
  } catch (error) {
    console.error("Error getting user teams:", error);
    return [];
  }
}

export async function getUserTeamsWithDetails(userId: string): Promise<TeamWithFullDetails[]> {
  try {
    // Get all teams with leader details, then filter in JavaScript
    // This is needed because checking array membership in SQL is complex
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
      .leftJoin(user, eq(team.teamLeaderId, user.id));

    // Filter teams where user is leader or member and teamLeader exists
    const filteredTeams = teams.filter(
      (t) =>
        t.teamLeader && // Ensure teamLeader is not null
        (t.teamLeaderId === userId || t.teamMembers.includes(userId))
    );

    // Fetch team members details for each team
    const teamsWithMembers = await Promise.all(
      filteredTeams.map(async (teamData) => {
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
              or(
                ...teamData.teamMembers.map((memberId) => eq(user.id, memberId))
              )
            );

          members = memberDetails;
        }


        return {
          id: teamData.id,
          name: teamData.name,
          status: teamData.status,
          teamLeaderId: teamData.teamLeaderId,
          teamMembers: teamData.teamMembers,
          createdAt: teamData.createdAt,
          updatedAt: teamData.updatedAt,
          teamLeader: teamData.teamLeader!,
          members,
          totalMembers: 1 + members.length, // Leader + members
        };
      })
    );

    return teamsWithMembers;
  } catch (error) {
    console.error("Error getting user teams with details:", error);
    return [];
  }
}
