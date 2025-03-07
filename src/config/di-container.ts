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
import { UserLogoutUseCase } from "../application/use-cases/auth/user/user-logout";
import { UserAccessTokenUseCase } from "../application/use-cases/auth/user/user-access-token";
import { HostLoginUseCase } from "../application/use-cases/auth/host/host-login";
import { HostLogoutUseCase } from "../application/use-cases/auth/host/host-logout";
import { HostRefreshTokenUseCase } from "../application/use-cases/auth/host/host-access-token";
import { AuthMiddleware } from "../infrastructure/web/v1/middlewares/auth";
import { UserTokenService } from "../infrastructure/services/jwt/user-token-service";
import { HostTokenService } from "../infrastructure/services/jwt/host-token-service";
import { FileRouter } from "../infrastructure/web/v1/routes/file-routes";
import { FileController } from "../infrastructure/web/v1/controllers/file-controller";
import { FileUploader } from "./multer";
import { UploadFileUseCase } from "../application/use-cases/storage/upload-file";
import { S3ObjectStoreService } from "../infrastructure/storage/s3-storage";
import { OrganizerRoutes } from "../infrastructure/web/v1/routes/organizer-routes";
import { PrismaOrganizerRepository } from "../infrastructure/database/prisma/repositories/prisma-organizer-repository";
import { CreateOrganizationUseCase } from "../application/use-cases/organizer/create-organizer";
import { OrganizerController } from "../infrastructure/web/v1/controllers/organizer-controller";
import { UpdateHostUseCase } from "../application/use-cases/host/update-host";
import { AuthByGoogleUseCase } from "../application/use-cases/auth/common/auth-by-google";
import { GoogleAuthService } from "../infrastructure/services/google/google-auth-service";
import { OAuth2Client } from "google-auth-library";

export class DiContainer {
  private static instance: DiContainer;
  private userRoutes: UserRouter;
  private authRoutes: AuthRouter;
  private hostRoutes: HostRouter;
  private fileRoutes: FileRouter;
  private organizerRoutes: OrganizerRoutes;

  private constructor() {
    const prisma = new PrismaClient();
    const oauth2Client = new OAuth2Client();

    // Prisma Repositories
    const userRepository = new PrismaUserRepository(prisma);
    const hostRepository = new PrismaHostRepository(prisma);
    const hostTokenRepository = new PrismaHostTokenRepository(prisma);
    const userTokenRepository = new PrismaUserTokenRepository(prisma);
    const organizerRepository = new PrismaOrganizerRepository(prisma);

    // Service repository
    const userTokenServiceRepository = new UserTokenService(
      userTokenRepository
    );
    const hostTokenServiceRepository = new HostTokenService(
      hostTokenRepository
    );
    const oauthRepository = new GoogleAuthService(oauth2Client);

    // Storage repository
    const storageRepository = new S3ObjectStoreService();

    // Use cases
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const createHostUseCase = new CreateHostUseCase(hostRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);
    const userLoginUseCase = new UserLoginUseCase(userTokenServiceRepository);
    const userLogoutUseCase = new UserLogoutUseCase(userTokenServiceRepository);
    const userAccessTokenUseCase = new UserAccessTokenUseCase(
      userTokenServiceRepository
    );
    const getHostUseCase = new GetHostUseCase(hostRepository);
    const hostLoginUseCase = new HostLoginUseCase(hostTokenServiceRepository);
    const hostLogoutUseCase = new HostLogoutUseCase(hostTokenServiceRepository);
    const hostRefreshTokenUseCase = new HostRefreshTokenUseCase(
      hostTokenServiceRepository
    );
    const fileUploadUseCase = new UploadFileUseCase(storageRepository);
    const createOrganizerUseCase = new CreateOrganizationUseCase(
      organizerRepository
    );
    const updateHostUseCase = new UpdateHostUseCase(hostRepository);
    const authByGoogleUseCase = new AuthByGoogleUseCase(oauthRepository);

    // Controllers
    const userController = new UserController(
      createUserUseCase,
      userLoginUseCase,
      getUserUseCase
    );
    const authController = new AuthController(
      getUserUseCase,
      userLoginUseCase,
      userLogoutUseCase,
      userAccessTokenUseCase,
      getHostUseCase,
      hostLoginUseCase,
      hostLogoutUseCase,
      hostRefreshTokenUseCase,
      authByGoogleUseCase
    );
    const hostController = new HostController(
      createHostUseCase,
      hostLoginUseCase,
      getHostUseCase
    );
    const fileController = new FileController(fileUploadUseCase);
    const organizerController = new OrganizerController(
      createOrganizerUseCase,
      updateHostUseCase
    );

    // Middleware
    const authMiddleware = new AuthMiddleware(
      hostTokenServiceRepository,
      userTokenServiceRepository
    );
    const fileUploader = new FileUploader();

    // Routers
    this.userRoutes = new UserRouter(userController, authMiddleware);
    this.authRoutes = new AuthRouter(authController, authMiddleware);
    this.hostRoutes = new HostRouter(hostController, authMiddleware);
    this.fileRoutes = new FileRouter(
      authMiddleware,
      fileController,
      fileUploader
    );
    this.organizerRoutes = new OrganizerRoutes(
      organizerController,
      authMiddleware
    );
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

  public getFileRoutes(): FileRouter {
    return this.fileRoutes;
  }

  public getOrganizerRoutes(): OrganizerRoutes {
    return this.organizerRoutes;
  }
}
