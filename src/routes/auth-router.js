import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";
import validateSchemas from "../middlewares/schemas-middlware.js";
import { signUpSchema, loginSchema } from "../schemas/auth-schema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemas(signUpSchema), signUp);
authRouter.post("/signin", validateSchemas(loginSchema), login);

export default authRouter;