"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Users, Crown, User, Calendar } from "lucide-react";
import type { TeamWithDetails } from "@/modules/hackerwrath/server/teams/actions";

interface TeamCardProps {
  team: any; // We'll type this properly when we have the full team data
}

export default function TeamCard({ team }: TeamCardProps) {
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {team.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Created {format(new Date(team.createdAt), "MMM dd, yyyy")}
            </div>
          </div>
          <Badge className={getStatusColor(team.status)} variant="outline">
            {team.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Team Leader */}
          {team.teamLeader && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {team.teamLeader.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{team.teamLeader.name}</p>
                <p className="text-xs text-muted-foreground">
                  {team.teamLeader.email}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                <Crown className="h-3 w-3 mr-1" />
                Leader
              </Badge>
            </div>
          )}

          {/* Team Members */}
          {team.members && team.members.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <User className="h-3 w-3" />
                Team Members ({team.members.length})
              </h4>
              {team.members.map((member: any) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      {member.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {team.members && team.members.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No members yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
