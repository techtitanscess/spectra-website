"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { codeFont } from "@/components/fonts";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
    TrendingUp
} from "lucide-react";

export default function HackerwrathSection() {
    return (
        <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(156,255,0,0.1)_50%,transparent_75%)] bg-[length:20px_20px]" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Main Title */}
                        <div className="space-y-4">
                            <h2 className={cn(
                                codeFont.className,
                                "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                            )}>
                                HACKERWRATH 2025:
                                <br />
                                <span className="text-primary">GNDU&apos;S FLAGSHIP</span>
                                <br />
                                CODING HACKATHON.
                            </h2>

                            <p className="text-gray-400 text-lg max-w-lg">
                                Build pixel perfect solutions and interactive tech experiences in 24 hours.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/hackerwrath">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-3 rounded-full"
                                >
                                    Participate Now
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Side - Tech Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75" />

                            {/* Tech Image */}
                            <Image
                                src="/github.png"
                                alt="Hackerwrath 2025 Tech"
                                width={500}
                                height={500}
                                className="relative invert opacity-25 z-10 w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                                priority
                            />

                            {/* Floating elements */}
                            <div className="absolute top-10 left-10 w-4 h-4 bg-primary rounded-full animate-pulse" />
                            <div className="absolute bottom-20 right-10 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000" />
                            <div className="absolute top-1/2 left-0 w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}