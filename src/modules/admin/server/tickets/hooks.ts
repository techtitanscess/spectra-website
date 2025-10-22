"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllTickets,
  getAllTicketsWithDetails,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketsByUser,
  getUserTicketsWithDetails,
  getTicketsByEvent,
  approveTicket,
  CreateTicketData,
  UpdateTicketData,
} from "@/modules/admin/server/tickets/actions";
import { toast } from "sonner";

export const useTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const result = await getAllTickets();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useTicketsWithDetails = () => {
  return useQuery({
    queryKey: ["tickets", "details"],
    queryFn: async () => {
      const result = await getAllTicketsWithDetails();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};

export const useTicket = (id: string) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const result = await getTicketById(id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!id,
  });
};

export const useUserTickets = (userId: string) => {
  return useQuery({
    queryKey: ["tickets", "user", userId],
    queryFn: async () => {
      const result = await getTicketsByUser(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!userId,
  });
};

export const useUserTicketsWithDetails = (userId: string) => {
  return useQuery({
    queryKey: ["tickets", "user", "details", userId],
    queryFn: async () => {
      const result = await getUserTicketsWithDetails(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!userId,
  });
};

export const useEventTickets = (eventId: string) => {
  return useQuery({
    queryKey: ["tickets", "event", eventId],
    queryFn: async () => {
      const result = await getTicketsByEvent(eventId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!eventId,
  });
};

export const useUserTicketForEvent = (userId: string, eventId: string) => {
  return useQuery({
    queryKey: ["tickets", "user", userId, "event", eventId],
    queryFn: async () => {
      const result = await getUserTicketsWithDetails(userId);
      if (!result.success) {
        throw new Error(result.error);
      }
      // Find ticket for the specific event
      const eventTicket = result.data?.find((ticket: any) => ticket.eventId === eventId);
      return eventTicket || null;
    },
    enabled: !!userId && !!eventId,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTicketData) => {
      const result = await createTicket(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({
        queryKey: ["tickets", "user", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tickets", "event", variables.eventId],
      });
      queryClient.invalidateQueries({
        queryKey: ["tickets", "user", variables.userId, "event", variables.eventId],
      });
      toast.success("Ticket requested successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to request ticket");
    },
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateTicketData) => {
      const result = await updateTicket(data);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      toast.success("Ticket updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update ticket");
    },
  });
};

export const useApproveTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketId: string) => {
      const result = await approveTicket(ticketId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", "details"] });
      toast.success("Ticket approved successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to approve ticket");
    },
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketId: string) => {
      const result = await deleteTicket(ticketId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets", "details"] });
      toast.success("Ticket deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete ticket");
    },
  });
};
