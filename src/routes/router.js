import { Router } from "express";
import { signUp, login } from "../controllers/auth.js";
import { postUrl, getUrlbyId, openUrl, deleteUrl } from "../controllers/urls.js";
import validateSchemas from "../middlewares/schemas-middlware.js";
import { signUpSchema, loginSchema } from "../schemas/auth-schema.js";
import { urlSchema } from "../schemas/url-schema.js"

const router = Router();

router.post("/signup", validateSchemas(signUpSchema), signUp);
router.post("/signin", validateSchemas(loginSchema), login);

router.get("/urls/:id", getUrlbyId);
router.get("/urls/open/:shortUrl", openUrl);
router.post("/urls/shorten", validateSchemas(urlSchema), postUrl);
router.delete("/urls/:id", deleteUrl);

export default router;