import "dotenv/config";
import app from "./app.js";
import { requireEnv } from "./env.js";

const PORT = requireEnv("PORT");

app.listen(PORT, () => {
  console.log(`許願牆 API 已啟動：http://localhost:${PORT}`);
  console.log(`健康檢查：http://localhost:${PORT}/health`);
});
