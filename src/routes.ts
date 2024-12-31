import { Router, Request, Response } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/login-controller";

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.post("/user", userController.createUser);
router.get("/user", userController.getUser);
router.delete("/user", userController.deleteUser);
router.post("/login", loginController.login);
