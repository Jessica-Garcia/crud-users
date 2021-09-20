import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/session', authenticateUserController.handle);

export { authenticateRoutes };