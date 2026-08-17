import { Router } from "express";
import { randomUUID } from "crypto";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../db.js";

const router = Router();

// GET /api/wishes - 取得所有願望，新的排在最前面
router.get("/", async (req, res) => {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName: TABLE_NAME })
    );
    const wishes = (result.Items || []).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(wishes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "讀取願望失敗" });
  }
});

// POST /api/wishes - 新增一則願望
router.post("/", async (req, res) => {
  const { message, name } = req.body ?? {};

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "願望內容不能是空的" });
  }
  if (message.length > 20) {
    return res.status(400).json({ error: "願望內容太長了（最多 20 字）" });
  }
  if (name && name.trim().length > 6) {
    return res.status(400).json({ error: "姓名太長了（最多 6 字）" });
  }

  const wish = {
    id: randomUUID(),
    message: message.trim(),
    name: name?.trim() || "匿名的小生物",
    createdAt: new Date().toISOString(),
  };

  try {
    await docClient.send(
      new PutCommand({ TableName: TABLE_NAME, Item: wish })
    );
    res.status(201).json(wish);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "新增願望失敗" });
  }
});

export default router;
