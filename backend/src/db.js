import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { requireEnv } from "./env.js";

// 有設定 DYNAMODB_ENDPOINT 時，代表要連本機 Docker 裡的 DynamoDB
// 部署到 AWS 之後，只要不設這個環境變數，就會自動改連正式的 DynamoDB
const isLocal = !!process.env.DYNAMODB_ENDPOINT;

const client = new DynamoDBClient({
  region: requireEnv("AWS_REGION"),
  ...(isLocal && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: "local",
      secretAccessKey: "local",
    },
  }),
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TABLE_NAME = requireEnv("TABLE_NAME");
