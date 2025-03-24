import { OAuth2Repository } from "../../../../domain/repositories/oauth2.interface";

export class AuthByGoogleUseCase {
  constructor(private oauthRepository: OAuth2Repository) {}
  async execute(token: string) {
    return await this.oauthRepository.verify(token);
  }
}
