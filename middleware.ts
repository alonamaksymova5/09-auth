import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));
  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));

  if (accessToken) {
    if (isPublic) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (refreshToken) {
    const sessionResponse = await checkServerSession();

    if (sessionResponse) {
      const res = NextResponse.next();

      const setCookieHeader = sessionResponse.headers["set-cookie"];
      if (setCookieHeader) {
        setCookieHeader.forEach((cookie) => {
          res.headers.append("set-cookie", cookie);
        });
      }

      return res;
    }

    const res = NextResponse.redirect(new URL("/sign-in", req.url));
    res.cookies.delete("refreshToken");
    return res;
  }

  if (isPrivate) return NextResponse.redirect(new URL("/sign-in", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
