import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// See src/app/api/onboarding/submit-email/route.ts — same reason this
// proxies through the Next.js server instead of the browser calling
// onboarding-service directly.
const { ONBOARDING_SERVICE_URL } = process.env;

export async function POST(request: NextRequest) {
  try {
    if (!ONBOARDING_SERVICE_URL) {
      console.error("ONBOARDING_SERVICE_URL is not configured");
      return NextResponse.json(
        { error: "Onboarding is not configured" },
        { status: 500 },
      );
    }

    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: "token is required" }, { status: 400 });
    }

    const response = await fetch(`${ONBOARDING_SERVICE_URL}/portal/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = { error: await response.text() };
    }

    return NextResponse.json(data as object, { status: response.status });
  } catch (error) {
    console.error("Error confirming onboarding:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
