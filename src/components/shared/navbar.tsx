import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/modules/auth/ui/components/user-button";

export default function Navbar() {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-center p-4">
      <div className="flex h-16 w-[90%] items-center justify-between rounded-full border border-white/10  p-2 px-6 backdrop-blur-md md:w-[70%]">
        <div className="flex items-center gap-2">
          <Image
            src="/svg/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="rotate-45"
          />
          <span className="text-3xl tracking-tight">Spectra</span>
        </div>
        <UserButton />
      </div>
    </nav>
  );
}
