"use client";

import { useState } from "react";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { createUserColumns } from "./user-columns";
import {
  useAdminUsersWithDetails,
  useMakeUserAdmin,
  useRemoveAdminRole,
  useDeleteUser,
} from "@/modules/admin/server/users/hooks";
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
import UserDetailsDialog from "./user-details-dialog";
import { UserWithDetails } from "@/modules/admin/server/users/actions";

export default function UsersTable() {
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(
    null
  );

  const {
    data: users,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useAdminUsersWithDetails();
  const makeAdminMutation = useMakeUserAdmin();
  const removeAdminMutation = useRemoveAdminRole();
  const deleteUserMutation = useDeleteUser();

  const handleMakeAdmin = async (userId: string) => {
    try {
      await makeAdminMutation.mutateAsync(userId);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    try {
      await removeAdminMutation.mutateAsync(userId);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleDeleteUser = async () => {
    if (deleteUserId) {
      try {
        await deleteUserMutation.mutateAsync(deleteUserId);
        setDeleteUserId(null);
      } catch (error) {
        // Error is handled in the mutation
      }
    }
  };

  const handleViewDetails = (user: UserWithDetails) => {
    setSelectedUser(user);
  };

  const columns = createUserColumns({
    onMakeAdmin: handleMakeAdmin,
    onRemoveAdmin: handleRemoveAdmin,
    onDelete: (userId: string) => setDeleteUserId(userId),
    onViewDetails: handleViewDetails,
    isMakingAdmin: (userId: string) =>
      makeAdminMutation.isPending && makeAdminMutation.variables === userId,
    isRemovingAdmin: (userId: string) =>
      removeAdminMutation.isPending && removeAdminMutation.variables === userId,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Failed to load users</h3>
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
          <LoadingSwap isLoading={true}>Loading users...</LoadingSwap>
          <p className="text-muted-foreground">Fetching user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <EnhancedDataTable
        columns={columns}
        data={users || []}
        searchKey="name"
        searchPlaceholder="Search users by name or email..."
      />

      {/* User Details Dialog */}
      <UserDetailsDialog
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteUserId} onOpenChange={() => setDeleteUserId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove all associated data including tickets,
              teams, and other records from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteUserId(null)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteUser} variant="destructive">
              <LoadingSwap isLoading={deleteUserMutation.isPending}>
                Delete User
              </LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
