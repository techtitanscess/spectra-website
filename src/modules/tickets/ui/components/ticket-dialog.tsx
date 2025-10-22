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
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useUserTicketForEvent } from "@/modules/admin/server/tickets/hooks";
import { Eye, Ticket } from "lucide-react";

export default function TicketDialog({ eventId }: { eventId: string }) {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const { data: existingTicket, isLoading } = useUserTicketForEvent(
    session?.user?.id || "",
    eventId
  );

  return (
    <AuthOnly 
      fallback={
        <Link href="/sign-in">
          <Button variant="outline" className="w-full mt-4">
            <Ticket className="mr-2 h-4 w-4" />
            Sign In to Get Tickets
          </Button>
        </Link>
      }
    >
      {existingTicket ? (
        <Link href="/profile?tab=tickets">
          <Button variant="outline" className="w-full mt-4">
            <Eye className="mr-2 h-4 w-4" />
            View Ticket
          </Button>
        </Link>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mt-4" disabled={isLoading}>
              <Ticket className="mr-2 h-4 w-4" />
              {isLoading ? "Checking..." : "Get Tickets"}
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
      )}
    </AuthOnly>
  );
}
