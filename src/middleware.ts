import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API auth routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // Check if user is authenticated
      if (!session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }

      // Check if user is admin
      if (!session.user.isAdmin) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};