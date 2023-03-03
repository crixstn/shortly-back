import { Router } from "express";
import { postUrl, getUrlbyId, openUrl, deleteUrl } from "../controllers/urls.js";
import { urlSchema } from "../schemas/url-schema.js"
import validateSchemas from "../middlewares/schemas-middlware.js";

const urlRouter = Router();

urlRouter.get("/urls/:id", getUrlbyId);
urlRouter.get("/urls/open/:shortUrl", openUrl);
urlRouter.post("/urls/shorten", validateSchemas(urlSchema), postUrl);
urlRouter.delete("/urls/:id", deleteUrl);

export default urlRouter;