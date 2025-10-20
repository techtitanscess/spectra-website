"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export type Event = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  startDate: Date;
  endDate: Date;
  totalHours: number;
  ticketCost: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
};

interface EventColumnsProps {
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
}

export const createEventColumns = ({
  onEdit,
  onDelete,
}: EventColumnsProps = {}): ColumnDef<Event>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Event Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">{event.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const startDate = new Date(row.getValue("startDate"));
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">
            {format(startDate, "MMM dd, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const endDate = new Date(row.getValue("endDate"));
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">{format(endDate, "MMM dd, yyyy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "ticketCost",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ticket Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const cost = row.getValue("ticketCost") as number;
      return (
        <div className="font-medium text-center flex justify-center">
          {cost === 0 ? (
            <Badge variant="outline" className="text-primary">
              Free
            </Badge>
          ) : (
            `₹${cost.toLocaleString()}`
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalHours",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const hours = row.getValue("totalHours") as number;
      return (
        <div className="flex justify-center">
          <Badge variant="outline" className="text-primary">
            {hours} hour{hours !== 1 ? "s" : ""}
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
      const event = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(event.id)}
              >
                Copy event ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(event)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit event
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem
                  onClick={() => onDelete(event.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete event
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
