"use client";

import { useState } from "react";
import { EnhancedDataTable } from "@/components/ui/enhanced-data-table";
import { createTicketColumns, TicketWithDetails } from "./ticket-columns";
import {
  useTicketsWithDetails,
  useApproveTicket,
  useDeleteTicket,
} from "@/modules/admin/server/tickets/hooks";
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

export default function TicketTable() {
  const [deleteTicketId, setDeleteTicketId] = useState<string | null>(null);

  const {
    data: tickets,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useTicketsWithDetails();
  const approveTicketMutation = useApproveTicket();
  const deleteTicketMutation = useDeleteTicket();

  const handleApproveTicket = async (ticketId: string) => {
    try {
      await approveTicketMutation.mutateAsync(ticketId);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleDeleteTicket = async () => {
    if (deleteTicketId) {
      try {
        await deleteTicketMutation.mutateAsync(deleteTicketId);
        setDeleteTicketId(null);
      } catch (error) {
        // Error is handled in the mutation
      }
    }
  };

  const columns = createTicketColumns({
    onApprove: handleApproveTicket,
    onDelete: (ticketId: string) => setDeleteTicketId(ticketId),
    isApproving: (ticketId: string) =>
      approveTicketMutation.isPending &&
      approveTicketMutation.variables === ticketId,
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <div className="text-center">
          <h3 className="text-lg font-semibold">Failed to load tickets</h3>
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
          <LoadingSwap isLoading={true}>Loading tickets...</LoadingSwap>
          <p className="text-muted-foreground">Fetching ticket data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <EnhancedDataTable
        columns={columns}
        data={tickets || []}
        searchKey="ticketCreator"
        searchPlaceholder="Search tickets by payee..."
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTicketId}
        onOpenChange={() => setDeleteTicketId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              ticket and remove all associated data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteTicketId(null)}>
              Cancel
            </Button>
            <Button onClick={handleDeleteTicket} variant="destructive">
              <LoadingSwap isLoading={deleteTicketMutation.isPending}>
                Delete Ticket
              </LoadingSwap>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
