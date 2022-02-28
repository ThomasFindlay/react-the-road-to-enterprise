import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

const isLoggedIn = (req: NextRequest) => {
  return true;
};

const isAdmin = (req: NextRequest) => {
  return true;
};

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (!isLoggedIn(req) && !isAdmin(req)) {
    return NextResponse.redirect(`${req.nextUrl.origin}/forbidden`);
  }

  return NextResponse.next();
}
