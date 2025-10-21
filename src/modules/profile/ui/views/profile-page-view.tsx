"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Ticket,
  AlertCircle,
  Users,
  Inbox,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { codeFont } from "@/components/fonts";
import { cn } from "@/lib/utils";
import { useUserTicketsWithDetails } from "@/modules/admin/server/tickets/hooks";
import { useUserTeamInvites, useUserTeamsWithDetails } from "@/modules/hackerwrath/server/teams/hooks";
import TicketCard from "@/modules/profile/ui/components/ticket-card";
import TeamInviteCard from "@/modules/profile/ui/components/team-invite-card";
import TeamDetailsCard from "@/modules/profile/ui/components/team-details-card";

export default function ProfilePageView() {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const {
    data: userTickets,
    isLoading: ticketsLoading,
    error: ticketsError,
  } = useUserTicketsWithDetails(session?.user?.id || "");

  const {
    data: teamInvites = [],
    isLoading: invitesLoading,
    error: invitesError,
  } = useUserTeamInvites(session?.user?.id || "");

  const {
    data: userTeams = [],
    isLoading: teamsLoading,
    error: teamsError,
  } = useUserTeamsWithDetails(session?.user?.id || "");

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold">Not Signed In</h1>
          <p className="text-muted-foreground">
            Please sign in to view your profile.
          </p>
          <Button asChild>
            <a href="/sign-in">Sign In</a>
          </Button>
        </div>
      </div>
    );
  }

  const { user } = session;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center pt-26 w-full">
      <div className="w-[90%] md:w-[70%] flex flex-col gap-6">
        {/* Profile Header */}
        <div className="border border-b-2 border-b-primary p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-lg text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" onClick={() => authClient.signOut()}>
              Sign Out
            </Button>
          </div>
        </div>

        {/* Team Invites Section */}
        {teamInvites.length > 0 && (
          <>
            <div className="flex flex-col items-center justify-center gap-4">
              <span
                className={cn(
                  codeFont.className,
                  "text-primary text-4xl font-semibold tracking-tight italic"
                )}
              >
                Team Invites
              </span>
            </div>

            {/* Team Invites Grid */}
            {invitesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(2)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full rounded-xl" />
                ))}
              </div>
            ) : invitesError ? (
              <Card className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Failed to load team invites
                    </h3>
                    <p className="text-muted-foreground">
                      There was an error loading your team invites. Please try
                      again later.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamInvites.map((invite) => (
                  <TeamInviteCard
                    key={invite.id}
                    invite={invite}
                    userId={session?.user?.id || ""}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* My Teams Section */}
        {userTeams.length > 0 && (
          <>
            <div className="flex flex-col items-center justify-center gap-4">
              <span
                className={cn(
                  codeFont.className,
                  "text-primary text-4xl font-semibold tracking-tight italic"
                )}
              >
                My Teams
              </span>
            </div>

            {/* Teams Grid */}
            {teamsLoading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(1)].map((_, i) => (
                  <Skeleton key={i} className="h-96 w-full rounded-xl" />
                ))}
              </div>
            ) : teamsError ? (
              <Card className="p-8">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Failed to load teams
                    </h3>
                    <p className="text-muted-foreground">
                      There was an error loading your teams. Please try again later.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {userTeams.map((team: any) => (
                  <TeamDetailsCard
                    key={team.id}
                    team={team}
                    teamLeader={team.teamLeader}
                    members={team.members}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* My Tickets Section */}
        <div className="flex flex-col items-center justify-center gap-4">
          <span
            className={cn(
              codeFont.className,
              "text-primary text-4xl font-semibold tracking-tight italic"
            )}
          >
            My Tickets
          </span>
        </div>

        {/* Tickets Grid */}
        {ticketsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        ) : ticketsError ? (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold">
                  Failed to load tickets
                </h3>
                <p className="text-muted-foreground">
                  There was an error loading your tickets. Please try again
                  later.
                </p>
              </div>
            </div>
          </Card>
        ) : userTickets && userTickets.length > 0 ? (
          <>
            {/* Tickets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userTickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </>
        ) : (
          <Card className="p-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <Ticket className="h-12 w-12 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">No tickets yet</h3>
                <p className="text-muted-foreground">
                  You haven't requested any tickets yet. Browse events to get
                  started!
                </p>
              </div>
              <Button asChild>
                <a href="/events">Browse Events</a>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
