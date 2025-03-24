import { OAuth2Client } from "google-auth-library";
import { OAuth2Repository } from "../../../domain/repositories/oauth2.interface";

export class GoogleAuthService implements OAuth2Repository {
  constructor(private oauth2Client: OAuth2Client) {
    this.oauth2Client = new OAuth2Client();
  }
  async verify(token: string): Promise<{
    sub: string;
    email: string;
    isVerified: boolean;
    firstName: string;
    lastName: string;
    profile?: string;
  } | null> {
    const ticket = await this.oauth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload) {
      const {
        sub,
        email,
        email_verified,
        picture,
        given_name,
        family_name,
      } = payload;
      return {
        sub: sub!,
        email: email!,
        isVerified: email_verified!,
        firstName: given_name!,
        lastName: family_name!,
        profile: picture!,
      };
    } else {
      return null;
    }
  }
}
