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
  Shield,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Header from "@/components/shared/header";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/shared/marquee";
import { Timeline } from "@/components/ui/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      <div className="w-full">
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
                  ₹300 per person
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
                  Once you&apos;ve added all members and if your team is
                  shortlisted via the Ideathon round, <br />
                  our team will contact you to confirm your registration. Please
                  be patient. <br /> <br />
                  <span className="text-yellow-400">
                    ⚠ REGISTRATIONS CLOSE on 31st October (Monday) at 11:59 AM (Noon).
                  </span>{" "}
                  <br />
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
                <div className="md:text-center">
                  <div className="text-yellow-400 font-bold text-lg">
                    1st Place
                  </div>
                  <div className="text-primary text-2xl font-bold">₹25,000</div>
                </div>
                <div className="md:text-center">
                  <div className="text-gray-400 font-bold text-lg">
                    2nd Place
                  </div>
                  <div className="text-primary text-2xl font-bold">₹15,000</div>
                </div>
                <div className="md:text-center">
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

function RulesSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4">
      <div className="w-full">
        <Terminal className="min-h-fit w-full">
          <TypingAnimation duration={20} className="text-muted-foreground">
            {"> Loading hackathon rules and guidelines..."}
          </TypingAnimation>

          <TypingAnimation duration={20} className="text-primary">
            ✓ Rules loaded successfully
          </TypingAnimation>

          <TypingAnimation duration={20} className="text-muted-foreground">
            {"> Please read carefully before participating"}
          </TypingAnimation>

          <AnimatedSpan className="my-4 space-y-6">
            {/* Team Rules */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 border-b border-red-500/30 pb-1">
                <Users className="h-5 w-5 text-red-400" />
                <span className="text-primary font-medium">
                  Team Formation & Registration
                </span>
              </div>

              <div className="pl-5 space-y-2 text-gray-400">
                <ul className="list-disc list-inside space-y-2">
                  <li>Teams must consist of 2-4 members maximum</li>
                  <li>All team members must be registered students</li>
                  <li>Cross-college teams are allowed and encouraged</li>
                  <li>Registration fee of ₹300 per person is mandatory</li>
                  <li>
                    Teams must complete both website registration and Ideathon
                    form
                  </li>
                  <li>
                    No changes to team composition after registration deadline
                  </li>
                </ul>
              </div>
            </div>

            {/* Project Guidelines */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-blue-500/30 pb-2">
                <Code className="h-6 w-6 text-blue-400" />
                <span className="text-primary">Project Guidelines</span>
              </div>

              <div className="pl-6 space-y-2 text-gray-400">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Projects must be original and built during the hackathon
                  </li>
                  <li>Use of existing frameworks and libraries is allowed</li>
                  <li>No pre-written code specific to the problem statement</li>
                  <li>Open source tools and APIs are permitted</li>
                  <li>Projects must address one of the provided themes</li>
                  <li>
                    All code must be uploaded to GitHub with proper
                    documentation
                  </li>
                </ul>
              </div>
            </div>

            {/* Submission Rules */}
            <div className="space-y-4 pt-4 border-t border-green-500/30">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-green-400" />
                <span className="text-primary">Submission Requirements</span>
              </div>
              <div className="pl-8 space-y-2 text-gray-400">
                <ul className="list-disc list-inside space-y-2">
                  <li>Final submission deadline: 12:00 PM on Day 2 (strict)</li>
                  <li>No commits allowed to GitHub after the deadline</li>
                  <li>Must include a comprehensive README.md file</li>
                  <li>Provide a demo video (2-3 minutes max)</li>
                  <li>Include setup and installation instructions</li>
                  <li>List all dependencies and technologies used</li>
                </ul>
              </div>
            </div>

            {/* Code of Conduct */}
            <div className="space-y-4 pt-4 border-t border-yellow-500/30">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                <span className="text-primary">Code of Conduct</span>
              </div>
              <div className="pl-8 space-y-2 text-gray-400">
                <ul className="list-disc list-inside space-y-2">
                  <li>Maintain a respectful and inclusive environment</li>
                  <li>
                    No harassment, discrimination, or inappropriate behavior
                  </li>
                  <li>Follow venue rules and safety guidelines</li>
                  <li>Keep workspace clean and organized</li>
                  <li>Respect organizers, mentors, and fellow participants</li>
                  <li>Report any issues to the organizing team immediately</li>
                </ul>
              </div>
            </div>

            {/* Judging Criteria */}
            <div className="space-y-4 pt-4 border-t border-purple-500/30">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-purple-400" />
                <span className="text-primary">Judging Criteria</span>
              </div>
              <div className="pl-8 space-y-2 text-gray-400">
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="text-primary">Innovation (25%):</span>{" "}
                    Creativity and uniqueness of the solution
                  </li>
                  <li>
                    <span className="text-primary">
                      Technical Implementation (25%):
                    </span>{" "}
                    Code quality and technical complexity
                  </li>
                  <li>
                    <span className="text-primary">Problem Solving (25%):</span>{" "}
                    How well the solution addresses the theme
                  </li>
                  <li>
                    <span className="text-primary">Presentation (15%):</span>{" "}
                    Quality of demo and communication
                  </li>
                  <li>
                    <span className="text-primary">Feasibility (10%):</span>{" "}
                    Practicality and scalability of the solution
                  </li>
                </ul>
              </div>
            </div>

            {/* Important Notes */}
            <div className="space-y-4 pt-4 border-t border-red-500/30">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <span className="text-primary">Important Notes</span>
              </div>
              <div className="pl-8 space-y-2">
                <div className="text-red-400 font-semibold">
                  ⚠️ Disqualification Conditions:
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>Violation of any rule or code of conduct</li>
                  <li>Plagiarism or use of pre-existing project code</li>
                  <li>Missing submission deadline</li>
                  <li>Incomplete team registration or payment</li>
                  <li>Providing false information during registration</li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-4 border-t border-cyan-500/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-cyan-400" />
                <span className="text-primary">Need Help?</span>
              </div>
              <div className="pl-8 text-gray-400">
                <p>
                  Join our WhatsApp group for real-time updates and support:{" "}
                  <br />
                  <a
                    className="underline text-cyan-400 hover:text-cyan-300"
                    href="https://chat.whatsapp.com/Dddlx1FutIwHePDeF4DKMg?mode=ems_wa_t"
                    target="_blank"
                  >
                    https://chat.whatsapp.com/K6uD3gRk6h3Z8mYI2
                  </a>
                </p>
              </div>
            </div>
          </AnimatedSpan>
        </Terminal>
      </div>
    </div>
  );
}

function HackathonInfoSection() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-6 pt-32 pb-16 px-4"
      id="hackathon-info"
    >
      <div className="w-[90%] md:w-[80%]">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <PrizePoolSection />
          </TabsContent>
          <TabsContent value="rules" className="mt-6">
            <RulesSection />
          </TabsContent>
        </Tabs>
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
            Associate Partner
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex w-full items-center justify-center">
              <Image
                src="/assets/sponsors/hack.svg"
                alt="HackwithIndia"
                className="invert self-center"
                width={200}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="https://hackwithindia.in" target="_blank">
                <h1
                  className={cn(
                    codeFont.className,
                    "text-xl md:text-3xl font-semibold underline"
                  )}
                >
                  HackWithIndia
                </h1>
              </Link>
              <p className="text-muted-foreground text-justify">
                HackwithIndia is a leading platform for tech enthusiasts and
                developers across India, fostering innovation through
                hackathons, coding competitions, and tech events. The platform
                connects students, professionals, and tech communities
                nationwide, providing opportunities to showcase skills, learn
                new technologies, and build impactful solutions for real-world
                problems.
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
            Community Partners
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex w-full items-center justify-center">
              <Image
                src="/assets/sponsors/gsc.png"
                alt="Node"
                className="invert self-center"
                width={200}
                height={100}
              />
            </div>
          <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="https://chat.whatsapp.com/LoOA9n12ohW1P8jaeqTTOx?mode=wwt" target="_blank">
                <h1
                  className={cn(
                    codeFont.className,
                    "text-xl md:text-3xl font-semibold underline"
                  )}
                >
                  GNDU Students' Community
                </h1>
              </Link>
              <p className="text-muted-foreground text-justify">
                Aspire. Inspire. Unite.
                Connecting Students. Creating Change.
                A student-driven initiative uniting GNDU under one collaborative platform. 
                Rooted in Vasudhaiva Kutumbhakam, we connect learners, share opportunities, 
                and amplify student voices — building a culture of growth, awareness, and 
                collective progress across the campus.
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
            Listing Partner
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex w-full items-center justify-center">
              <Image
                src="/assets/sponsors/devnovate.jpg"
                alt="Devnovate"
                className="invert self-center"
                width={200}
                height={100}
              />
            </div>
            <div className="flex flex-col items-center md:items-start gap-3">
              <Link href="https://devnovate.co/" target="_blank">
                <h1
                  className={cn(
                    codeFont.className,
                    "text-xl md:text-3xl font-semibold underline"
                  )}
                >
                  Devnovate
                </h1>
              </Link>
              <p className="text-muted-foreground text-justify">
                Devnovate is the ultimate platform for developers and innovators
                to discover, join, and organize hackathons and tech events.
                Whether you're looking to showcase your skills, collaborate with
                like-minded creators, or launch your own event, Devnovate
                connects you to a vibrant global community driving the future of
                technology and innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

function TimelineSection() {
  const hackathonTimeline = [
    {
      title: "Pre-Event",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
            Get ready for the hackathon! Check-in, collect your kits, and attend
            the briefing session.
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li>
              <span className="font-semibold text-primary">
                8:30 AM Onwards:
              </span>{" "}
              Registration & Setup
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Registration desk opens. Participants check in and collect their
                badges and kits.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                9:50 AM – 10:00 AM:
              </span>{" "}
              Opening Ceremony & Hackathon Briefing
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Welcome address, theme announcement, and judging criteria
                briefing.
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Day 1",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
            The hackathon officially begins! A full day of coding, mentoring,
            meals, and fun.
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li>
              <span className="font-semibold text-primary">
                10:00 AM – 2:00 PM:
              </span>{" "}
              Hackathon Officially Begins 🚀
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Teams start working on their ideas. Light refreshments provided.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                2:00 PM – 3:00 PM:
              </span>{" "}
              Lunch Break 🍱
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Take a break and enjoy lunch with your teammates.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                3:00 PM – 8:00 PM:
              </span>{" "}
              Development Continues
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Continue working on your projects and refining your prototypes.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                4:00 PM Onwards:
              </span>{" "}
              Mentoring Round 🧠
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Mentors visit teams, check progress, and provide guidance.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">6:00 PM:</span>{" "}
              Non-Overnight Participants Depart
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Those not staying overnight should pack up and leave by this
                time.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                8:00 PM – 9:00 PM:
              </span>{" "}
              Dinner Time 🍽️
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Dinner served — recharge for the night grind!
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                9:00 PM – 10:30 PM:
              </span>{" "}
              Icebreaker / Fun Activity Session 🎮
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Optional games or tech trivia to refresh participants.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                10:30 PM – 12:00 AM:
              </span>{" "}
              Late-Night Grind
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Continue working on your ideas through the night.
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Day 2",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
            The overnight coding marathon continues as teams make progress
            through the night.
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li>
              <span className="font-semibold text-primary">
                12:00 AM – 8:30 AM:
              </span>{" "}
              Silent Working Hours 🌙
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Focus phase — minimal noise. Mentors available if needed.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">7:30 AM:</span>{" "}
              Morning Check-In
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Participants returning in the morning must check in before the
                final review.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                8:30 AM Onwards:
              </span>{" "}
              Evaluation Round 🧾
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Final inspection by mentors and judges before submission.
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Wrap-Up",
      content: (
        <div>
          <p className="mb-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
            Time to wrap things up, submit projects, and celebrate the winners!
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li>
              <span className="font-semibold text-primary">10:00 AM:</span>{" "}
              Sponsor Meals
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Breakfast or refreshments provided by event sponsors.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">12:00 PM:</span>{" "}
              Project Submission Deadline ⏰
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Final submission via GitHub (no commits after 12 PM). Include
                GitHub link, video, and description.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">12:30 PM:</span>{" "}
              Presentations 🎤
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Teams present their projects and demos to the judges.
              </p>
            </li>
            <li>
              <span className="font-semibold text-primary">
                After Presentations:
              </span>{" "}
              Closing Ceremony 🏆
              <p className="text-neutral-600 dark:text-neutral-300 text-xs">
                Results announcement, prize distribution, and group photo
                session.
              </p>
            </li>
          </ul>
          <p className="mt-6 text-xs md:text-sm text-neutral-800 dark:text-neutral-200">
            Note: Schedule is subject to change by organizers without prior notice.
          </p>
        </div>
        
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative w-[90%] overflow-clip">
        <Timeline data={hackathonTimeline} />
      </div>
    </div>
  );
}

export default function HackerwrathPageView() {
  return (
    <>
      <HeroSection />
      <HackathonInfoSection />
      <TimelineSection />
      <PoweredBySection />
      {/* <SponsorsSection /> */}
    </>
  );
}
