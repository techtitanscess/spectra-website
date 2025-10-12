import EventsMenu from "@/components/shared/events-menu";
import Header from "@/components/shared/header";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { events } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

export default function EventsSection() {
  return (
    <div className="flex my-[50px] scroll-mt-20 flex-col items-center justify-center gap-4" id="events">
      <Header
        title="Whats Happening?"
        subtitle="Discover the latest events happening at Spectra."
      />
      <Terminal className="min-h-fit w-[90%] md:w-[80%] ">
        <TypingAnimation duration={20} className="text-muted-foreground">
          $ SELECT * FROM spectra_events
        </TypingAnimation>
        <TypingAnimation duration={20} className="text-destructive">
          x Database Error: Too many fun events found.
          query.
        </TypingAnimation>
        <TypingAnimation duration={20} className="text-muted-foreground">
          $ SELECT * FROM spectra_events LIMIT 4
        </TypingAnimation>
        <TypingAnimation
          duration={20}
          className="text-primary flex items-center"
        >
          ~ Displaying 4 of 128 events:
        </TypingAnimation>
        <AnimatedSpan className="my-1 h-[600px]">
          <EventsMenu items={events} />
        </AnimatedSpan>
        <AnimatedSpan>
          <span className="text-muted-foreground">
            To see all events, run:{" "}
            <Link
              href="/events"
              className="text-primary underline underline-offset-4"
            >
              sudo ./all_spectra_events.sh
            </Link>
          </span>
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}
