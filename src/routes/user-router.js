import { Router } from "express";
import { getUser, rankingUsers } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/users/me", getUser);
userRouter.get("/ranking", rankingUsers);

export default userRouter;