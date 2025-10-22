import { Suspense } from "react";
import ProfilePageView from "@/modules/profile/ui/views/profile-page-view";

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-muted rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            </div>
          </div>
          <div className="h-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    }>
      <ProfilePageView />
    </Suspense>
  );
}
