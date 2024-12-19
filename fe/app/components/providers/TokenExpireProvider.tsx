"use client";
import { signOut, useSession } from "next-auth/react";

const TokenExpireProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  //@ts-ignore
  if (session?.expires < Date.now()) {
    signOut({
      redirect: false,
    }).then(() => {
      window.location.reload();
    });
  }

  return <>{children}</>;
};

export default TokenExpireProvider;
