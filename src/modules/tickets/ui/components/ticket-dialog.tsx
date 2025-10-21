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
import AuthOnly from "@/components/auth/auth-only";

export default function TicketDialog({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <AuthOnly 
      fallback={
        <Button variant="outline" className="w-full mt-4 opacity-50 cursor-not-allowed" disabled>
          Sign In to Get Tickets
        </Button>
      }
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            Get Tickets
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Event Ticket</DialogTitle>
            <DialogDescription>
              Please fill in your details to request a ticket for this event.
            </DialogDescription>
          </DialogHeader>
          <TicketForm eventId={eventId} onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </AuthOnly>
  );
}
