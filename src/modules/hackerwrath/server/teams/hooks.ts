"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTeam,
  searchUsersByEmail,
  getUserTeamInvites,
  respondToTeamInvite,
  getUserTeams,
  getUserTeamsWithDetails,
  type CreateTeamData,
  type TeamInviteWithDetails,
} from "./actions";

export function useCreateTeam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
    },
  });
}

export function useSearchUsers(query: string, enabled = true) {
  return useQuery({
    queryKey: ["search-users", query],
    queryFn: () => searchUsersByEmail(query),
    enabled: enabled && query.length >= 2,
    staleTime: 30000, // 30 seconds
  });
}

export function useUserTeamInvites(userId: string) {
  return useQuery({
    queryKey: ["team-invites", userId],
    queryFn: () => getUserTeamInvites(userId),
    enabled: !!userId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useRespondToTeamInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      inviteId,
      userId,
      response,
    }: {
      inviteId: string;
      userId: string;
      response: "accepted" | "declined";
    }) => respondToTeamInvite(inviteId, userId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-invites"] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useUserTeams(userId: string) {
  return useQuery({
    queryKey: ["teams", userId],
    queryFn: () => getUserTeams(userId),
    enabled: !!userId,
  });
}

export function useUserTeamsWithDetails(userId: string) {
  return useQuery({
    queryKey: ["teams-with-details", userId],
    queryFn: () => getUserTeamsWithDetails(userId),
    enabled: !!userId,
  });
}
