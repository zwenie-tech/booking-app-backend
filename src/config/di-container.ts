import { PrismaClient } from "@prisma/client";
import { UserRouter } from "../infrastructure/web/routes/user-routes";
import { PrismaUserRepository } from "../infrastructure/database/prisma/repositories/prisma-user-repository";
import { CreateUserUseCase } from "../application/use-cases/user/create-user";
import { UserController } from "../infrastructure/web/controllers/user-controller";

export class DiContainer {
    private static instance: DiContainer;
    private userRoutes: UserRouter;

    private constructor() {
        const prisma = new PrismaClient();
        const userRepository = new PrismaUserRepository(prisma);

        const createUserUseCase = new CreateUserUseCase(userRepository);
        // const getUserUseCase = new GetUserUseCase(userRepository);
        // const updateUserUseCase = new UpdateUserUseCase(userRepository);
        // const deleteUserUseCase = new DeleteUserUseCase(userRepository);

        const userController = new UserController(createUserUseCase);

        this.userRoutes = new UserRouter(userController);
    }

    public static getInstance(): DiContainer {
        if(!DiContainer.instance) {
            DiContainer.instance = new DiContainer();
        }
        return DiContainer.instance;
    }

    public getUserRoutes() : UserRouter {
        return this.userRoutes;
    }
}