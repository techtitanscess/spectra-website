"use client";

import { Button } from "@/components/ui/button";
import PageHeader from "@/modules/admin/ui/components/page-header";
import React from "react";
import EventDialog from "../../components/events/event-dialog";
import EventsTable from "../../components/events/events-table";

export default function EventsPageView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <PageHeader
          header="Events"
          desc="Create, update & track all events happening across the platform."
        />
        <EventDialog />
      </div>

      <EventsTable />
    </div>
  );
}
