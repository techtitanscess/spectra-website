import { codeFont } from "@/components/fonts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import SignInForm from "@/modules/auth/ui/components/sign-in-form";
import Link from "next/link";

export default function SignInView() {
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
            Don&#39;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-primary underline underline-offset-4 hover:underline-offset-8 duration-200"
            >
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
