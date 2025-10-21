"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Users, Crown, User, Mail, Phone, Calendar, Hash } from "lucide-react";
import { AdminTeamWithDetails } from "@/modules/admin/server/teams/actions";

interface TeamDetailsDialogProps {
  team: AdminTeamWithDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TeamDetailsDialog({
  team,
  open,
  onOpenChange,
}: TeamDetailsDialogProps) {
  if (!team) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Users className="h-6 w-6" />
              {team.name}
            </DialogTitle>
            <Badge className={getStatusColor(team.status)} variant="outline">
              {team.status}
            </Badge>
          </div>
          <DialogDescription>
            Complete team details including all members' contact information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Team Info */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Created:</span>
              <span className="text-sm">
                {format(new Date(team.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Members:</span>
              <span className="text-sm font-semibold">{team.totalMembers}</span>
            </div>
          </div>

          {/* Team Leader */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Team Leader
            </h3>
            <div className="border rounded-lg p-4 bg-gradient-to-r">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-yellow-500 text-white text-lg font-semibold">
                    {getInitials(team.teamLeader.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-lg">
                    {team.teamLeader.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{team.teamLeader.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{team.teamLeader.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Team Members */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5" />
              Team Members{" "}
              {team.members.length > 0 && `(${team.members.length})`}
            </h3>

            {team.members.length > 0 ? (
              <div className="space-y-3">
                {team.members.map((member, index) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{member.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            Member {index + 1}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">No team members yet</p>
                <p className="text-xs">This team only has a leader</p>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2">Team Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                • Team has {team.totalMembers} total{" "}
                {team.totalMembers === 1 ? "member" : "members"}
              </p>
              <p>
                • Created on{" "}
                {format(new Date(team.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
              </p>
              <p>
                • Current status:{" "}
                <span className="font-medium capitalize">{team.status}</span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
