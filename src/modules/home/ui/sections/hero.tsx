import React from "react";
import TerminalBg from "@/modules/home/ui/components/terminal-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import TextType from "@/modules/home/ui/components/typewriter";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex h-screen flex-col items-center">
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <TextType
          text={["Initializing Spectra_2025.exe ..."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          className={cn(
            codeFont.className,
            "text-[30px] tracking-tight md:text-[50px]",
          )}
        />
        {/* <h1>Spectra</h1> */}
        <p className="text-muted-foreground max-w-2xl text-sm md:text-xl">
          One campus, Infinite vibes — where friendships spark, dreams dance,
          and memories never fade.
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="rounded-full">
            fetch --tickets
          </Button>
          <Link href="#events" className="rounded-full">
            <Button size="lg" variant="outline">
              cd ./eventhub
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute h-screen w-full opacity-30">
        <TerminalBg
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.3}
          tint="#9CFF00"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={true}
          brightness={0.4}
        />
      </div>
    </section>
  );
}
