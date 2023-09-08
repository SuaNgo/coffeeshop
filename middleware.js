export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/settings/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/orders/:path*",
  ],
};
