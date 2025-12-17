import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("auth_token")?.value;

  // COOP/COEP headers for login page
  if (url.pathname.startsWith("/member-login")) {
    const res = NextResponse.next();
    res.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.headers.set("Cross-Origin-Embedder-Policy", "unsafe-none");
    return res;
  }

  if (url.pathname.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/member-login";
      return NextResponse.redirect(url);
    }

    try {
      type Decoded = { role?: string } | null;
      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

      const role = decoded?.role;

      if (url.pathname.startsWith("/dashboard") && role !== "admin") {
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      if (url.pathname.startsWith("/dashboard") && role === "admin") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch {
      // Token expired or invalid
      url.pathname = "/member-login";
      return NextResponse.redirect(url);
    }
  }

  if (url.pathname.startsWith("/profile")) {
    if (!token) {
      url.pathname = "/member-login";
      return NextResponse.redirect(url);
    }
    try {
      type Decoded = { role?: string } | null;
      const decoded = jwt.verify(token, JWT_SECRET) as Decoded;
      const role = decoded?.role;

      if (["admin", "member"].includes(role ?? "")) {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch {
      // Token expired or invalid
      url.pathname = "/member-login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/member-login/:path*", "/dashboard/:path*"],
};
