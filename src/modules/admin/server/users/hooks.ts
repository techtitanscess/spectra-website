"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllUsers,
  getAllUsersWithDetails,
  getUserById,
  makeUserAdmin,
  removeAdminRole,
  deleteUser,
  UserWithDetails,
} from "@/modules/admin/server/users/actions";
import { toast } from "sonner";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const result = await getAllUsers();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useAdminUsersWithDetails = () => {
  return useQuery({
    queryKey: ["admin", "users", "details"],
    queryFn: async () => {
      const result = await getAllUsersWithDetails();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useAdminUser = (id: string) => {
  return useQuery({
    queryKey: ["admin", "user", id],
    queryFn: async () => {
      const result = await getUserById(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!id,
  });
};

export const useMakeUserAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const result = await makeUserAdmin(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "users", "details"],
      });
      toast.success("User promoted to admin successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to make user admin");
    },
  });
};

export const useRemoveAdminRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const result = await removeAdminRole(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "users", "details"],
      });
      toast.success("Admin role removed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to remove admin role");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const result = await deleteUser(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "users", "details"],
      });
      toast.success("User deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
};
