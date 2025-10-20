import EventsMenu from "@/modules/events/ui/components/events-menu";
import Header from "@/components/shared/header";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { events } from "@/lib/constants";
import Link from "next/link";
import React from "react";


export default function EventsSection() {
  return (
    <div className="flex my-[50px] scroll-mt-20 flex-col items-center justify-center gap-4" id="events">
      <Header
        title="Whats Happening?"
        subtitle="Discover the latest events happening at Spectra."
      />
      <Terminal className="min-h-fit w-[90%] md:w-[80%] ">
        <TypingAnimation duration={20} className="text-muted-foreground">
          {"> Loading all events..."}
        </TypingAnimation>
        <TypingAnimation duration={20} className="text-destructive">
          x Error: Too many awesome events found!
        </TypingAnimation>
        <TypingAnimation duration={20} className="text-muted-foreground">
          {"> Showing top 4 events"}
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
            Want to see more?{" "}
            <Link
              href="/events"
              className="text-primary underline underline-offset-4"
            >
              View All Events
            </Link>
          </span>
        </AnimatedSpan>
      </Terminal>
    </div>
  );
}
