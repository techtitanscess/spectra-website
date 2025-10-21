"use client";

import UsersTable from "@/modules/admin/ui/components/users/users-table";
import PageHeader from "@/modules/admin/ui/components/page-header";

export default function UsersPageView() {
  return (
    <div className="space-y-6">
      <PageHeader
        header="Users"
        desc="Manage user accounts, assign admin roles, and monitor user activities."
      />
      <UsersTable />
    </div>
  );
}
