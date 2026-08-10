## Context

`frontend/` 目前只有 OpenSpec 的規劃結構和一張手繪稿 `story.png`，還沒有任何前端程式碼。後端（`backend/`）已經有 `GET/POST /api/wishes`，且已開啟 CORS，前端可以直接跨網域呼叫，不需要 dev server proxy。動機見 proposal.md - Why。

`story.png` 的版面：一張圓角卡片，上半部是星空／天際線的裝飾區塊，下半部一排三個元件：「name」輸入框、「wish」輸入框（較長）、「enter」按鈕。

## Goals / Non-Goals

**Goals:**
- 用最少的依賴把 `story.png` 的版面做出來，並串接既有的 `/api/wishes` API
- 專案結構單純、容易之後擴充（例如換樣式、加動畫）

**Non-Goals:**
- 不做使用者帳號、登入
- 不做願望的編輯／刪除（後端目前也沒有對應的 API）
- 不做前端部署設定（部署方式待後續另開變更規劃）
- 不引入狀態管理套件（Redux/Zustand 等），資料量小，`useState` 就夠

## Decisions

- **Vite + React（JavaScript，不用 TypeScript）**：後端也是純 JavaScript（`type: module`，無 TS），前端維持同樣的語言、降低專案的認知負擔。用 `npm create vite@latest . -- --template react` 建立。
  - 替代方案：`react-ts` 模板 — 型別安全較好，但和後端風格不一致，且此專案規模小，先不用。

- **原生 `fetch` 呼叫 API，不引入 axios**：需求只有 GET/POST 兩個端點，`fetch` 已經夠用，不需要額外依賴。
  - 集中寫一個 `src/api.js`，包裝 `getWishes()` / `createWish({ name, message })`，並統一處理非 2xx 回應（讀 `error` 欄位丟出 Error）。

- **API 網址用 `VITE_API_URL` 環境變數**：對應 spec 的「可設定後端 API 網址」需求。用 `import.meta.env.VITE_API_URL ?? "http://localhost:4000"` 當預設值，開發時建立 `frontend/.env` 覆蓋（不進 git，比照 `backend/.env` 的做法）。

- **元件結構**：
  - `App.jsx`：管理 `wishes`（陣列）、`loading`、`error` 狀態，掛載時呼叫 `getWishes()`
  - `WishBoard.jsx`：星空卡片，接收 `wishes` 顯示清單（對應 `story.png` 上半部）
  - `WishForm.jsx`：`name` / `message` 兩個輸入框 + 送出按鈕（對應 `story.png` 下半部），內部處理表單驗證（空白、超過 200 字）與送出中狀態，送出成功後透過 `onCreated` callback 通知 `App.jsx` 把新願望加進列表最前面
  - 純 CSS（`App.css`），不引入 UI 元件庫，維持 Vite 預設專案的簡單性

- **表單驗證放前端 + 後端各自檢查一次**：前端先擋明顯錯誤（空白、超字數）減少不必要的 API 呼叫，後端仍保留原本的驗證作為最終防線，前端不假設後端一定不會回傳驗證錯誤（送出失敗時一樣要顯示後端回傳的錯誤訊息）。

- **姓名輸入限制 10 字**：呼應 `story.png` 的 name 輸入框比 wish 框窄很多，前端加上 `maxLength` 屬性與送出前驗證；後端 `routes/wishes.js` 也補上對應的長度檢查（超過 10 字回傳 400），跟 `message` 欄位的前後端雙重驗證做法一致。

## Risks / Trade-offs

- [沒有寫死 loading/skeleton 的精緻設計] → 先用簡單的文字狀態（「載入中...」「還沒有人許願」），視覺細節之後可以再迭代，不影響 API 串接的行為契約
- [`fetch` 沒有請求逾時控制] → 目前後端在本機開發環境，逾時風險低；之後部署到正式環境如果發現需要，再另外處理

## Open Questions

- 視覺樣式（顏色、字型、星星動畫效果）目前只依 `story.png` 的線稿做基本呈現，實際美術細節之後可以再調整，不影響本次的規格與任務拆解
