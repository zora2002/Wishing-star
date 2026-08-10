## 1. 專案初始化

- [x] 1.1 用 `npm create vite@latest . -- --template react` 在 `frontend/` 建立 React + Vite 專案（保留現有的 `openspec/`、`.claude/`、`story.png`）
- [x] 1.2 `npm install`，確認 `npm run dev` 可以正常啟動 Vite 預設頁面
- [x] 1.3 在 `frontend/.gitignore` 加上 `.env`（比照 `backend/.gitignore` 的做法）
- [x] 1.4 建立 `frontend/.env.example`，內容為 `VITE_API_URL=http://localhost:4000`

## 2. API 串接層

- [x] 2.1 建立 `src/api.js`：讀取 `import.meta.env.VITE_API_URL`（未設定時預設 `http://localhost:4000`），組出 `/api/wishes` 網址
- [x] 2.2 實作 `getWishes()`：呼叫 `GET /api/wishes`，回傳願望陣列；非 2xx 時丟出帶錯誤訊息的 Error
- [x] 2.3 實作 `createWish({ name, message })`：呼叫 `POST /api/wishes`，回傳新建立的願望；非 2xx 時讀取回應的 `error` 欄位並丟出 Error

## 3. 畫面元件

- [x] 3.1 建立 `WishBoard.jsx`：依 `story.png` 的星空／天際線卡片樣式，顯示願望列表（姓名 + 內容），列表為空時顯示「還沒有人許願」提示
- [x] 3.2 建立 `WishForm.jsx`：姓名輸入框、願望內容輸入框、送出按鈕（對應 `story.png` 的 name / wish / enter）
- [x] 3.3 `WishForm.jsx` 加上前端驗證：內容空白或超過 200 字時，顯示錯誤提示且不呼叫 API
- [x] 3.4 `WishForm.jsx` 送出中停用按鈕，避免重複送出；送出失敗時顯示後端回傳的錯誤訊息並保留輸入內容
- [x] 3.5 撰寫 `App.css`／各元件樣式，依 `story.png` 呈現圓角卡片、星星裝飾、天際線輪廓
- [x] 3.6 `WishForm.jsx` 姓名輸入框限制最多 10 字（`maxLength` + 前端驗證訊息，超過時不呼叫 API）

## 4. 整合

- [x] 4.1 `App.jsx`：掛載時呼叫 `getWishes()`，管理 `wishes` / `loading` / `error` 狀態，並在讀取失敗時顯示錯誤提示
- [x] 4.2 `App.jsx`：把 `WishBoard` 和 `WishForm` 組起來，`WishForm` 送出成功後，把新願望插入 `wishes` 最前面
- [x] 4.3 更新 `frontend/README.md`（若不存在則新增）：說明如何設定 `.env`、啟動 `npm run dev`，以及需要先啟動 `backend/` 才能正常運作

## 5. 驗證

- [x] 5.1 啟動 `backend/`（`docker compose up -d` + `npm run dev`）與 `frontend/`（`npm run dev`），手動測試：載入頁面看到既有願望
- [x] 5.2 手動測試：填寫姓名與願望送出，畫面即時出現新願望，重新整理後仍看得到（代表真的寫進後端）
- [x] 5.3 手動測試：願望留空送出、輸入超過 200 字送出，畫面出現對應錯誤提示且沒有打 API（可用瀏覽器開發者工具的 Network 面板確認）
- [x] 5.4 手動測試：關掉後端後嘗試送出願望，確認畫面顯示錯誤提示而不是整個頁面壞掉
- [x] 5.5 手動測試：姓名超過 10 字送出，畫面出現對應錯誤提示且沒有打 API
