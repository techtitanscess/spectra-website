"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Event } from "./event-columns";
import EditEventForm from "./edit-event-form";

interface EditEventDialogProps {
  event: Event | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditEventDialog({
  event,
  open,
  onOpenChange,
}: EditEventDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
        </DialogHeader>
        {event && (
          <EditEventForm
            event={event}
            onSuccess={handleClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}