import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/modules/admin/ui/components/app-sidebar";
import { SiteHeader } from "@/modules/admin/ui/components/site-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SiteHeader />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
