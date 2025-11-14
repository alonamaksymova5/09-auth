import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (refreshToken) {
    const session = await checkServerSession();

    if (!session) {
      cookieStore.delete("refreshToken");

      if (isPublicRoute) return NextResponse.next();
      if (isPrivateRoute)
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    if (session) {
      const setCookie = session.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
        }
      }
    }

    if (isPublicRoute) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.next();
  if (isPrivateRoute)
    return NextResponse.redirect(new URL("/sign-in", req.url));
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};
