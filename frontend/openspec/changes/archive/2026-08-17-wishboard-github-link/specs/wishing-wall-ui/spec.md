## ADDED Requirements

### Requirement: 頁尾 GitHub 連結
許願牆頁面 SHALL 在願望輸入表單卡片下方、頁面置中處，顯示一個文字連結「GitHub@zora2002」，連到專案的 GitHub 頁面，且不使用任何圖示。

#### Scenario: 檢視許願牆頁面
- **WHEN** 使用者開啟許願牆頁面
- **THEN** 願望輸入表單卡片下方顯示純文字連結「GitHub@zora2002」，不帶任何圖示

#### Scenario: 點擊 GitHub 連結
- **WHEN** 使用者點擊「GitHub@zora2002」連結
- **THEN** 系統在新分頁開啟 `https://github.com/zora2002/Wishing-star`，目前頁面保持不變
