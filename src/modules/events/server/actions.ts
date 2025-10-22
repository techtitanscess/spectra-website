"use server";

import { db } from "@/lib/db";
import { event } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export type HomeEvent = {
  link: string;
  text: string;
  image: string;
};

export async function getLatestEventsForHome(): Promise<HomeEvent[]> {
  try {
    // Get the latest 4 events ordered by creation date (newest first)
    const latestEvents = await db
      .select({
        id: event.id,
        name: event.name,
        imageUrl: event.imageUrl,
      })
      .from(event)
      .orderBy(desc(event.createdAt))
      .limit(4);

    // Transform database events to match the expected format for EventsMenu
    const transformedEvents: HomeEvent[] = latestEvents.map((evt) => ({
      link: `/events/${evt.id}`,
      text: evt.name,
      image: evt.imageUrl || "/assets/fest.jpg", // fallback image
    }));

    return transformedEvents;
  } catch (error) {
    console.error("Failed to get latest events for home:", error);
    // Return empty array as fallback
    return [];
  }
}
