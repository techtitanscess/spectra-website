"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TicketForm from "./ticket-form";

export default function TicketDialog({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Get Tickets
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
          <DialogDescription>
            Please fill in the details for the new event.
          </DialogDescription>
        </DialogHeader>
        <TicketForm eventId={eventId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
