import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret-key";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const response = NextResponse.json(
      {
        user: {
          name: `${decoded.firstName} ${decoded.lastName}`,
          email: decoded.email,
          picture: decoded.image,
          role: decoded.role,
        },
      },
      { status: 200 }
    );

    return response;
  } catch (error) {
    console.error("Test server error:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
