"use server";

import { db } from "@/lib/db";
import { ticket } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateTicketData = {
  name: string;
  phoneNumber: string;
  eventId: string;
  userId: string;
};

export type UpdateTicketData = {
  id: string;
  name?: string;
  phoneNumber?: string;
  status?: "pending" | "approved";
};

export async function createTicket(data: CreateTicketData) {
  try {
    const newTicket = await db
      .insert(ticket)
      .values({
        id: crypto.randomUUID(),
        name: data.name,
        phoneNumber: data.phoneNumber,
        eventId: data.eventId,
        userId: data.userId,
        status: "pending",
        createdAt: new Date(),
      })
      .returning();

    revalidatePath("/admin/tickets");
    return { success: true, data: newTicket[0] };
  } catch (error) {
    console.error("Failed to create ticket:", error);
    return { success: false, error: "Failed to create ticket" };
  }
}

export async function getTicketById(id: string) {
  try {
    const ticketData = await db
      .select()
      .from(ticket)
      .where(eq(ticket.id, id))
      .limit(1);

    if (ticketData.length === 0) {
      return { success: false, error: "Ticket not found" };
    }

    return { success: true, data: ticketData[0] };
  } catch (error) {
    console.error("Failed to get ticket:", error);
    return { success: false, error: "Failed to get ticket" };
  }
}

export async function getAllTickets() {
  try {
    const tickets = await db.select().from(ticket).orderBy(ticket.createdAt);
    return { success: true, data: tickets };
  } catch (error) {
    console.error("Failed to get tickets:", error);
    return { success: false, error: "Failed to get tickets" };
  }
}

export async function getAllTicketsWithDetails() {
  try {
    const { ticket, event, user } = await import("@/lib/db/schema");
    const { alias } = await import("drizzle-orm/pg-core");
    const { desc } = await import("drizzle-orm");

    // Create aliases for different user references
    const ticketCreator = alias(user, "ticketCreator");

    const tickets = await db
      .select({
        id: ticket.id,
        name: ticket.name,
        phoneNumber: ticket.phoneNumber,
        status: ticket.status,
        createdAt: ticket.createdAt,
        eventId: ticket.eventId,
        userId: ticket.userId,
        eventName: event.name,
        ticketCreator: {
          id: ticketCreator.id,
          name: ticketCreator.name,
          email: ticketCreator.email,
        },
      })
      .from(ticket)
      .leftJoin(event, eq(ticket.eventId, event.id))
      .leftJoin(ticketCreator, eq(ticket.userId, ticketCreator.id))
      .orderBy(desc(ticket.createdAt));

    return { success: true, data: tickets };
  } catch (error) {
    console.error("Failed to get tickets with details:", error);
    return { success: false, error: "Failed to get tickets with details" };
  }
}
export async function updateTicket(data: UpdateTicketData) {
  try {
    const { id, ...updateData } = data;

    const updatedTicket = await db
      .update(ticket)
      .set({
        ...updateData,
      })
      .where(eq(ticket.id, id))
      .returning();

    if (updatedTicket.length === 0) {
      return { success: false, error: "Ticket not found" };
    }

    revalidatePath("/admin/tickets");
    return { success: true, data: updatedTicket[0] };
  } catch (error) {
    console.error("Failed to update ticket:", error);
    return { success: false, error: "Failed to update ticket" };
  }
}

export async function deleteTicket(id: string) {
  try {
    const deletedTicket = await db
      .delete(ticket)
      .where(eq(ticket.id, id))
      .returning();

    if (deletedTicket.length === 0) {
      return { success: false, error: "Ticket not found" };
    }

    revalidatePath("/admin/tickets");
    return { success: true, data: deletedTicket[0] };
  } catch (error) {
    console.error("Failed to delete ticket:", error);
    return { success: false, error: "Failed to delete ticket" };
  }
}

// Additional helper functions

export async function getTicketsByUser(userId: string) {
  try {
    const userTickets = await db
      .select()
      .from(ticket)
      .where(eq(ticket.userId, userId))
      .orderBy(ticket.createdAt);

    return { success: true, data: userTickets };
  } catch (error) {
    console.error("Failed to get user tickets:", error);
    return { success: false, error: "Failed to get user tickets" };
  }
}

export async function getUserTicketsWithDetails(userId: string) {
  try {
    const { ticket, event } = await import("@/lib/db/schema");
    const { desc } = await import("drizzle-orm");

    const userTickets = await db
      .select({
        id: ticket.id,
        name: ticket.name,
        phoneNumber: ticket.phoneNumber,
        status: ticket.status,
        createdAt: ticket.createdAt,
        eventId: ticket.eventId,
        userId: ticket.userId,
        event: {
          id: event.id,
          name: event.name,
          description: event.description,
          imageUrl: event.imageUrl,
          startDate: event.startDate,
          endDate: event.endDate,
          ticketCost: event.ticketCost,
          totalHours: event.totalHours,
        },
      })
      .from(ticket)
      .leftJoin(event, eq(ticket.eventId, event.id))
      .where(eq(ticket.userId, userId))
      .orderBy(desc(ticket.createdAt));

    return { success: true, data: userTickets };
  } catch (error) {
    console.error("Failed to get user tickets with details:", error);
    return { success: false, error: "Failed to get user tickets with details" };
  }
}

export async function getTicketsByEvent(eventId: string) {
  try {
    const eventTickets = await db
      .select()
      .from(ticket)
      .where(eq(ticket.eventId, eventId))
      .orderBy(ticket.createdAt);

    return { success: true, data: eventTickets };
  } catch (error) {
    console.error("Failed to get event tickets:", error);
    return { success: false, error: "Failed to get event tickets" };
  }
}

export async function approveTicket(id: string) {
  try {
    const updatedTicket = await db
      .update(ticket)
      .set({ status: "approved" })
      .where(eq(ticket.id, id))
      .returning();

    if (updatedTicket.length === 0) {
      return { success: false, error: "Ticket not found" };
    }

    revalidatePath("/admin/tickets");
    return { success: true, data: updatedTicket[0] };
  } catch (error) {
    console.error("Failed to approve ticket:", error);
    return { success: false, error: "Failed to approve ticket" };
  }
}
