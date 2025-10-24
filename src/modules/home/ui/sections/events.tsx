import EventsMenu from "@/modules/events/ui/components/events-menu";
import Header from "@/components/shared/header";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { getLatestEventsForHome } from "@/modules/events/server/actions";
import Link from "next/link";
import React from "react";

export default async function EventsSection() {
  const events = await getLatestEventsForHome();

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 pt-32 pb-[50px]"
      id="events"
    >
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
          {`~ Displaying 4 of 27 events:`}
        </TypingAnimation>
        <AnimatedSpan className="my-1 h-[600px]">
          <EventsMenu items={events} />
        </AnimatedSpan>
        {events.length > 0 ? (
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
        ) : (
          <>
            <TypingAnimation duration={20} className="text-destructive">
              x Error: No events found!
            </TypingAnimation>
            <TypingAnimation duration={20} className="text-muted-foreground">
              {"> No events available at the moment"}
            </TypingAnimation>
            <AnimatedSpan>
              <span className="text-muted-foreground">
                Check back later for exciting events!
              </span>
            </AnimatedSpan>
          </>
        )}
      </Terminal>
    </div>
  );
}
