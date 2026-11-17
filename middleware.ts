import { NextRequest, NextResponse } from "next/server";

const SHOP_ORIGIN = "https://shop.dennis-schwarz.dev";
const DASHBOARD_ORIGIN = "https://dashboard.dennis-schwarz.dev";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/healthz") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const rawHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const host = rawHost.split(",")[0].trim().toLowerCase();
  const rawProto = request.headers.get("x-forwarded-proto") || "https";
  const proto = rawProto.split(",")[0].trim().toLowerCase();

  const isDashboardHost =
    host.startsWith("dashboard.") || host.startsWith("admin.");
  const isShopHost = host.startsWith("shop.");

  if (isDashboardHost) {
    const currentOrigin = `${proto}://${host}`;

    if (pathname === "/" || pathname === "/dashboard") {
      return NextResponse.redirect(`${currentOrigin}/overview${search}`);
    }
    if (pathname === "/dashboard/analytics") {
      return NextResponse.redirect(`${currentOrigin}/analytics${search}`);
    }
    if (pathname === "/dashboard/inventory") {
      return NextResponse.redirect(`${currentOrigin}/inventory${search}`);
    }

    if (pathname === "/overview") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/dashboard";
      return NextResponse.rewrite(rewriteUrl);
    }
    if (pathname === "/analytics") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/dashboard/analytics";
      return NextResponse.rewrite(rewriteUrl);
    }
    if (pathname === "/inventory") {
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = "/dashboard/inventory";
      return NextResponse.rewrite(rewriteUrl);
    }

    // Redirect accidental storefront paths on dashboard subdomain to shop subdomain
    if (
      pathname === "/products" ||
      pathname.startsWith("/products/") ||
      pathname === "/cart" ||
      pathname === "/architecture"
    ) {
      return NextResponse.redirect(`${SHOP_ORIGIN}${pathname}${search}`);
    }

    return NextResponse.next();
  }

  if (isShopHost) {
    if (pathname === "/dashboard" || pathname === "/overview") {
      return NextResponse.redirect(`${DASHBOARD_ORIGIN}/overview${search}`);
    }
    if (pathname === "/dashboard/analytics" || pathname === "/analytics") {
      return NextResponse.redirect(`${DASHBOARD_ORIGIN}/analytics${search}`);
    }
    if (pathname === "/dashboard/inventory" || pathname === "/inventory") {
      return NextResponse.redirect(`${DASHBOARD_ORIGIN}/inventory${search}`);
    }

    return NextResponse.next();
  }

  if (pathname === "/overview") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/dashboard";
    return NextResponse.rewrite(rewriteUrl);
  }
  if (pathname === "/analytics") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/dashboard/analytics";
    return NextResponse.rewrite(rewriteUrl);
  }
  if (pathname === "/inventory") {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = "/dashboard/inventory";
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|api|healthz).*)",
  ],
};
