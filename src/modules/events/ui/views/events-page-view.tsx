"use client";

import React from "react";
import { useEvents } from "@/modules/admin/server/events/hooks";
import EventsMenu from "../components/events-menu";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";
import Header from "@/components/shared/header";

export default function EventsPageView() {
  const { data: events, isLoading, error, refetch } = useEvents();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Failed to load events</h3>
          <p className="text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
        </div>
        <Button onClick={() => refetch()} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSwap isLoading={true}>Loading events...</LoadingSwap>
          <p className="text-muted-foreground">Fetching event data</p>
        </div>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No events found</h3>
          <p className="text-muted-foreground">
            There are currently no events available. Check back later!
          </p>
        </div>
      </div>
    );
  }

  // Transform events data to match EventsMenu format
  const menuItems = events.map((event) => ({
    link: `/events/${event.id}`,
    text: event.name,
    image: event.imageUrl || "/assets/fest.jpg", // fallback to existing image
  }));

  return (
    <div className="flex flex-col gap-6 w-full items-center" style={{ paddingTop: '8rem', minHeight: 'calc(100vh - 8rem)' }}>
      <Header
        title="Spectra Events"
        subtitle="Discover the latest events happening at Spectra."
      />
      <div className="h-[350px] w-[90%] md:w-[80%]">
        <EventsMenu items={menuItems} />
      </div>
    </div>
  );
}
