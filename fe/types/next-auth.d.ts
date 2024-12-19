import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
      token: string;
      createdAt?: string;
      updatedAt?: string;
      expires?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    token: string;
    expires?: string;
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    token: string;
  }
}
