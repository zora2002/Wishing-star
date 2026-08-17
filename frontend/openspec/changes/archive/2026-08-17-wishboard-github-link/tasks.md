## 1. 實作

- [x] 1.1 `frontend/src/App.jsx`：在 `.wish-form` 之後新增 GitHub 連結元素，文字為「GitHub@zora2002」，指向 `https://github.com/zora2002/Wishing-star`，設定 `target="_blank" rel="noopener noreferrer"`
- [x] 1.2 `frontend/src/App.css`：新增連結樣式——沿用 `--font-body`、字級比照 `--text-tooltip`（13px）、預設顏色 `var(--text-muted)`，hover 時轉亮或加底線，置中對齊

## 2. 驗證

- [x] 2.1 手動測試：頁面載入時，便條紙卡片下方可見「GitHub@zora2002」文字連結，無圖示
- [x] 2.2 手動測試：點擊連結會在新分頁開啟 `https://github.com/zora2002/Wishing-star`，原分頁畫面不變
