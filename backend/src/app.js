import express from "express";
import cors from "cors";
import wishesRouter from "./routes/wishes.js";

const app = express();
// 本機開發沒設這個變數時，允許所有來源方便測試
const allowedOrigin = process.env.ALLOWED_ORIGIN; 
app.use(cors(allowedOrigin ? { origin: allowedOrigin } : {}));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/wishes", wishesRouter);

export default app;
