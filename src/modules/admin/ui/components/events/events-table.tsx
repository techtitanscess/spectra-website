"use client";

import { useState } from "react";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { createEventColumns, Event } from "./event-columns";
import { useEvents, useDeleteEvent } from "@/hooks/use-events";
import EditEventDialog from "./edit-event-dialog";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventsTableProps {
  onEditEvent?: (event: Event) => void;
}

export default function EventsTable({ onEditEvent }: EventsTableProps) {
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { data: events, isLoading, error, refetch, isRefetching } = useEvents();
  const deleteEventMutation = useDeleteEvent();

  const handleDeleteEvent = async () => {
    if (deleteEventId) {
      try {
        await deleteEventMutation.mutateAsync(deleteEventId);
        setDeleteEventId(null);
      } catch (error) {
        // Error is handled in the mutation
      }
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditEvent(event);
    setIsEditDialogOpen(true);
  };

  const columns = createEventColumns({
    onEdit: handleEditEvent,
    onDelete: (eventId: string) => setDeleteEventId(eventId),
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
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
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSwap isLoading={true}>Loading events...</LoadingSwap>
          <p className="text-muted-foreground">Fetching event data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      

      <EnhancedDataTable
        columns={columns}
        data={events || []}
        searchKey="name"
        searchPlaceholder="Search events by name..."
      />

      <Dialog
        open={!!deleteEventId}
        onOpenChange={() => setDeleteEventId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              event and remove all associated data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteEventId(null)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteEvent} variant="destructive">
              <LoadingSwap isLoading={deleteEventMutation.isPending}>
                Delete Event
              </LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <EditEventDialog
        event={editEvent}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
    </div>
  );
}
