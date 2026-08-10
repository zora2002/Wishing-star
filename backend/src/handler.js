import serverless from "serverless-http";
import app from "./app.js";

// 之後部署到 AWS Lambda 時，這個 handler 就是 Lambda 的進入點
// API Gateway 收到的請求會被轉成 Express 的 request/response 來處理
// 跟本機開發時執行的是同一份 app.js，邏輯不用重寫
export const handler = serverless(app);
