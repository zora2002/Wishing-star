# 許願牆前端

React + Vite 寫的許願牆頁面，串接 [`backend/`](../backend/) 的 `/api/wishes` API。

## 需要先安裝的東西

- [Node.js](https://nodejs.org/)（需要 v24.12.0 以上）

## 需要先做的事

先把後端跑起來，前端才有資料可以顯示，詳見 [`backend/README.md`](../backend/README.md)：

```bash
cd ../backend
docker compose up -d
npm install
cp .env.example .env
npm run create-table
npm run dev
```

確認 `http://localhost:4000/health` 有回應之後，再啟動前端。

## 啟動前端

```bash
npm install
cp .env.example .env
npm run dev
```

看到 Vite 印出的網址（預設 `http://localhost:5173`）就代表成功了，打開瀏覽器應該會看到許願牆頁面。

`.env` 裡的 `VITE_API_URL` 用來指定後端 API 網址，本機開發預設就是 `http://localhost:4000`，不用改。

## 資料夾結構

```
frontend/
├── src/
│   ├── main.jsx        # React 進入點
│   ├── App.jsx          # 組裝 WishBoard + WishForm，管理願望列表狀態
│   ├── WishBoard.jsx     # 星空／天際線卡片，顯示願望列表
│   ├── WishForm.jsx      # 姓名／願望輸入框與送出按鈕
│   └── api.js            # 呼叫後端 /api/wishes 的 GET / POST
└── openspec/            # 這個專案的規劃紀錄（proposal / specs / design / tasks）
```
