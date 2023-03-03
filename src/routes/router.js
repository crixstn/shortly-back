import authRouter from "./auth-router.js";
import urlRouter from "./urls-router.js";
import userRouter from "./user-router.js";

function routers(app){
    app.use([authRouter, urlRouter, userRouter]);
}

export default routers;