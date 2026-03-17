import { NextRequest, NextResponse } from "next/server";

const AUTH_CHECK_URL = process.env.NOSTR_AUTH_CHECK_URL;
const AUTH_APP_URL = process.env.NOSTR_AUTH_APP_URL;
const AUTH_HEADER_PREFIX = "x-nostr-auth-";
const SESSION_COOKIE_NAME = "osg_nostr_session";

function buildLoginRedirect(request: NextRequest): string {
  const appURL = AUTH_APP_URL?.trim();
  if (!appURL) {
    throw new Error(
      "NOSTR_AUTH_APP_URL is required when protecting Next.js routes",
    );
  }

  const redirect = encodeURIComponent(request.nextUrl.toString());
  return `${appURL.replace(/\/$/, "")}/?redirect=${redirect}`;
}

function collectIdentityHeaders(response: Response): Record<string, string> {
  const identity: Record<string, string> = {};

  for (const [key, value] of response.headers.entries()) {
    const lowerKey = key.toLowerCase();
    if (
      lowerKey === "remote-user" ||
      lowerKey.startsWith("x-auth-request-") ||
      lowerKey.startsWith("x-forwarded-user") ||
      lowerKey.startsWith("x-forwarded-groups") ||
      lowerKey.startsWith("remote-user-")
    ) {
      identity[lowerKey] = value;
    }
  }

  return identity;
}

function applyIdentityHeaders(
  request: NextRequest,
  identity: Record<string, string>,
): NextResponse {
  const requestHeaders = new Headers(request.headers);

  for (const [key, value] of Object.entries(identity)) {
    requestHeaders.set(`${AUTH_HEADER_PREFIX}${key}`, value);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export async function proxy(request: NextRequest) {
  const checkURL = AUTH_CHECK_URL?.trim();
  if (!checkURL) {
    throw new Error(
      "NOSTR_AUTH_CHECK_URL is required when protecting Next.js routes",
    );
  }

  const forwardedProto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const forwardedHost =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;
  const forwardedUri = `${request.nextUrl.pathname}${request.nextUrl.search}`;

  const response = await fetch(checkURL, {
    method: "GET",
    headers: {
      accept: request.headers.get("accept") ?? "text/html,*/*",
      cookie: request.headers.get("cookie") ?? "",
      "x-forwarded-proto": forwardedProto,
      "x-forwarded-host": forwardedHost,
      "x-forwarded-uri": forwardedUri,
      "x-original-method": request.method,
      "x-original-url": request.nextUrl.toString(),
    },
    redirect: "manual",
    cache: "no-store",
  });

  if (response.status === 401) {
    const redirectResponse = NextResponse.redirect(buildLoginRedirect(request));
    redirectResponse.cookies.delete(SESSION_COOKIE_NAME);
    return redirectResponse;
  }

  if (response.status === 403) {
    const forbiddenResponse = new NextResponse("Forbidden", { status: 403 });
    forbiddenResponse.cookies.delete(SESSION_COOKIE_NAME);
    return forbiddenResponse;
  }

  if (!response.ok) {
    return new NextResponse("Authentication service unavailable", {
      status: 502,
    });
  }

  const identity = collectIdentityHeaders(response);
  const nextResponse = applyIdentityHeaders(request, identity);
  nextResponse.cookies.set(SESSION_COOKIE_NAME, JSON.stringify(identity), {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return nextResponse;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
