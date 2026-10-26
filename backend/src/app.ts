import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/user.routes";

import { errorHandler } from "./middleware/error-handler";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));

app.use(morgan("dev")); 

app.use(express.json({limit: "1000kb"}));

app.use("/api/health", (req, res) => {
    res.status(200).json( {
        status: "ok",
        timestamp: new Date().toISOString()
    })
});

app.use("/api", userRoutes);

app.use(errorHandler);


export default app;