import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";
import { postUrl } from "../controllers/urls.js";
import validateSchemas from "../middlewares/schemas-middlware.js";
import { signUpSchema, loginSchema } from "../schemas/auth-schema.js";
import { urlSchema } from "../schemas/url-schema.js"

const router = Router();

router.post("/signup", validateSchemas(signUpSchema), signUp);
router.post("/signin", validateSchemas(loginSchema), login);

router.post("/urls/shorten", validateSchemas(urlSchema), postUrl);

export default router;