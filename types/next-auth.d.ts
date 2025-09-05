import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      tenantId: string ;
    };
  }

  interface User {
    id: string;
    email?: string | null;
    name?: string | null;
    tenantId: string ;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    tenantId: string;
  }
}
