"use client";

import React, { useState, useEffect } from "react";
import TerminalBg from "@/modules/home/ui/components/terminal-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import TextType from "@/modules/home/ui/components/typewriter";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import Beams from "../components/hero-bg";
import SplitText from "@/components/ui/split-text";

export default function HeroSection() {

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const buttonGroupVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };
  return (
    <section className="flex h-screen flex-col items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <motion.div variants={itemVariants}>
          <SplitText
            text="Spectra 2025"
            className={cn(
              codeFont.className,
              "text-[36px] tracking-tight sm:text-[48px] md:text-[60px] lg:text-[72px]"
            )}
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
          {/* <TextType
            text={["Spectra 2025"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            className={cn(
              codeFont.className,
              "text-[36px] tracking-tight sm:text-[48px] md:text-[60px] lg:text-[72px]"
            )}
          /> */}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          One campus, Infinite vibes — where friendships spark, dreams dance,
          and memories never fade.
        </motion.p>

        <motion.div
          variants={buttonGroupVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div variants={itemVariants}>
            <Link href="/events" className="rounded-full">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-base sm:text-lg font-semibold"
              >
                Get Tickets
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="#events" className="rounded-full">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base sm:text-lg font-semibold"
              >
                View Events
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute h-screen w-full opacity-80">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#9CFF00"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={152}
        />
        {/* <TerminalBg
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
        /> */}
      </div>
    </section>
  );
}
