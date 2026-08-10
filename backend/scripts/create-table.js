import "dotenv/config";
import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} from "@aws-sdk/client-dynamodb";
import { requireEnv } from "../src/env.js";

const client = new DynamoDBClient({
  region: requireEnv("AWS_REGION"),
  endpoint: requireEnv("DYNAMODB_ENDPOINT"),
  credentials: { accessKeyId: "local", secretAccessKey: "local" },
});

const TABLE_NAME = requireEnv("TABLE_NAME");

async function main() {
  const { TableNames } = await client.send(new ListTablesCommand({}));

  if (TableNames.includes(TABLE_NAME)) {
    console.log(`資料表 "${TABLE_NAME}" 已經存在，略過建立`);
    return;
  }

  await client.send(
    new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      BillingMode: "PAY_PER_REQUEST",
    })
  );

  console.log(`資料表 "${TABLE_NAME}" 建立完成！`);
}

main().catch((err) => {
  console.error("建立資料表失敗：", err.message);
  console.error("提醒：請先確認 docker compose up 已經跑起來");
  process.exit(1);
});
