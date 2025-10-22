"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Shield,
  ShieldOff,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { UserWithDetails } from "@/modules/admin/server/users/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserColumnsProps {
  onMakeAdmin?: (userId: string) => void;
  onRemoveAdmin?: (userId: string) => void;
  onDelete?: (userId: string) => void;
  onViewDetails?: (user: UserWithDetails) => void;
  isMakingAdmin?: (userId: string) => boolean;
  isRemovingAdmin?: (userId: string) => boolean;
}

export const createUserColumns = ({
  onMakeAdmin,
  onRemoveAdmin,
  onDelete,
  onViewDetails,
  isMakingAdmin,
  isRemovingAdmin,
}: UserColumnsProps = {}): ColumnDef<UserWithDetails>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-1">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-medium">{user.name}</span>
              {user.isAdmin && (
                <Shield className="inline-block ml-1 h-4 w-4 text-blue-500" />
              )}
            </div>
          </div>
          <span className="text-sm text-muted-foreground">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex flex-col items-center text-center">
          <span className="font-medium">{user.phone}</span>
          <span className="text-sm text-muted-foreground">{user.dept}</span>
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
            Joined Date
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
    accessorKey: "isAdmin",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isAdmin = row.getValue("isAdmin") as boolean;
      return (
        <div className="flex justify-center">
          <Badge
            variant={isAdmin ? "default" : "secondary"}
            className={
              isAdmin
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }
          >
            {isAdmin ? "Admin" : "User"}
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
      const user = row.original;
      const isUserAdmin = user.isAdmin;
      const isMakingAdminUser = isMakingAdmin ? isMakingAdmin(user.id) : false;
      const isRemovingAdminUser = isRemovingAdmin
        ? isRemovingAdmin(user.id)
        : false;

      return (
        <div className="flex justify-center space-x-2">
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(user)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          {!isUserAdmin && onMakeAdmin && (
            <Button
              size="sm"
              onClick={() => onMakeAdmin(user.id)}
              disabled={isMakingAdminUser}
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <LoadingSwap isLoading={isMakingAdminUser}>
                <Shield className="h-4 w-4" />
              </LoadingSwap>
            </Button>
          )}
          {isUserAdmin && onRemoveAdmin && (
            <Button
              size="sm"
              onClick={() => onRemoveAdmin(user.id)}
              disabled={isRemovingAdminUser}
              variant="outline"
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <LoadingSwap isLoading={isRemovingAdminUser}>
                <ShieldOff className="h-4 w-4" />
              </LoadingSwap>
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(user.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
