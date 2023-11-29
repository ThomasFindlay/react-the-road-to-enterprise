import { type NextRequest, NextResponse } from "next/server";

const isLoggedIn = (req: NextRequest) => {
  return true;
};

const isAdmin = (req: NextRequest) => {
  return true;
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // This logic is only applied to /admin
    if (!isLoggedIn(req) && !isAdmin(req)) {
      return NextResponse.redirect(`${req.nextUrl.origin}/forbidden`);
    }
  }

  return NextResponse.next();
}
