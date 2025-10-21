"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, Trash2, Eye, Users, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { AdminTeamWithDetails } from "@/modules/admin/server/teams/actions";

interface TeamColumnsProps {
  onApprove?: (teamId: string) => void;
  onDelete?: (teamId: string) => void;
  onViewDetails?: (team: AdminTeamWithDetails) => void;
  isApproving?: (teamId: string) => boolean;
}

export const createTeamColumns = ({
  onApprove,
  onDelete,
  onViewDetails,
  isApproving,
}: TeamColumnsProps = {}): ColumnDef<AdminTeamWithDetails>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Team Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const team = row.original;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {team.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {team.totalMembers} {team.totalMembers === 1 ? "member" : "members"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "teamLeader",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Team Leader
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const teamLeader = row.original.teamLeader;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium flex items-center gap-2">
            <Crown className="h-4 w-4 text-yellow-500" />
            {teamLeader?.name || "Unknown"}
          </span>
          {teamLeader?.phone && (
            <span className="text-sm text-muted-foreground">
              {teamLeader.phone}
            </span>
          )}
          {teamLeader?.email && (
            <span className="text-xs text-muted-foreground">
              {teamLeader.email}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalMembers",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Members
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const team = row.original;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium text-2xl">{team.totalMembers}</span>
          <span className="text-xs text-muted-foreground">
            {team.members.length} member{team.members.length !== 1 ? "s" : ""} +
            1 leader
          </span>
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
      const team = row.original;
      const isPending = team.status === "pending";
      const isApprovingTeam = isApproving ? isApproving(team.id) : false;

      return (
        <div className="flex justify-center space-x-2">
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(team)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {isPending && onApprove && (
            <Button
              size="sm"
              onClick={() => onApprove(team.id)}
              disabled={isApprovingTeam}
              variant="outline"
            >
              <LoadingSwap isLoading={isApprovingTeam}>
                <Check className="h-4 w-4" />
              </LoadingSwap>
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(team.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
