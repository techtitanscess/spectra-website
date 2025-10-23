"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, CreditCard, Loader2, Download, QrCode, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { toast } from "sonner";
import { generateTicketPDF } from "@/lib/ticket-generator";

export type UserTicket = {
  id: string;
  name: string;
  phoneNumber: string;
  status: "pending" | "approved";
  createdAt: Date;
  eventId: string;
  userId: string;
  event: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string | null;
    whatsappUrl?: string | null;
    startDate: Date;
    endDate: Date;
    ticketCost: number;
    totalHours: number;
  } | null;
};

interface TicketCardProps {
  ticket: UserTicket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const isPending = ticket.status === "pending";
  const isApproved = ticket.status === "approved";

  if (!ticket.event) {
    return null;
  }

  const handleDownloadTicket = async () => {
    setIsDownloading(true);
    try {
      if (!ticket.event) {
        toast.error("Event information not available");
        return;
      }

      await generateTicketPDF({
        id: ticket.id,
        name: ticket.name,
        phoneNumber: ticket.phoneNumber,
        status: ticket.status,
        createdAt: ticket.createdAt,
        event: ticket.event
      });
      
      toast.success("Ticket downloaded successfully!");
    } catch (error) {
      console.error("Error generating ticket:", error);
      toast.error("Failed to generate ticket. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div
      className={cn(
        isPending ? "bg-background text-white opacity-50" : "bg-primary text-black",
        "flex flex-col border border-background rounded-lg relative"
      )}
      style={{
        background: isPending ? "var(--background)" : "var(--primary)",
      }}
    >
      {/* Left semi-circle cutout */}
      <div
        className="absolute left-0 bottom-6 transform -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
        style={{
          backgroundColor: "var(--background)",
        }}
      />

      {/* Right semi-circle cutout */}
      <div
        className="absolute right-0 bottom-6  transform -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full"
        style={{
          backgroundColor: "var(--background)",
        }}
      />

      <div
        className={cn(
          isApproved && "border-black",
          "flex items-center justify-between p-4 border-dashed border-b-4"
        )}
      >
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-3xl">
            {ticket.event?.name || "Unknown Event"}
          </span>
          <p>On {format(ticket.event.startDate, "PP")}</p>
        </div>
        <span className={cn(codeFont.className, "font-semibold text-4xl")}>
          ₹{ticket.event?.ticketCost}
        </span>
      </div>
      {isPending ? (
        <div className="py-3 text-muted-foreground flex gap-1 justify-center items-center">
          <span>Processing</span>
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-3">
          <span className="text-center">
            {format(ticket.event?.startDate, "p")} to{" "}
            {format(ticket.event?.endDate, "p")} | {ticket.event?.totalHours}{" "}
            hours
          </span>
          <div className="flex gap-2 px-4">
            <Button
              onClick={handleDownloadTicket}
              disabled={isDownloading}
              className={cn(
                "bg-black text-primary hover:bg-gray-800",
                ticket.event?.whatsappUrl ? "flex-1" : "flex-1"
              )}
              size="sm"
            >
              <LoadingSwap isLoading={isDownloading}>
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Ticket
                </div>
              </LoadingSwap>
            </Button>
            
            {ticket.event?.whatsappUrl && ticket.event.whatsappUrl.trim() !== '' && (
              <Button
                asChild
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
                size="sm"
              >
                <a
                  href={ticket.event.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Join WhatsApp
                </a>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
    // <Card className="h-full">
    //   <CardHeader className="pb-4">
    //     <div className="flex items-start justify-between">
    //       <div className="space-y-1">
    //         <h3 className="font-semibold text-lg line-clamp-1">
    //           {ticket.event?.name || "Unknown Event"}
    //         </h3>
    //         <p className="text-sm text-muted-foreground">
    //           Ticket for: {ticket.name}
    //         </p>
    //       </div>
    //       <Badge
    //         variant={isApproved ? "default" : "secondary"}
    //         className={cn(
    //           "shrink-0",
    //           isApproved
    //             ? "bg-green-100 text-green-800 hover:bg-green-200"
    //             : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    //         )}
    //       >
    //         {isPending ? "Processing" : "Approved"}
    //       </Badge>
    //     </div>
    //   </CardHeader>

    //   <CardContent className="space-y-4">
    //     {ticket.event && (
    //       <>
    //         <div className="space-y-2">
    //           <p className="text-sm text-muted-foreground line-clamp-2">
    //             {ticket.event.description}
    //           </p>
    //         </div>

    //         <div className="space-y-2">
    //           <div className="flex items-center gap-2 text-sm">
    //             <Calendar className="h-4 w-4 text-muted-foreground" />
    //             <span>
    //               {format(new Date(ticket.event.startDate), "MMM dd, yyyy")}
    //             </span>
    //           </div>

    //           <div className="flex items-center gap-2 text-sm">
    //             <Clock className="h-4 w-4 text-muted-foreground" />
    //             <span>
    //               {format(new Date(ticket.event.startDate), "HH:mm")} -{" "}
    //               {format(new Date(ticket.event.endDate), "HH:mm")}
    //             </span>
    //           </div>

    //           <div className="flex items-center gap-2 text-sm">
    //             <MapPin className="h-4 w-4 text-muted-foreground" />
    //             <span>{ticket.event.totalHours} hours duration</span>
    //           </div>

    //           <div className="flex items-center gap-2 text-sm">
    //             <CreditCard className="h-4 w-4 text-muted-foreground" />
    //             <span>
    //               {ticket.event.ticketCost === 0
    //                 ? "Free"
    //                 : `₹${ticket.event.ticketCost.toLocaleString()}`}
    //             </span>
    //           </div>
    //         </div>
    //       </>
    //     )}

    //     <div className="pt-2 border-t">
    //       <p className="text-xs text-muted-foreground">
    //         Requested on{" "}
    //         {format(new Date(ticket.createdAt), "MMM dd, yyyy 'at' HH:mm")}
    //       </p>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
