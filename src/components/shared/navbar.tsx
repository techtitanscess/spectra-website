import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "@/modules/auth/ui/components/user-button";
import AdminOnly from "@/components/auth/admin-only";
import { Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed z-50 flex w-full items-center justify-center p-4">
      <div className="flex h-16 w-[90%] items-center justify-between rounded-full border border-white/10  p-2 px-6 backdrop-blur-md md:w-[70%]">
        <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src="/svg/logo.svg"
            alt="logo"
            width={32}
            height={32}
            className="rotate-45"
          />
          <span className="text-3xl md:flex hidden tracking-tight">Spectra</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* Admin Panel Link - Only visible to admins */}
          <AdminOnly>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </AdminOnly>
          
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
