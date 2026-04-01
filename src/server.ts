import express from "express";
import morgan from "morgan";
import 'dotenv/config';
import budgetRouter from "./routes/budgetRouter";
import authRouter from "./routes/authRouter";
import { connectDB } from "./config/db";

connectDB();
const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use('/api/budgets', budgetRouter);
app.use('/api/auth', authRouter);

export default app;

// installing jest : npm i -D jest @types/jest ts-jest
// install jest config file : npx ts-jest config:init
