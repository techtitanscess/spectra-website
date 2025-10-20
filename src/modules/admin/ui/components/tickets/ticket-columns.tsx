"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { LoadingSwap } from "@/components/ui/loading-swap";

export type TicketWithDetails = {
  id: string;
  name: string;
  phoneNumber: string;
  status: "pending" | "approved";
  createdAt: Date;
  eventId: string;
  userId: string;
  eventName: string | null;
  ticketCreator: {
    id: string;
    name: string;
    email: string;
  } | null;
};

interface TicketColumnsProps {
  onApprove?: (ticketId: string) => void;
  onDelete?: (ticketId: string) => void;
  isApproving?: (ticketId: string) => boolean;
}

export const createTicketColumns = ({
  onApprove,
  onDelete,
  isApproving,
}: TicketColumnsProps = {}): ColumnDef<TicketWithDetails>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ticket Payee
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">{ticket.name}</span>
          <span className="text-sm text-muted-foreground">
            {ticket.phoneNumber}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "eventName",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Event
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const eventName = row.getValue("eventName") as string | null;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">{eventName || "Unknown Event"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketCreator",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ticket Holder
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const ticketCreator = row.getValue("ticketCreator") as {
        id: string;
        name: string;
        email: string;
      } | null;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">
            {ticketCreator?.name || "Unknown"}
          </span>
          {ticketCreator?.email && (
            <span className="text-sm text-muted-foreground">
              {ticketCreator.email}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">
            {format(createdAt, "MMM dd, yyyy")}
          </span>
          <span className="text-sm text-muted-foreground">
            {format(createdAt, "HH:mm")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as "pending" | "approved";
      return (
        <div className="flex justify-center">
          <Badge
            variant={status === "approved" ? "default" : "secondary"}
            className={
              status === "approved"
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            }
          >
            {status === "approved" ? "Approved" : "Pending"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;
      const isPending = ticket.status === "pending";
      const isApprovingTicket = isApproving ? isApproving(ticket.id) : false;

      return (
        <div className="flex justify-center space-x-2">
          {isPending && onApprove && (
            <Button
              size="sm"
              onClick={() => onApprove(ticket.id)}
              disabled={isApprovingTicket}
              variant="outline"
            >
              <LoadingSwap isLoading={isApprovingTicket}>
                <Check className="h-4 w-4" />
              </LoadingSwap>
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(ticket.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
