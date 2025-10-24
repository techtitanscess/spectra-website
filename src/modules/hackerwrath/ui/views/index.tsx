"use client";

import React from "react";
import TerminalBg from "@/modules/home/ui/components/terminal-bg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import TextType from "@/modules/home/ui/components/typewriter";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import TeamDialog from "../components/team-dialog";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { Trophy, Coffee, Gamepad2, Users, Code, FileText, Clock } from "lucide-react";
import Header from "@/components/shared/header";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/shared/marquee";

function SafeTerminalBg(props: any) {
  try {
    return <TerminalBg {...props} />;
  } catch (error) {
    console.warn('TerminalBg failed to render:', error);
    return <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-800/10" />;
  }
}

function HeroSection() {
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
        staggerChildren: 0.4,
        delayChildren: 0.3,
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
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          The ultimate OVERNIGHT coding showdown for college students. Assemble your team
          and showcase your skills in GNDU's premier hackathon. Are you ready to code
          through the night and conquer the challenge?
        </motion.p>

        <motion.div
          variants={buttonGroupVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div variants={itemVariants}>
            <TeamDialog />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link href="https://forms.gle/RRLvPnCVuA68KFR6A" target="_blank" className="rounded-full">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base sm:text-lg font-semibold"
              >
                Ideathon
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 rounded-full border border-primary/40 bg-white/90 px-6 py-3 mt-4 backdrop-blur"
        >
          <span className="text-sm uppercase tracking-[0.35em] text-primary">Co-powered by</span>
          <Image
            src="/assets/sponsors/statusbrew-logo.png"
            alt="Statusbrew logo"
            width={140}
            height={100}
            className="h-9 w-auto"
            priority
          />
        </motion.div>
      </motion.div>
      <div className="absolute h-screen w-full opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-800/10" />
        <SafeTerminalBg
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

function PrizePoolSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 pt-32 pb-16 px-4" id="prize-pool">
      <div className="w-[90%] md:w-[80%]">
        <Terminal className="min-h-fit w-full">
          <TypingAnimation duration={20} className="text-muted-foreground">
            {"> Initializing Hackerwrath 2.0..."}
          </TypingAnimation>

          <TypingAnimation duration={20} className="text-primary">
            ✓ Details loaded successfully
          </TypingAnimation>

          <TypingAnimation duration={20} className="text-muted-foreground">
            {"> Welcome to Hackerwrath 2.0"}
          </TypingAnimation>

          <AnimatedSpan className="my-4 space-y-6">
            {/* Registration Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-primary/30 pb-2">
                <Users className="h-6 w-6 text-green-400" />
                <span className="text-primary">Registration Details - IMPORTANT PLEASE READ</span>
              </div>
              <div className="pl-6 space-y-2 text-muted-foreground">
                <div className="text-primary font-semibold">₹300 per person</div>
                <p>
                  Please register your team on the website and fill in the <a className="underline" href="https://forms.gle/RRLvPnCVuA68KFR6A" target="_blank">Ideathon Google Form</a> as well to
                  be considered for the hackathon.
                </p>
                <p>
                  Once you have added all members and if your team has been shortlisted via the Ideathon round, our team will <br />contact you to
                  make the payment and confirm your 
                  registration so please be patient. <br />

                  <span className="text-red-600">IMPORTANT: REGISTRATIONS CLOSE SHARPLY ON 27th October (Monday) at 11:59 PM.</span> <br />
                  <span className="text-yellow-300">NOTE: The Hackathon Themes would be different from the Ideathon Problem Statements. </span> <br />
                  <span className="text-yellow-300">The Ideathon is just to filter out the top 50 Teams that</span> <br />
                  <span className="text-yellow-300">would be moving into the  final showdown to flex their coding muscles!</span>
                </p>
              </div>
            </div>

            {/* Prize Pool */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-primary/30 pb-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <span className="text-primary">Prize Pool</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-6">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">1st Place</div>
                  <div className="text-primary text-2xl font-bold">₹25,000</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 font-bold text-lg">2nd Place</div>
                  <div className="text-primary text-2xl font-bold">₹15,000</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-400 font-bold text-lg">3rd Place</div>
                  <div className="text-primary text-2xl font-bold">₹10,000</div>
                </div>
              </div>
            </div>

            {/* Refreshments */}
            <div className="space-y-4 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2">
                <Coffee className="h-6 w-6 text-orange-400" />
                <span className="text-primary">Refreshments</span>
              </div>
              <div className="pl-8 text-muted-foreground">
                4 meals - Snacks, Lunch and Dinner on Day 1 
                and Breakfast on Day 2
              </div>
            </div>

            {/* Themes & Problem Statements */}
            <div className="space-y-4 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="text-primary">Themes & Problem Statements</span>
              </div>
              <div className="pl-8 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Loading themes...</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Exciting themes and problem statements will be available soon !
                </div>
              </div>
            </div>

            {/* Rules & Timeline */}
            <div className="space-y-4 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-emerald-400" />
                <span className="text-primary">Rules & Timeline</span>
              </div>
              <div className="pl-8 space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Loading schedule...</span>
                </div>
                <div className="text-sm">
                  Rules and the full timeline will be announced soon—keep checking back for
                  updates!
                </div>
              </div>
            </div>

            {/* Fun Events */}
            <div className="space-y-4 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-6 w-6 text-purple-400" />
                <span className="text-primary ">Fun Activities</span>
              </div>
              <div className="pl-8 text-muted-foreground">
                Lots of fun activites to keep you energized throughout the hackathon!
                Details coming soon.
              </div>
            </div>

          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}

function SponsorsSection() {
  // Import sponsors from constants
  const sponsors = [
    { name: "Triumph", src: "/assets/sponsors/triumph.png" },
    { name: "Zoreko", src: "/assets/sponsors/zoreko.png" },
    { name: "Samsung", src: "/assets/sponsors/samsung.png" },
    { name: "Microsoft", src: "/assets/sponsors/microsoft.webp" },
    { name: "Lakme", src: "/assets/sponsors/lakme.png" },
    { name: "TVS", src: "/assets/sponsors/tvs.png" },
  ];

  const list = [...sponsors, ...sponsors];

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-16" id="sponsors">
      <Header
        title="Our Sponsors"
        subtitle="Celebrating the visionaries who power Hackerwrath."
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

export default function HackerwrathPageView() {
  return (
    <>
      <HeroSection />
      <PrizePoolSection />
      {/* <SponsorsSection /> */}
    </>
  );
}
