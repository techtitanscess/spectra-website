import { cn } from "@/lib/utils";
import React from "react";
import { codeFont } from "../fonts";
import { FaGithub, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { TextShimmerWave } from "../ui/text-shimmer-wave";

export default function Footer() {
  return (
    <footer className="border-t flex flex-col items-center justify-center w-full p-6 gap-6 mt-6">
      <span
        className={cn(
          codeFont.className,
          "text-xl font-semibold tracking-tight md:text-3xl italic"
        )}
      >
        Developed by
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full place-items-center">
        <div className="flex flex-col gap-6 items-center md:items-start">
          <TextShimmerWave
            duration={2}
            className={cn(
              codeFont.className,
              "tracking-tight font-semibold text-lg"
            )}
          >
            Gurshabad Singh
          </TextShimmerWave>

          <Link
            href="https://www.instagram.com/semideus.dev/"
            className="flex items-center gap-2 text-muted-foreground"
            target="_blank"
          >
            <FaInstagram />
            <span>Instagram</span>
          </Link>

          <Link
            href="https://github.com/semideus-dev"
            className="flex items-center gap-2 text-muted-foreground"
            target="_blank"
          >
            <FaGithub />
            <span>Github</span>
          </Link>
        </div>
        <div className="flex flex-col gap-6 items-center md:items-start">
          <TextShimmerWave
            duration={2}
            className={cn(
              codeFont.className,
              "tracking-tight font-semibold text-lg"
            )}
          >
            Vansh Mahajan
          </TextShimmerWave>
          <Link
            href="https://www.instagram.com/_vansh_mahajan_/"
            target="_blank"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <FaInstagram />
            <span>Instagram</span>
          </Link>

          <Link
            href="https://github.com/vansh16-code/vansh16-code"
            className="flex items-center gap-2 text-muted-foreground"
            target="_blank"
          >
            <FaGithub />
            <span>Github</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
