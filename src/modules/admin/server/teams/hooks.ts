"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTeams,
  getAllTeamsWithDetails,
  getTeamById,
  approveTeam,
  deleteTeam,
  AdminTeamWithDetails,
} from "@/modules/admin/server/teams/actions";
import { toast } from "sonner";

export const useAdminTeams = () => {
  return useQuery({
    queryKey: ["admin", "teams"],
    queryFn: async () => {
      const result = await getAllTeams();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useAdminTeamsWithDetails = () => {
  return useQuery({
    queryKey: ["admin", "teams", "details"],
    queryFn: async () => {
      const result = await getAllTeamsWithDetails();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useAdminTeam = (id: string) => {
  return useQuery({
    queryKey: ["admin", "team", id],
    queryFn: async () => {
      const result = await getTeamById(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!id,
  });
};

export const useApproveTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId: string) => {
      const result = await approveTeam(teamId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "teams"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "teams", "details"],
      });
      toast.success("Team approved successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve team");
    },
  });
};

export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (teamId: string) => {
      const result = await deleteTeam(teamId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "teams"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "teams", "details"],
      });
      toast.success("Team deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete team");
    },
  });
};
