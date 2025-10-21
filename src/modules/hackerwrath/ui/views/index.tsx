"use client";

import React, { useState, useEffect } from "react";
import TerminalBg from "@/modules/home/ui/components/terminal-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import TextType from "@/modules/home/ui/components/typewriter";
import Link from "next/link";
import { motion } from "motion/react";
import TeamDialog from "../components/team-dialog";

export default function HeroSection() {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const titleText = "Hackerwrath 2025...";
    const typingSpeed = 75;
    const titleDuration = titleText.length * typingSpeed;

    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, titleDuration + 300);

    const buttonsTimer = setTimeout(() => {
      setShowButtons(true);
    }, titleDuration + 1000);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonsTimer);
    };
  }, []);

  return (
    <section className="flex h-screen flex-col items-center">
      <div className="z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
        <TextType
          text={["Hackerwrath 2025..."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
          className={cn(
            codeFont.className,
            "text-[36px] tracking-tight sm:text-[48px] md:text-[60px] lg:text-[72px]"
          )}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showSubtitle ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-muted-foreground max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          The ultimate coding showdown for college students. Assemble your team
          and showcase your skills!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <TeamDialog />
          <Link href="#events" className="rounded-full">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base sm:text-lg font-semibold"
            >
              View Themes
            </Button>
          </Link>
        </motion.div>
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
          curvature={0.05}
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
