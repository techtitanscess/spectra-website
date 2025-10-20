import { Input } from "@/components/ui/input";
import { FaTerminal } from "react-icons/fa6";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  return (
    <Terminal className="h-fit w-[95%] sm:w-[85%] md:w-[60%] lg:w-[45%] xl:w-[40%]">
      <TypingAnimation duration={30}>Create your Spectra account</TypingAnimation>

      <AnimatedSpan className="text-destructive">
        ✖ Required: user_name, email & password
      </AnimatedSpan>

      <div className="my-3 sm:my-4 flex flex-col gap-2 sm:gap-3">
        <div>
          <AnimatedSpan className="text-primary text-sm sm:text-base">
            ? Enter username:
          </AnimatedSpan>

          <AnimatedSpan className="flex items-center gap-2 sm:gap-3">
            <FaTerminal className="text-sm sm:text-base flex-shrink-0" />
            <Input type="text" className="text-sm sm:text-base" />
          </AnimatedSpan>
        </div>
        <div>
          <AnimatedSpan className="text-primary text-sm sm:text-base">
            ? Enter email_address:
          </AnimatedSpan>

          <AnimatedSpan className="flex items-center gap-2 sm:gap-3">
            <FaTerminal className="text-sm sm:text-base flex-shrink-0" />
            <Input type="email" className="text-sm sm:text-base" />
          </AnimatedSpan>
        </div>
        <div>
          <AnimatedSpan className="text-primary text-sm sm:text-base">
            ? Enter password:
          </AnimatedSpan>

          <AnimatedSpan className="flex items-center gap-2 sm:gap-3">
            <FaTerminal className="text-sm sm:text-base flex-shrink-0" />
            <Input type="password" className="text-sm sm:text-base" />
          </AnimatedSpan>
        </div>
      </div>

      <AnimatedSpan>
        <Button variant="outline" className="my-2 w-full">
          Create Account
        </Button>
      </AnimatedSpan>

      <TypingAnimation duration={30} className="text-muted-foreground">
        Other useful commands:
      </TypingAnimation>

      <AnimatedSpan className="text-primary my-1">
        <Link href="/sign-in" className="underline underline-offset-4">
          Already have an account?
        </Link>
      </AnimatedSpan>
      <AnimatedSpan className="text-primary">
        <Link href="/" className="underline underline-offset-4">
          Back to Home
        </Link>
      </AnimatedSpan>
    </Terminal>
  );
}
