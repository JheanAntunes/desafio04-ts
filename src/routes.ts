import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/login-controller";
import { verifyAuth } from "./midlleware/verify-auth";

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post("/user", userController.createUser);
router.get("/user/:id", verifyAuth, userController.getUser);
router.delete("/user", userController.deleteUser);
router.post("/login", loginController.login);
