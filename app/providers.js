"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
