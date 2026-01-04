import express, { Router } from "express";
import { UserController } from "../controllers/userController.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import type { AuthRequest } from "../middlewares/auth.middleware.ts";

const userController = new UserController();

const userRouter: Router = express.Router();

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);




// this for testing route protection
userRouter.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json({
    message: "Protected route",
    user: req.user,
  });
});


export { userRouter };