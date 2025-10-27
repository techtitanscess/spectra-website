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
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/ui/terminal";
import {
  Trophy,
  Coffee,
  Gamepad2,
  Users,
  Code,
  FileText,
  Clock,
} from "lucide-react";
import Header from "@/components/shared/header";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/shared/marquee";

function SafeTerminalBg(props: any) {
  try {
    return <TerminalBg {...props} />;
  } catch (error) {
    console.warn("TerminalBg failed to render:", error);
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-green-800/10" />
    );
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
          Assemble your team and showcase your skills in GNDU's premier
          hackathon. Are you ready to code through the night and conquer the
          challenge?
        </motion.p>

        <motion.div
          variants={buttonGroupVariants}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div variants={itemVariants}>
            <TeamDialog />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link
              href="https://forms.gle/RRLvPnCVuA68KFR6A"
              target="_blank"
              className="rounded-full"
            >
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
    <div
      className="flex flex-col items-center justify-center gap-6 pt-32 pb-16 px-4"
      id="prize-pool"
    >
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
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 border-b border-green-500/30 pb-1">
                <Users className="h-5 w-5 text-pink-400" />
                <span className="text-primary font-medium">
                  Registration Details — IMPORTANT PLEASE READ
                </span>
              </div>

              <div className="pl-5 space-y-2 text-gray-400">
                <div className="text-primary font-semibold">
                  ₹150 per person
                </div>

                <p>
                  Please register your team on the website and fill in the{" "}
                  <a
                    className="underline text-cyan-400 hover:text-cyan-300"
                    href="https://forms.gle/RRLvPnCVuA68KFR6A"
                    target="_blank"
                  >
                    Ideathon Google Form
                  </a>{" "}
                  as well to be considered for the hackathon. <br />
                  Join this WhatsApp group for updates:{" "}
                  <a
                    className="underline text-yellow-400 hover:text-yellow-300"
                    href="https://chat.whatsapp.com/Dddlx1FutIwHePDeF4DKMg?mode=ems_wa_t"
                    target="_blank"
                  >
                    https://chat.whatsapp.com/K6uD3gRk6h3Z8mYI2
                  </a>
                </p>

                <p>
                  Once you’ve added all members and if your team is shortlisted
                  via the Ideathon round, our team will contact you to confirm
                  your registration. Please be patient. <br />
                  <span className="text-yellow-400">
                    ⚠ REGISTRATIONS CLOSE on 27th October (Monday) at 11:59 PM.
                  </span>{" "}
                  <br />
                  <span className="text-cyan-400">
                    NOTE: Hackathon themes will differ from Ideathon problem
                    statements.
                  </span>{" "}
                  <br />
                  <span className="text-cyan-400">
                    The Ideathon simply filters out the top 50 teams for the
                    final showdown!
                  </span>
                </p>
              </div>
            </div>

            {/* Prize Pool */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-primary/30 pb-2">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <span className="text-primary">Prize Pool</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-6">
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">
                    1st Place
                  </div>
                  <div className="text-primary text-2xl font-bold">₹25,000</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 font-bold text-lg">
                    2nd Place
                  </div>
                  <div className="text-primary text-2xl font-bold">₹15,000</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-400 font-bold text-lg">
                    3rd Place
                  </div>
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
                4 meals - Snacks, Lunch and Dinner on Day 1 and Breakfast on Day
                2
              </div>
            </div>

            {/* Themes & Problem Statements */}
            <div className="space-y-4 pt-4 border-t border-primary/30">
              <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="text-primary">
                  Themes & Problem Statements
                </span>
              </div>
              <div className="pl-8 space-y-2">
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-semibold">Loading themes...</span>
                </div>
                <div className="text-muted-foreground text-sm">
                  Exciting themes and problem statements will be available soon
                  !
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
                  Rules and the full timeline will be announced soon—keep
                  checking back for updates!
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
                Lots of fun activites to keep you energized throughout the
                hackathon! Details coming soon.
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
    <div
      className="flex flex-col items-center justify-center gap-8 py-16"
      id="sponsors"
    >
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

function PoweredBySection() {
  return (
    <div className="flex flex-col justify-center items-center p-4 my-10">
      <div className="w-[80%] flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Header title="Powered By" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex w-full items-center justify-center">
              <Image
                src="/assets/sponsors/statusbrew-logo.png"
                alt="Statusbrew"
                className="invert self-center"
                width={200}
                height={200}
              />
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="https://statusbrew.com" target="_blank">
                <h1
                  className={cn(
                    codeFont.className,
                    "text-xl md:text-3xl font-semibold underline"
                  )}
                >
                  Statusbrew
                </h1>
              </Link>
              <p className="text-muted-foreground text-justify">
                Statusbrew is a comprehensive social media management platform
                designed to help businesses, brands, and agencies efficiently
                manage their online presence from a single dashboard. It enables
                teams to plan, create, and schedule posts across multiple social
                networks, complete with collaboration tools, approval workflows,
                and shared content calendars. Beyond publishing, Statusbrew
                centralizes all social interactions—such as comments, messages,
                & reviews—into one unified inbox, making it easier to respond &
                engage with audiences in real time.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 text-center">
          <span
            className={cn(
              codeFont.className,
              "text-primary text-xl md:text-3xl font-semibold tracking-tight italic"
            )}
          >
            Community Partner
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex w-full items-center justify-center">
              <Image
                src="/assets/sponsors/node.png"
                alt="Node"
                className="invert self-center"
                width={200}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="https://www.instagram.com/node.hesh/" target="_blank">
                <h1
                  className={cn(
                    codeFont.className,
                    "text-xl md:text-3xl font-semibold underline"
                  )}
                >
                  Node by Hesh Media
                </h1>
              </Link>
              <p className="text-muted-foreground text-justify">
                Node by Hesh Media is an online tech community that brings
                together developers, tech enthusiasts, and curious minds under
                one digital roof. Powered by Hesh Media, the platform hosts
                regular online hackathons, covering the latest trends in
                software development, emerging technologies, and career insights
                by industry experts and experienced seniors. With a focus on
                clarity and community, Node by Hesh Media aims to inspire its
                audience to explore new tech frontiers, connect with like-minded
                individuals, and level up their skills in a collaborative &
                accessible way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HackerwrathPageView() {
  return (
    <>
      <HeroSection />
      <PoweredBySection />
      <PrizePoolSection />
      {/* <SponsorsSection /> */}
    </>
  );
}
