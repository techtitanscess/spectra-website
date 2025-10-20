import { codeFont } from "@/components/fonts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignUpForm from "@/modules/auth/ui/components/sign-up-form";
import Link from "next/link";

export default function SignUpView() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="bg-background w-[90%] md:w-[40%] border-b-2 border-b-primary">
        <CardHeader>
          <CardTitle
            className={cn(
              codeFont.className,
              "text-4xl font-semibold tracking-tight text-primary"
            )}
          >
            Spectra
          </CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-primary underline underline-offset-4 hover:underline-offset-8 duration-200"
            >
              Sign In
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
