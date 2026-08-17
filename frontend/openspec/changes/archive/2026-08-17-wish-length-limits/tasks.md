## 1. 前端

- [x] 1.1 `frontend/src/WishForm.jsx`：`MAX_MESSAGE_LENGTH` 改為 20、`MAX_NAME_LENGTH` 改為 6
- [x] 1.2 願望內容 `<input>` 加上 `maxLength={MAX_MESSAGE_LENGTH}`（比照姓名欄位既有寫法）
- [x] 1.3 確認 `validate()` 的錯誤訊息文字反映新的字數上限

## 2. 後端

- [x] 2.1 `backend/src/routes/wishes.js`：願望內容長度檢查改為 20，姓名長度檢查改為 6，錯誤訊息文字同步更新

## 3. 驗證

- [x] 3.1 手動測試：願望內容欄位輸入超過 20 字時無法再輸入
- [x] 3.2 手動測試：姓名欄位輸入超過 6 字時無法再輸入（既有行為，確認新上限生效）
- [x] 3.3 手動測試：直接呼叫 `POST /api/wishes`（略過前端）送出超過 20 字內容或 6 字姓名，確認後端回傳 400 與對應錯誤訊息
