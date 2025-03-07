export interface OAuth2Repository {
  verify(token: string): Promise<{
    sub: string;
    email: string;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    profile?: string;
  } | null>;
}
