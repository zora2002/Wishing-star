## Why

願望以星星卡片的形式呈現在夜空面板上，卡片空間有限；目前 200 字的願望內容與 10 字的姓名上限太寬鬆，容易讓星星懸浮文字過長、破壞版面。將上限收緊為願望內容 20 字、姓名 6 字，讓每則願望更精簡、卡片呈現更一致。

## What Changes

- 願望內容上限從 200 字調整為 20 字，姓名上限從 10 字調整為 6 字
- 前端願望內容輸入欄位新增 `maxLength={20}`，與姓名欄位一樣在輸入當下就擋住超長輸入（姓名欄位已有 `maxLength`，這次只是把新上限套用上去）
- 前端送出前的驗證訊息（`WishForm.jsx` 的 `validate()`）改用新的字數上限與對應提示文字
- 後端 `POST /api/wishes`（`wishes.js`）的驗證數字同步改為 20 / 6，繼續以 `.length`（字元數）計算，不改變計算方式
- 更新 `wishing-wall-ui` spec 中「願望內容超過長度限制」「姓名超過長度限制」兩個 Scenario 的具體數字

## Capabilities

### New Capabilities
（無）

### Modified Capabilities
- `wishing-wall-ui`: 「提交新願望」需求下的長度限制數字由 200/10 字調整為 20/6 字，並新增願望內容欄位輸入時即被截斷（`maxLength`）的行為

## Impact

- 前端：`frontend/src/WishForm.jsx`（驗證常數、錯誤訊息、輸入框 `maxLength`）
- 後端：`backend/src/routes/wishes.js`（POST 驗證數字與錯誤訊息）
- 不影響 API 回應格式、資料庫結構或既有願望資料
