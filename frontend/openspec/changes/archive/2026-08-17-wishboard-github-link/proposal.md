## Why

許願牆目前沒有任何連到專案原始碼的入口。在頁面加上一個安靜的 GitHub 連結，讓有興趣的訪客可以找到專案來源，同時不破壞現有畫面的安靜、極簡調性。

## What Changes

- 在願望輸入表單卡片下方、頁面置中處，新增一個純文字連結「GitHub@zora2002」，指向 `https://github.com/zora2002/Wishing-star`，於新分頁開啟
- 連結不使用任何圖示（沿用 design system「無 icon 系統、無 brand mark」的原則），字級與顏色比照現有的次要文字處理（`--text-tooltip` 字級、`--text-muted` 顏色），hover 時顏色轉亮或加底線

## Capabilities

### New Capabilities
（無）

### Modified Capabilities
- `wishing-wall-ui`: 新增「頁尾 GitHub 連結」需求，描述連結的顯示位置、文字、目標網址與開啟行為

## Impact

- 前端：`frontend/src/App.jsx`（新增連結元素）、`frontend/src/App.css`（連結樣式）
- 不影響後端 API 或資料模型
