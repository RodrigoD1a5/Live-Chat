import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const session = cookies().get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: "/room",
};
