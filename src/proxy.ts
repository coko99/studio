import { NextResponse, type NextRequest } from "next/server";
import { COMING_SOON } from "@/lib/coming-soon";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    COMING_SOON &&
    !pathname.startsWith("/admin") &&
    pathname !== "/uskoro"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/uskoro";
    return NextResponse.rewrite(url);
  }

  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
