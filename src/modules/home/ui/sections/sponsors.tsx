"use client";

import Header from "@/components/shared/header";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/shared/marquee";
import { sponsors } from "@/lib/constants";
import { useMemo } from "react";


export default function SponsorsSection() {
  const list = useMemo(() => [...sponsors, ...sponsors], []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-12">
      <Header
        title="In Collaboration With"
        subtitle="Celebrating the visionaries who power Spectra."
      />
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent>
          {list.map((s, i) => (
            <MarqueeItem className="h-32 w-32" key={i}>
              <img
                key={`${s.name}-${i}`}
                src={s.src || "/placeholder-logo.svg"}
                alt={`${s.name} logo`}
                className="h-14 w-auto opacity-80"
                loading="lazy"
              />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
