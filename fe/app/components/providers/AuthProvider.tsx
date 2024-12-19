"use client";

import { SessionProvider } from "next-auth/react";
import TokenExpireProvider from "./TokenExpireProvider";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <TokenExpireProvider>{children}</TokenExpireProvider>
    </SessionProvider>
  );
}
