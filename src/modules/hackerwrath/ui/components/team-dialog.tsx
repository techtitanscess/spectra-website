"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TeamForm from "./team-form";
import { Users, Plus, Eye } from "lucide-react";
import AuthOnly from "@/components/auth/auth-only";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useUserHasTeam } from "@/modules/hackerwrath/server/teams/hooks";

interface TeamDialogProps {
  children?: React.ReactNode;
  triggerClassName?: string;
}

export default function TeamDialog({
  children,
  triggerClassName,
}: TeamDialogProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const { data: userTeam, isLoading } = useUserHasTeam(session?.user?.id || "");

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <AuthOnly 
      fallback={
        <Link href="/sign-in">
          <Button
            size="lg"
            className={`rounded-full px-8 py-6 text-base sm:text-lg tracking-tight font-semibold ${triggerClassName || ""}`}
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Team
          </Button>
        </Link>
      }
    >
      {userTeam ? (
        <Link href="/profile?tab=teams">
          <Button
            size="lg"
            className={`rounded-full px-8 py-6 text-base sm:text-lg tracking-tight font-semibold ${triggerClassName || ""}`}
          >
            <Eye className="mr-2 h-5 w-5" />
            View Team
          </Button>
        </Link>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {children || (
              <Button
                size="lg"
                className={`rounded-full px-8 py-6 text-base sm:text-lg tracking-tight font-semibold ${triggerClassName || ""}`}
                disabled={isLoading}
              >
                <Plus className="mr-2 h-5 w-5" />
                {isLoading ? "Checking..." : "Create Team"}
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6" />
                Create Your Hackerwrath Team
              </DialogTitle>
              <DialogDescription className="text-base">
                Assemble your dream team for Hackerwrath 2025! You can invite up to
                3 team members. They will receive an invitation that they can accept
                or decline.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-6">
              <TeamForm onSuccess={handleSuccess} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AuthOnly>
  );
}
