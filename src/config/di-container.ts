import { PrismaClient } from "@prisma/client";
import { UserRouter } from "../infrastructure/web/v1/routes/user-routes";
import { PrismaUserRepository } from "../infrastructure/database/prisma/repositories/prisma-user-repository";
import { CreateUserUseCase } from "../application/use-cases/user/create-user";
import { UserController } from "../infrastructure/web/v1/controllers/user-controller";
import { AuthController } from "../infrastructure/web/v1/controllers/auth-controller";
import { GetUserUseCase } from "../application/use-cases/user/get-user";
import { AuthRouter } from "../infrastructure/web/v1/routes/auth-routes";
import { PrismaHostTokenRepository } from "../infrastructure/database/prisma/repositories/prisma-host-token.repository";
import { PrismaHostRepository } from "../infrastructure/database/prisma/repositories/prisma-host-repository";
import { PrismaUserTokenRepository } from "../infrastructure/database/prisma/repositories/prisma-user-token-repository";
import { CreateHostUseCase } from "../application/use-cases/host/create-host";
import { HostController } from "../infrastructure/web/v1/controllers/host-controller";
import { HostRouter } from "../infrastructure/web/v1/routes/host-routes";
import { GetHostUseCase } from "../application/use-cases/host/get-host";
import { UserLoginUseCase } from "../application/use-cases/auth/user/user-login";
import { UserTokenService } from "../infrastructure/services/user-token-service";
import { HostTokenService } from "../infrastructure/services/host-token-service";
import { UserLogoutUseCase } from "../application/use-cases/auth/user/user-logout";
import { UserRefreshTokenUseCase } from "../application/use-cases/auth/user/user-refresh-token";
import { HostLoginUseCase } from "../application/use-cases/auth/host/host-login";
import { HostLogoutUseCase } from "../application/use-cases/auth/host/host-logout";
import { HostRefreshTokenUseCase } from "../application/use-cases/auth/host/host-refresh-token";

export class DiContainer {
  private static instance: DiContainer;
  private userRoutes: UserRouter;
  private authRoutes: AuthRouter;
  private hostRoutes: HostRouter;

  private constructor() {
    const prisma = new PrismaClient();

    // Prisma Repositories
    const userRepository = new PrismaUserRepository(prisma);
    const hostRepository = new PrismaHostRepository(prisma);
    const hostTokenRepository = new PrismaHostTokenRepository(prisma);
    const userTokenRepository = new PrismaUserTokenRepository(prisma);

    // Service repository
    const userTokenServiceRepository = new UserTokenService(
      userTokenRepository
    );
    const hostTokenServiceRepository = new HostTokenService(
      hostTokenRepository
    );

    // Use cases
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createHostUseCase = new CreateHostUseCase(hostRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);
    const userLoginUseCase = new UserLoginUseCase(userTokenServiceRepository);
    const userLogoutUseCase = new UserLogoutUseCase(userTokenServiceRepository);
    const userRefreshTokenUseCase = new UserRefreshTokenUseCase(
      userTokenServiceRepository
    );
    const getHostUseCase = new GetHostUseCase(hostRepository);
    const hostLoginUseCase = new HostLoginUseCase(hostTokenServiceRepository);
    const hostLogoutUseCase = new HostLogoutUseCase(hostTokenServiceRepository);
    const hostRefreshTokenUseCase = new HostRefreshTokenUseCase(
      hostTokenServiceRepository
    );

    // Controllers
    const userController = new UserController(
      createUserUseCase,
      userLoginUseCase
    );
    const authController = new AuthController(
      getUserUseCase,
      userLoginUseCase,
      userLogoutUseCase,
      userRefreshTokenUseCase,
      getHostUseCase,
      hostLoginUseCase,
      hostLogoutUseCase,
      hostRefreshTokenUseCase
    );
    const hostController = new HostController(
      createHostUseCase,
      hostLoginUseCase
    );

    // Routers
    this.userRoutes = new UserRouter(userController);
    this.authRoutes = new AuthRouter(authController);
    this.hostRoutes = new HostRouter(hostController);
  }

  public static getInstance(): DiContainer {
    if (!DiContainer.instance) {
      DiContainer.instance = new DiContainer();
    }
    return DiContainer.instance;
  }

  public getUserRoutes(): UserRouter {
    return this.userRoutes;
  }

  public getAuthRoutes(): AuthRouter {
    return this.authRoutes;
  }

  public getHostRoutes(): HostRouter {
    return this.hostRoutes;
  }
}
