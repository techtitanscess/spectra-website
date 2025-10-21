"use client";

import TicketTable from "@/modules/admin/ui/components/tickets/ticket-table";
import PageHeader from "@/modules/admin/ui/components/page-header";

export default function TicketsPageView() {
  return (
    <div className="space-y-6">
      <PageHeader
        header="Tickets"
        desc="Approve, manage & track all support tickets submitted by users."
      />
      <TicketTable />
    </div>
  );
}
