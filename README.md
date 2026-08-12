# Wishing Star

一個許願牆專案，包含 React 前端和 Express + DynamoDB 後端 API。

## 資料夾結構

```
wishing-star/
├── frontend/     ← React 專案
├── backend/      ← Express API（本機開發用 DynamoDB Local，之後部署到 AWS Lambda + DynamoDB）
└── README.md     ← 這份文件
```

## 怎麼跑起來

兩邊是各自獨立的專案，分開啟動：

1. **後端**：進入 [backend/](backend/) 資料夾，依照 [backend/README.md](backend/README.md) 的步驟啟動，預設會跑在 `http://localhost:4000`
2. **前端**：進入 `frontend/` 資料夾，依照該專案自己的說明啟動（尚未建立）

啟動順序建議先把後端跑起來，前端才能正常打 API。

## 部署

- 後端之後會部署到 AWS Lambda + 正式 DynamoDB，細節見 [backend/README.md](backend/README.md)
- 前端部署方式待補
