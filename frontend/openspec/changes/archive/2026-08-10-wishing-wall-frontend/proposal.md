## Why

目前只有後端 API（`backend/`），沒有任何前端可以讓使用者實際許願、看到許願牆上的內容。需要一個 React + Vite 前端，串接既有的 `/api/wishes` API，把 `story.png` 手繪稿的介面實作出來。

## What Changes

- 新增 `frontend/` 下的 React + Vite 專案（目前 `frontend/` 只有 OpenSpec 結構，尚無任何前端程式碼）
- 實作許願牆頁面：星空／天際線背景卡片 + 底下一排「姓名」「願望」輸入框與「送出」按鈕（依 `story.png`）
- 頁面載入時呼叫 `GET /api/wishes` 顯示目前所有願望
- 送出時呼叫 `POST /api/wishes`，成功後把新願望加進畫面、清空輸入框
- 處理 API 錯誤情境（願望空白、超過 200 字、伺服器錯誤）並顯示提示訊息
- 透過環境變數（`VITE_API_URL`）設定後端 API 網址，本機開發預設打 `http://localhost:4000`

## Capabilities

### New Capabilities
- `wishing-star-ui`: 前端頁面 — 顯示願望列表、提交新願望的表單，串接 `/api/wishes` GET/POST

### Modified Capabilities
(無，後端 API 行為不變)

## Impact

- 新增程式碼：`frontend/` 底下的 Vite 專案（`src/`、`index.html`、`package.json` 等）
- 依賴新增：react、react-dom、vite（開發依賴）
- 串接對象：`backend/src/routes/wishes.js` 現有的 `GET /api/wishes`、`POST /api/wishes`（欄位：`message`、`name`，回傳 `id`、`message`、`name`、`createdAt`）
- 不影響 `backend/` 既有程式碼
