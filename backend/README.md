# 許願牆 API（本機開發版）

用 Docker 跑一個本機 DynamoDB，搭配 Express 寫的 API，之後可以幾乎不改程式碼就部署到 AWS Lambda + 正式 DynamoDB。

## 需要先安裝的東西

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)（跑本機 DynamoDB 用）
- [Node.js](https://nodejs.org/)（需要 v24.12.0 以上）

## 第一次啟動的步驟

### 1. 啟動本機 DynamoDB

在這個資料夾底下執行：

```bash
docker compose up -d
```

這會啟動兩個容器：
- `dynamodb-local`：本機的 DynamoDB，跑在 `http://localhost:8000`
- `dynamodb-admin`：一個網頁介面，可以直接在瀏覽器打開 `http://localhost:8001` 看資料表裡存了什麼，很適合邊開發邊確認資料有沒有存進去

確認有跑起來：

```bash
docker compose ps
```

### 2. 安裝套件

```bash
npm install
```

### 3. 設定環境變數

```bash
cp .env.example .env
```

預設值就可以直接用，不用改。

### 4. 建立資料表

```bash
npm run create-table
```

看到「資料表建立完成」就是成功了。這個指令只需要在第一次、或是清空 Docker 資料後重新執行。

### 5. 啟動 API

```bash
npm run dev
```

看到 `許願牆 API 已啟動：http://localhost:4000` 就代表成功了。

## 測試 API 有沒有正常運作

開一個新的終端機視窗，用 curl 測試：

```bash
# 新增一則願望
curl -X POST http://localhost:4000/api/wishes \
  -H "Content-Type: application/json" \
  -d '{"message":"希望一切順利","name":"路人"}'

# 取得所有願望
curl http://localhost:4000/api/wishes
```

或是直接打開瀏覽器看 `http://localhost:8001`，點進 `WishingStarWishes` 資料表，應該會看到你剛剛新增的資料。

## 從 React 專案呼叫這個 API

在你的 React 專案裡，呼叫方式大概像這樣：

```js
// 取得所有願望
const res = await fetch("http://localhost:4000/api/wishes");
const wishes = await res.json();

// 新增一則願望
await fetch("http://localhost:4000/api/wishes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "我的願望", name: "匿名" }),
});
```

API 已經開啟 CORS，React 開發伺服器（不管是 `localhost:5173` 還是 `localhost:3000`）都可以直接呼叫，不會被瀏覽器擋掉。

建議在 React 專案裡建立一個 `.env` 檔案存 API 網址（例如 Vite 專案用 `VITE_API_URL=http://localhost:4000`），這樣之後換成正式的 API Gateway 網址時，只要改這一行就好，不用去程式碼裡到處找。

## 資料夾結構

```
backend/
├── docker-compose.yml   # 本機 DynamoDB + 資料檢視工具
├── src/
│   ├── app.js            # Express app 本體（本機、Lambda 共用）
│   ├── server.js         # 本機開發用的啟動入口
│   ├── handler.js        # 之後部署到 Lambda 用的進入點（先不用管）
│   ├── db.js              # DynamoDB 連線設定
│   └── routes/wishes.js  # 願望的 API：GET / POST
└── scripts/create-table.js  # 建立本機資料表用
```

## 之後要部署到 AWS 時

- `src/app.js` 這份核心邏輯不用改
- 本機用 `server.js` 啟動，Lambda 上用 `handler.js` 當進入點，兩者共用同一份 `app.js`
- 只要把 `.env` 裡的 `DYNAMODB_ENDPOINT` 拿掉，`db.js` 就會自動改連正式的 AWS DynamoDB
- 到時候需要另外幫 Lambda 的 IAM Role 加上讀寫 DynamoDB 資料表的權限

## 常見問題

**`npm run create-table` 出現連線錯誤？**
先確認 `docker compose ps` 看得到 `dynamodb-local` 是 running 狀態，而且沒有其他程式佔用 8000 port。

**重開機後資料不見了？**
資料其實有存在 `docker/dynamodb-data/` 資料夾裡（因為有掛 volume），只要重新 `docker compose up -d` 就會找回來，除非你手動刪了那個資料夾。
