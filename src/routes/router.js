import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";
import { validateSignUp, validateLogin } from "../middlewares/auth-middlware.js";

const router = Router();

router.post("/signup", validateSignUp, signUp);
router.post("/signin", validateLogin, login);

export default router;