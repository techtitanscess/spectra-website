"use client";

import type React from "react";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Header from "@/components/shared/header";
import { shops } from "@/lib/constants";

type Shop = {
  id: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  className?: string;
};


export default function ShopSection() {
  return (
    <div className="flex h-screen flex-col gap-8 my-[50px]">
      <Header
        title="The Fest Market"
        subtitle="Step into a vibrant marketplace buzzing with flavors and crafts."
      />
      <div
        aria-label="College Fest Stalls"
        className="md:mx-36 mx-10 grid grid-cols-1 gap-5 sm:auto-rows-[200px] sm:grid-cols-6 lg:auto-rows-[240px] lg:grid-cols-12"
      >
        {shops.map((shop) => (
          <AnimatedCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}

function AnimatedCard({ shop }: { shop: Shop }) {
  const { title, description, Icon, className } = shop;

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative cursor-pointer rounded-2xl",
        "ring-border/80 border-primary border ring-1 transition-shadow",
        className,
      )}
    >
      <Card className="bg-card/95 supports-[backdrop-filter]:bg-card/90 h-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, color-mix(in oklab, var(--color-primary) 18%, transparent) 25%, transparent 25% 50%, color-mix(in oklab, var(--color-primary) 18%, transparent) 50% 75%, transparent 75%)",
            backgroundSize: "44px 44px",
          }}
        />
        <CardHeader className="relative z-10 p-5 text-start md:p-6">
          <CardTitle className="text-2xl font-bold text-balance md:text-4xl">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-sm font-semibold md:text-lg">
            {description}
          </p>
        </CardHeader>

        <CardContent className="relative z-10 h-full">
          <motion.div
            className="absolute right-4 bottom-4 h-[120px] w-[140px] md:right-6 md:bottom-6 md:h-[140px] md:w-[160px]"
            initial={{ rotate: -4, y: 0 }}
            animate={{ rotate: [-4, 4, -4], y: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Icon className="h-full w-full text-[color:var(--color-primary)]/85" />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 -z-0">
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute size-2 rounded-full"
                style={{
                  background:
                    "color-mix(in oklab, var(--color-primary) 70%, white 30%)",
                  left: `${6 + ((i * 9) % 88)}%`,
                  top: `${12 + ((i * 13) % 76)}%`,
                }}
                initial={{ y: 0, opacity: 0.25 }}
                animate={{ y: [0, -6, 0], opacity: [0.2, 0.5, 0.2] }}
                transition={{
                  duration: 3 + (i % 4),
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
                aria-hidden
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
