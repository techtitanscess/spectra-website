import React from "react";
import { SignInForm } from "../components/sign-in-form";

export default function SignInView() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 md:p-8">
      <SignInForm />
    </div>
  );
}
