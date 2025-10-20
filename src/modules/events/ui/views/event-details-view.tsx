"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useEvent } from "@/modules/admin/server/events/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, DollarSign, User, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import TicketDialog from "@/modules/tickets/ui/components/ticket-dialog";

export default function EventDetailsView() {
  const params = useParams();
  const eventId = params.id as string;
  const { data: event, isLoading, error } = useEvent(eventId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-64 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load event details: {error.message}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Event Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The event you're looking for could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(cents);
  };

  const getEventStatus = () => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    if (now < startDate) {
      return {
        status: "upcoming",
        label: "Upcoming",
        variant: "default" as const,
      };
    } else if (now >= startDate && now <= endDate) {
      return {
        status: "ongoing",
        label: "Live Now",
        variant: "destructive" as const,
      };
    } else {
      return {
        status: "past",
        label: "Completed",
        variant: "secondary" as const,
      };
    }
  };

  return (
    <div className="flex flex-col pt-26 items-center justify-center">
      <div className="flex flex-col gap-8 w-[70%]">
        <Header
          title={event.name}
          subtitle={`on ${formatDate(event.startDate)}`}
        />
        {event.imageUrl && (
          <div className="aspect-video  overflow-hidden rounded-lg">
            <img
              src={event.imageUrl}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="border-b-primary border-b-2">
            <CardHeader>
              <CardTitle className="text-2xl">Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-justify text-muted-foreground">
                {event.description}
              </p>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b-primary border-b-1 py-2">
                <span className="font-semibold text-xl">Event Duration</span>
                <span className="text-muted-foreground">
                  {event.totalHours} hours
                </span>
              </div>
              <div className="flex items-center justify-between border-b-primary border-b-1 py-2">
                <span className="font-semibold text-xl">Starts On</span>
                <span className="text-muted-foreground ">
                  {formatDate(event.startDate)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b-primary border-b-1 py-2">
                <span className="font-semibold text-xl">Ends On</span>
                <span className="text-muted-foreground ">
                  {formatDate(event.endDate)}
                </span>
              </div>
              <div className="flex items-center justify-between border-b-primary border-b-1 py-2">
                <span className="font-semibold text-xl">Ticket Price</span>
                <span className="text-muted-foreground ">
                  {formatPrice(event.ticketCost)}
                </span>
              </div>
            </div>
            <TicketDialog eventId={event.id} />
          </div>
        </div>
      </div>
      <div className="py-10" />
    </div>
  );
}
