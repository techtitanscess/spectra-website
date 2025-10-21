"use client";

import TeamsTable from "@/modules/admin/ui/components/teams/teams-table";
import PageHeader from "@/modules/admin/ui/components/page-header";

export default function TeamsPageView() {
  return (
    <div className="space-y-6">
      <PageHeader
        header="Teams"
        desc="Approve, manage & track all Hackerwrath teams and their members."
      />
      <TeamsTable />
    </div>
  );
}
