"use server";

import { db } from "@/lib/db";
import { event } from "@/lib/db/schema";
import { eq, gte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type CreateEventData = {
  name: string;
  description: string;
  imageUrl?: string;
  whatsappUrl?: string;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  ticketCost: number; // in cents
  createdBy: string;
};

export type UpdateEventData = Partial<Omit<CreateEventData, "createdBy">> & {
  id: string;
};

export async function createEvent(data: CreateEventData) {
  try {
    const newEvent = await db
      .insert(event)
      .values({
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        whatsappUrl: data.whatsappUrl,
        startDate: data.startDate,
        endDate: data.endDate,
        totalHours: data.totalHours,
        ticketCost: data.ticketCost,
        createdBy: data.createdBy,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    revalidatePath("/admin/events");
    return { success: true, data: newEvent[0] };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event" };
  }
}

export async function getEventById(id: string) {
  try {
    const eventData = await db
      .select()
      .from(event)
      .where(eq(event.id, id))
      .limit(1);

    if (eventData.length === 0) {
      return { success: false, error: "Event not found" };
    }

    return { success: true, data: eventData[0] };
  } catch (error) {
    console.error("Failed to get event:", error);
    return { success: false, error: "Failed to get event" };
  }
}

export async function getAllEvents() {
  try {
    const events = await db.select().from(event).orderBy(event.startDate);
    return { success: true, data: events };
  } catch (error) {
    console.error("Failed to get events:", error);
    return { success: false, error: "Failed to get events" };
  }
}

export async function updateEvent(data: UpdateEventData) {
  try {
    const { id, ...updateData } = data;

    const updatedEvent = await db
      .update(event)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(event.id, id))
      .returning();

    if (updatedEvent.length === 0) {
      return { success: false, error: "Event not found" };
    }

    revalidatePath("/admin/events");
    revalidatePath(`/events/${id}`);
    return { success: true, data: updatedEvent[0] };
  } catch (error) {
    console.error("Failed to update event:", error);
    return { success: false, error: "Failed to update event" };
  }
}

export async function deleteEvent(id: string) {
  try {
    const deletedEvent = await db
      .delete(event)
      .where(eq(event.id, id))
      .returning();

    if (deletedEvent.length === 0) {
      return { success: false, error: "Event not found" };
    }

    revalidatePath("/admin/events");
    return { success: true, data: deletedEvent[0] };
  } catch (error) {
    console.error("Failed to delete event:", error);
    return { success: false, error: "Failed to delete event" };
  }
}

// Additional helper functions

export async function getEventsByUser(userId: string) {
  try {
    const userEvents = await db
      .select()
      .from(event)
      .where(eq(event.createdBy, userId))
      .orderBy(event.startDate);

    return { success: true, data: userEvents };
  } catch (error) {
    console.error("Failed to get user events:", error);
    return { success: false, error: "Failed to get user events" };
  }
}

export async function getUpcomingEvents() {
  try {
    const now = new Date();
    const upcomingEvents = await db
      .select()
      .from(event)
      .where(gte(event.startDate, now))
      .orderBy(event.startDate);

    return { success: true, data: upcomingEvents };
  } catch (error) {
    console.error("Failed to get upcoming events:", error);
    return { success: false, error: "Failed to get upcoming events" };
  }
}
