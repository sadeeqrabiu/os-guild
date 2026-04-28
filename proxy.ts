import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith('/api/auth');
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');

  if (isAuthRoute) {
    return;
  }

  if (isDashboardRoute && !isLoggedIn) {
    return Response.redirect(new URL('/', req.nextUrl));
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
