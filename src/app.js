import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routes/router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
routers(app);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server running in port: ${port}`)
})