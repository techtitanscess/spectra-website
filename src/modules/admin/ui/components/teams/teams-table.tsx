"use client";

import { useState } from "react";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { createTeamColumns } from "./team-columns";
import {
  useAdminTeamsWithDetails,
  useApproveTeam,
  useDeleteTeam,
} from "@/modules/admin/server/teams/hooks";
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
import TeamDetailsDialog from "./team-details-dialog";
import { AdminTeamWithDetails } from "@/modules/admin/server/teams/actions";

export default function TeamsTable() {
  const [deleteTeamId, setDeleteTeamId] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<AdminTeamWithDetails | null>(
    null
  );

  const {
    data: teams,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useAdminTeamsWithDetails();
  const approveTeamMutation = useApproveTeam();
  const deleteTeamMutation = useDeleteTeam();

  const handleApproveTeam = async (teamId: string) => {
    try {
      await approveTeamMutation.mutateAsync(teamId);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleDeleteTeam = async () => {
    if (deleteTeamId) {
      try {
        await deleteTeamMutation.mutateAsync(deleteTeamId);
        setDeleteTeamId(null);
      } catch (error) {
        // Error is handled in the mutation
      }
    }
  };

  const handleViewDetails = (team: AdminTeamWithDetails) => {
    setSelectedTeam(team);
  };

  const columns = createTeamColumns({
    onApprove: handleApproveTeam,
    onDelete: (teamId: string) => setDeleteTeamId(teamId),
    onViewDetails: handleViewDetails,
    isApproving: (teamId: string) =>
      approveTeamMutation.isPending && approveTeamMutation.variables === teamId,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Failed to load teams</h3>
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
          <LoadingSwap isLoading={true}>Loading teams...</LoadingSwap>
          <p className="text-muted-foreground">Fetching team data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <EnhancedDataTable
        columns={columns}
        data={teams || []}
        searchKey="name"
        searchPlaceholder="Search teams by name..."
      />

      {/* Team Details Dialog */}
      <TeamDetailsDialog
        team={selectedTeam}
        open={!!selectedTeam}
        onOpenChange={(open) => !open && setSelectedTeam(null)}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteTeamId} onOpenChange={() => setDeleteTeamId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              team and remove all associated data from our servers. All team
              members will lose their team membership.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteTeamId(null)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteTeam} variant="destructive">
              <LoadingSwap isLoading={deleteTeamMutation.isPending}>
                Delete Team
              </LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
