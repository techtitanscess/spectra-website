"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Users, Crown, User, Mail, Phone, Calendar, CheckCircle, Clock } from "lucide-react";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface TeamDetailsCardProps {
  team: {
    id: string;
    name: string;
    status: "pending" | "approved";
    teamLeaderId: string;
    teamMembers: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  teamLeader?: TeamMember | null;
  members?: TeamMember[];
}

export default function TeamDetailsCard({ team, teamLeader, members = [] }: TeamDetailsCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const totalMembers = 1 + members.length; // Leader + members

  return (
    <Terminal className="min-h-fit w-full">
      <TypingAnimation duration={20} className="text-muted-foreground">
        {"> Loading team data..."}
      </TypingAnimation>

      <TypingAnimation duration={20} className="text-primary">
        ✓ Team loaded successfully
      </TypingAnimation>

      <TypingAnimation duration={20} className="text-muted-foreground">
        {"> Displaying team information:"}
      </TypingAnimation>

      <AnimatedSpan className="my-4 space-y-4">
        {/* Team Header */}
        <div className="flex items-center justify-between border-b border-primary/30 pb-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold text-lg">{team.name}</span>
          </div>
          <Badge
            className={cn(
              "font-bold",
              team.status === "approved"
                ? "bg-green-500 text-black"
                : "bg-yellow-500 text-black"
            )}
          >
            {team.status === "approved" ? "✓ Approved" : "⏳ Pending"}
          </Badge>
        </div>

        {/* Team Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Created:</span>
              <span className="text-primary">
                {format(new Date(team.createdAt), "MMM dd, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Members:</span>
              <span className="text-primary font-bold">{totalMembers}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {team.status === "approved" ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-400" />
              )}
              <span className="text-muted-foreground">Status:</span>
              <span
                className={cn(
                  "font-bold capitalize",
                  team.status === "approved"
                    ? "text-green-400"
                    : "text-yellow-400"
                )}
              >
                {team.status}
              </span>
            </div>
          </div>
        </div>

        {/* Team Leader */}
        {teamLeader && (
          <div className="space-y-3 pt-4 border-t border-primary/30">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-primary font-bold">Team Leader</span>
            </div>

            <div className="pl-6 space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-yellow-500 text-black text-sm font-bold">
                    {getInitials(teamLeader.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-primary font-semibold">
                  {teamLeader.name}
                </span>
              </div>

              <div className="space-y-1 pl-11">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    Email:
                  </span>
                  <span className="text-xs  md:text-sm text-primary">
                    {teamLeader.email}
                  </span>
                </div>
                {teamLeader.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs md:text-sm text-muted-foreground">
                      Phone:
                    </span>
                    <span className="text-xs md:text-sm text-primary">
                      {teamLeader.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team Members */}
        <div className="space-y-3 pt-4 border-t border-primary/30">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold">
              Team Members ({members.length})
            </span>
          </div>

          {members.length > 0 ? (
            <div className="pl-6 space-y-3">
              {members.map((member, index) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-black text-sm font-bold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-primary font-semibold">
                      {member.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs border-primary text-primary"
                    >
                      #{index + 1}
                    </Badge>
                  </div>

                  <div className="pl-11 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs md:text-sm text-muted-foreground">
                        Email:
                      </span>
                      <span className="text-xs md:text-sm text-primary">
                        {member.email}
                      </span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs md:text-sm text-muted-foreground">
                          Phone:
                        </span>
                        <span className="text-xs md:text-sm text-primary">
                          {member.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pl-6 text-muted-foreground text-sm">
              No other team members yet
            </div>
          )}
        </div>
      </AnimatedSpan>
    </Terminal>
  );
}