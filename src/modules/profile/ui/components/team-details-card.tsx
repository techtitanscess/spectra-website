"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Users, Crown, User, Mail, Phone, Calendar, CheckCircle, Clock } from "lucide-react";
import { codeFont } from "@/components/fonts";
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
    <Card className="bg-black border-primary border-2 relative overflow-hidden w-full">
      {/* Terminal Header */}
      <CardHeader className="bg-primary text-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <CardTitle className={cn(codeFont.className, "text-lg")}>
              Team Details
            </CardTitle>
          </div>
          <Badge 
            className={cn(
              "text-black font-bold",
              team.status === "approved" ? "bg-green-400" : "bg-yellow-400"
            )}
          >
            {team.status === "approved" ? "Approved" : "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className={cn(codeFont.className, "bg-black text-primary p-4 space-y-4")}>
        {/* Welcome Message */}
        <div className="space-y-1 text-sm">
          <div>
            <span className="text-gray-500">&gt;</span> <span className="text-primary">Welcome to your team dashboard</span>
          </div>
          <div className="text-gray-500">
            &gt; Here's your team information
          </div>
        </div>

        {/* Team Info */}
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2 text-lg font-bold">
            <Users className="h-5 w-5" />
            <span>&gt; Team: {team.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-primary/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">&gt; Created on:</span>
                <span className="text-primary">{format(new Date(team.createdAt), "MMM dd, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">&gt; Total members:</span>
                <span className="text-primary font-bold">{totalMembers}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                {team.status === "approved" ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Clock className="h-4 w-4 text-yellow-400" />
                )}
                <span className="text-gray-400">&gt; Status:</span>
                <span className={cn(
                  "font-bold capitalize",
                  team.status === "approved" ? "text-green-400" : "text-yellow-400"
                )}>
                  {team.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Leader */}
        {teamLeader && (
          <div className="space-y-3 pt-4 border-t border-primary/30">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="text-primary font-bold">&gt; Team Leader:</span>
            </div>
            
            <div className="pl-6 border-l-2 border-yellow-400/50 space-y-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-yellow-500 text-black text-sm font-bold">
                    {getInitials(teamLeader.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-primary font-semibold">{teamLeader.name}</span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-400">&gt; Email:</span>
                  <span className="text-primary">{teamLeader.email}</span>
                </div>
                {teamLeader.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400">&gt; Phone:</span>
                    <span className="text-primary">{teamLeader.phone}</span>
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
              &gt; Team Members ({members.length})
            </span>
          </div>

          {members.length > 0 ? (
            <div className="pl-6 border-l-2 border-primary/50 space-y-3">
              {members.map((member, index) => (
                <div key={member.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-black text-sm font-bold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-primary font-semibold">{member.name}</span>
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      #{index + 1}
                    </Badge>
                  </div>
                  
                  <div className="pl-11 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-gray-400" />
                      <span className="text-gray-400">&gt; Email:</span>
                      <span className="text-primary">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-400">&gt; Phone:</span>
                        <span className="text-primary">{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="pl-6 text-gray-500 text-sm">
              &gt; No other team members yet
            </div>
          )}
        </div>

        {/* Team Summary */}
        <div className="pt-4 border-t border-primary/30">
          <div className="bg-gray-900 rounded p-2 text-xs text-gray-400">
            Team ID: {team.id.slice(0, 8).toUpperCase()} | Created: {format(new Date(team.createdAt), "MMM dd, yyyy")} | {totalMembers} {totalMembers === 1 ? 'member' : 'members'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}