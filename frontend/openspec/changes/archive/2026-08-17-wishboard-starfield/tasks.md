## 1. 星星色票與常數

- [x] 1.1 新增 `frontend/src/starPalette.js`，內容為 `frontend/doc/macaron-palette.md` 的 12 個 macaron 色碼
- [x] 1.2 加上一個從色票隨機挑一個顏色的輔助函式

## 2. 播放佇列邏輯

- [x] 2.1 在 `WishBoard.jsx`（或新的 hook）加上佇列 state：最多 7 個位置，各自存 `{ wish, color, topOffset }` 或空值
- [x] 2.2 收到願望清單時，依新到舊順序把還沒排進佇列的願望填入空位置
- [x] 2.3 某個位置的星星飛行結束（`animationend`）後，清空該位置，往下遞補到「上一則播放完的下一則」，播完最舊一則後回頭接最新一則
- [x] 2.4 輪詢結果出現先前沒看過的願望時，優先排進接下來要空出來的位置，不用等目前這輪播放完才輪到
- [x] 2.5 願望總數少於 7 則時，其餘位置維持空白，不重複播放同一則願望湊數
- [x] 2.6 每個位置的顏色與垂直偏移只在該則願望被排入時抽一次，整趟飛行維持不變

## 3. 天空面板呈現

- [x] 3.1 把 `WishBoard.jsx` 從 `.sky` 窄條 + `.wish-list` 改寫成全高的黑色夜空面板
- [x] 3.2 依佇列中每個有內容的位置渲染一顆星星，用該位置的垂直偏移與顏色定位
- [x] 3.3 加上 CSS keyframe 動畫，讓星星從面板右側飄到左側
- [x] 3.4 加上滑鼠懸浮行為，顯示「願望內容 by 名字」的懸浮卡片
- [x] 3.5 依 `frontend/doc/story.png` 的畫法，在天際線加上 3 個小型亮燈窗格
- [x] 3.6 確認願望數為零時只顯示純黑夜空與天際線，沒有星星也沒有提示文字
- [x] 3.7 移除 `App.css` 中不再使用的 `.wish-list` / `.wish` / `.wish-status` 樣式

## 4. 即時輪詢

- [x] 4.1 把 `App.jsx` 裡掛載時打一次的 `getWishes()`，改成遞迴 `setTimeout` 輪詢，只有前一次請求完成後才排下一次
- [x] 4.2 依 `document.visibilityState` 控制輪詢：分頁不可見時暫停，`visibilitychange` 恢復可見時再繼續
- [x] 4.3 依 design.md 的 Open Questions，決定並設定輪詢間隔（十秒為單位，不要秒級）
- [x] 4.4 確認使用者自己送出的願望（`WishForm` 的 `onCreated`）會用跟輪詢進來的願望一樣的方式併入佇列，一樣享有優先播放

## 5. 願望送出表單

- [x] 5.1 調整 `WishForm.jsx` 版面，讓姓名與願望輸入框變成兩個獨立欄位，中間加冒號分隔
- [x] 5.2 把文字「enter」送出按鈕改成流星圖示按鈕，並保留原本按 Enter 鍵也能送出的行為
- [x] 5.3 更新 `App.css`，配合新的輸入框／冒號／圖示按鈕版面

## 6. 驗證

- [x] 6.1 對照 `specs/wishing-wall-ui/spec.md` 裡的每個情境，在實際跑起來的畫面上手動驗證（空狀態、少於 7 則、超過 7 則、輪播回頭、懸浮卡片、新願望優先播放、分頁在背景時暫停）
- [x] 6.2 用比較多筆的測試資料，確認畫面上同時最多只會出現 7 顆星星
- [x] 6.3 確認分頁切到背景時輪詢會停止，恢復可見後才繼續，且不會有重疊或重複的請求

## 7. 對齊《Make a Wish》參考檔案的視覺與動畫調整

- [x] 7.1 同步 `frontend/src/starPalette.js` 為 16 色，對應已更新的 `frontend/doc/macaron-palette.md`
- [x] 7.2 星星圖形改用四芒星 SVG path，取代文字符號 "✦"
- [x] 7.3 天空面板背景改用深藍漸層（`linear-gradient(180deg,#0a2233 0%,#0e2a36 55%,#14384a 100%)`），取代目前的 `#000` 純黑
- [x] 7.4 天際線改用 inline SVG path 呈現剪影，加上暖黃色小光點與灰色紋理點，移除原本固定 3 個白色窗格的做法（維持原本 90px 高的天際線區域比例，光點位置依參考檔案的相對比例換算）
- [x] 7.5 新增一批不對應願望、純裝飾用的靜態閃爍背景星點（比照參考檔案的 18 顆 twinkle 星點）
- [x] 7.6 星星 hover 卡片文字格式改成「願望 — 名字」（em dash），拿掉「by」；hover 卡片維持顯示在星星下方（design.md 決策 12）
- [x] 7.7 引入 Google Fonts 手寫風字型 Huninn，套用到許願牆卡片文字，並設定 `sans-serif` fallback
- [x] 7.8 強調色（accent）改用暖米黃 `#ffe9b8`
- [x] 7.9 願望送出成功後，加上置中的星星綻放動畫回饋（比照 `burstStar` keyframes，約 2.4 秒），動畫播放期間輸入框內容維持不清空，動畫結束後才清空；送出失敗時維持原行為
- [x] 7.10 對照更新後的 `specs/wishing-wall-ui/spec.md` 情境重新手動驗證（hover 格式、天際線與背景裝飾星點、深藍漸層背景、送出綻放動畫）

## 8. 滿版版面與剩餘視覺細節比照參考檔案

- [x] 8.1 移除 `.wall-card` 外框與「許願牆」標題，整體版面改成滿版鋪版（`WishBoard` 撐滿 `100vh`／`100%` 寬，`index.css` 移除 `#root` 的 `max-width:480px` 與 `body` 的置中 padding）
- [x] 8.2 新增月亮裝飾（兩個疊圓 SVG，模擬弦月），固定顯示在畫面左上角（`left:6%; top:8%`）
- [x] 8.3 星星加上隨機旋轉角度，進場時抽一次、整趟飛行維持不變（比照參考檔案 `rotate: Math.random()*360`）
- [x] 8.4 天際線 path 加上 `stroke="#081722" stroke-width="4" stroke-linejoin="round"`，柔化剪影邊緣
- [x] 8.5 Hover 願望詳情移到星星右側（`top:50%; left:100%; transform:translateY(-50%)`），移除背景卡片／外框，改成純文字呈現
- [x] 8.6 `WishForm` 改為絕對定位、疊在場景下方的輸入列（置中、寬度上限 `min(calc(100% - 42px), 875px)`，`bottom:22px`），輸入框改成底線樣式（無外框/底色）；送出按鈕同步拿掉圓形外框，圖示改用發光 `drop-shadow`，跟輸入框的極簡風格一致
- [x] 8.7 重新手動驗證滿版版面在不同視窗寬度下的呈現，以及月亮、星星旋轉、hover 位置、輸入列樣式

## 9. 卡片式版面與表單重新設計比照更新後的參考來源（`frontend/doc/Make a Wish (standalone).html` 與 `frontend/doc/wishing/` tokens）

- [x] 9.1 星空面板改為置中卡片（`max-width:640px; max-height:400px; aspect-ratio:5/4`，直角無圓角），拿掉滿版 `100vh`/`100%` 撐滿的做法
- [x] 9.2 `App.jsx`／`App.css` 新增頁面外層容器，背景改用 `radial-gradient(ellipse at 50% 0%, #133447 0%, #04121a 70%)`，上下留白讓星空卡片與表單卡片置中顯示
- [x] 9.3 願望輸入表單改成獨立的旋轉便條紙卡片（`background:#fdf3c7; box-shadow:0 6px 16px rgba(0,0,0,0.35); transform:rotate(-1.5deg)`，直角無圓角），從 `WishBoard` 內部絕對定位的疊加輸入列，改成 `WishBoard` 卡片下方的獨立區塊
- [x] 9.4 表單欄位改成上下堆疊：願望內容欄位在上（滿版寬、置中文字），姓名欄位與送出按鈕在下一列（姓名欄位縮窄至約 30% 寬）；移除中間的冒號分隔；輸入框底線與文字顏色改用便條紙色調（`#3a2f1a` 文字、`rgba(58,47,26,0.35)` 底線）
- [x] 9.5 送出按鈕圖示改成紙飛機造型（描邊、無填色），顏色改用固定色碼 `#b8860b`，不透過 `--accent`
- [x] 9.6 字型 import 改回 jsdelivr CDN 的 `jf-openhuninn-1.1`，取代 Google Fonts Huninn；不要引入參考來源裡有載入但沒用到的 Space Grotesk／Fraunces
- [x] 9.7 對照更新後的 `specs/wishing-wall-ui/spec.md`（整體版面呈現、願望輸入框視覺呈現）重新手動驗證：不同視窗寬度下卡片置中效果、表單卡片旋轉陰影、紙飛機圖示、字型呈現（用 Playwright 對 dev server 截了寬版/窄版/hover/送出綻放動畫的畫面，確認卡片置中、便條紙表單、紙飛機圖示與字型都正確呈現，console 無錯誤）
