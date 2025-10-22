"use client";

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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SignInView() {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is already signed in, redirect to home page
    if (session?.user && !isLoading) {
      router.push("/");
    }
  }, [session, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="bg-background w-[90%] md:w-[40%] border-b-2 border-b-primary">
          <CardHeader>
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user is signed in, don't render the form (redirect will happen)
  if (session?.user) {
    return null;
  }

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
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              Spectra
            </Link>
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
