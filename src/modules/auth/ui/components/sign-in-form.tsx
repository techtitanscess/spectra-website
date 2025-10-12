import { Input } from "@/components/ui/input";
import { FaTerminal } from "react-icons/fa6";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SignInForm() {
  return (
    <Terminal className="h-fit w-[90%] md:w-[40%]">
      <TypingAnimation>$ bunx @spectra/auth authenticate</TypingAnimation>

      <AnimatedSpan className="text-destructive">
        ✖ Required: email_address & password.
      </AnimatedSpan>

      <div className="my-4 flex flex-col gap-3">
        <div>
          <AnimatedSpan className="text-primary text-base">
            ? Enter email_address:
          </AnimatedSpan>

          <AnimatedSpan className="flex items-center gap-2">
            <FaTerminal />
            <Input type="email" />
          </AnimatedSpan>
        </div>
        <div>
          <AnimatedSpan className="text-primary text-base">
            ? Enter password:
          </AnimatedSpan>

          <AnimatedSpan className="flex items-center gap-2">
            <FaTerminal />
            <Input type="password" />
          </AnimatedSpan>
        </div>
      </div>

      <AnimatedSpan>
        <Button variant="outline" className="my-2 w-full">
          sudo signIn()
        </Button>
      </AnimatedSpan>

      <TypingAnimation className="text-muted-foreground">
        Other useful commands:
      </TypingAnimation>

      <AnimatedSpan className="text-primary my-1">
        <Link href="/sign-up" className="underline underline-offset-4">
          $ sudo sign-up
        </Link>
      </AnimatedSpan>
      <AnimatedSpan className="text-primary">
        <Link href="/" className="underline underline-offset-4">
          $ sudo homepage
        </Link>
      </AnimatedSpan>
    </Terminal>
  );
}
