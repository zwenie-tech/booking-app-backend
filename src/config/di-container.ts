import { PrismaClient } from "@prisma/client";
import { UserRouter } from "../infrastructure/web/v1/routes/user-routes";
import { PrismaUserRepository } from "../infrastructure/database/prisma/repositories/prisma-user-repository";
import { CreateUserUseCase } from "../application/use-cases/user/create-user";
import { UserController } from "../infrastructure/web/v1/controllers/user-controller";
import { AuthController } from "../infrastructure/web/v1/controllers/auth-controller";
import { GetUserUseCase } from "../application/use-cases/user/get-user";
import { AuthRouter } from "../infrastructure/web/v1/routes/auth-routes";

export class DiContainer {
  private static instance: DiContainer;
  private userRoutes: UserRouter;
  private authRoutes: AuthRouter;

  private constructor() {
    const prisma = new PrismaClient();
    const userRepository = new PrismaUserRepository(prisma);

    // Use cases
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const getUserUseCase = new GetUserUseCase(userRepository);
    // const updateUserUseCase = new UpdateUserUseCase(userRepository);
    // const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    // Controllers
    const userController = new UserController(createUserUseCase);
    const authController = new AuthController(getUserUseCase, createUserUseCase)

    // Routers
    this.userRoutes = new UserRouter(userController);
    this.authRoutes = new AuthRouter(authController);
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
}
