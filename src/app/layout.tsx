import "./globals.css";
import type { Metadata } from "next";

import { appFont } from "@/components/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "Spectra",
  description: "spectra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={appFont.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
