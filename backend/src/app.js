import express from "express";
import cors from "cors";
import wishesRouter from "./routes/wishes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/wishes", wishesRouter);

export default app;
