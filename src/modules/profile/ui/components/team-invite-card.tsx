"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Check, X, Users, Clock, Mail } from "lucide-react";
import { useRespondToTeamInvite } from "@/modules/hackerwrath/server/teams/hooks";
import { toast } from "sonner";
import type { TeamInviteWithDetails } from "@/modules/hackerwrath/server/teams/actions";

interface TeamInviteCardProps {
  invite: TeamInviteWithDetails;
  userId: string;
}

export default function TeamInviteCard({
  invite,
  userId,
}: TeamInviteCardProps) {
  const respondMutation = useRespondToTeamInvite();

  const handleResponse = async (response: "accepted" | "declined") => {
    try {
      await respondMutation.mutateAsync({
        inviteId: invite.id,
        userId,
        response,
      });

      toast.success(
        response === "accepted"
          ? `You've joined ${invite.team.name}!`
          : `You've declined the invitation to ${invite.team.name}`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to respond to invitation"
      );
    }
  };

  const teamLeaderInitials = invite.team.teamLeader.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-4 w-4" />
              Team Invitation
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              Received{" "}
              {format(new Date(invite.createdAt), "MMM dd, yyyy 'at' h:mm a")}
            </div>
          </div>
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{invite.team.name}</h3>
            <p className="text-sm text-muted-foreground">
              You've been invited to join this team for Hackerwrath 2025
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {teamLeaderInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-sm">
                {invite.team.teamLeader.name}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {invite.team.teamLeader.email}
              </p>
              <Badge variant="secondary" className="text-xs mt-1">
                Team Leader
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={() => handleResponse("accepted")}
            disabled={respondMutation.isPending}
            className="flex-1"
            size="sm"
          >
            <Check className="mr-2 h-4 w-4" />
            Accept
          </Button>
          <Button
            onClick={() => handleResponse("declined")}
            disabled={respondMutation.isPending}
            variant="outline"
            className="flex-1"
            size="sm"
          >
            <X className="mr-2 h-4 w-4" />
            Decline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
