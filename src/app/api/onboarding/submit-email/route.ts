import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// onboarding-service has no public DNS/ingress (internal Docker network
// only) — this route runs on the Next.js server, which CAN reach it, and
// proxies for the browser, which can't. See onboarding-service-plan.md.
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

    const { token, kth_email } = await request.json();
    if (!token || !kth_email) {
      return NextResponse.json(
        { error: "token and kth_email are required" },
        { status: 400 },
      );
    }

    const response = await fetch(`${ONBOARDING_SERVICE_URL}/portal/submit-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, kth_email }),
    });

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = { error: await response.text() };
    }

    return NextResponse.json(data as object, { status: response.status });
  } catch (error) {
    console.error("Error submitting onboarding email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
