# 系統簡介

> 這個網站是小型圖書館自動化系統的前端介面，
> 我們基於靜態頁面的設面，使用 WebSocket 和資料庫系統互動，
> 以期望減少流量開銷並提昇回應的速度和安全性。

## 系統架構

1. 前端介面使用 HTML、CSS 和 JavaScript 編寫，並利用 WebSocket 技術與後端伺服器進行即時通訊。
2. 後端伺服器負責處理來自前端的請求，並與資料庫系統進行互動以存取和更新圖書館資料。
3. 資料庫系統用於存儲圖書館的書籍資訊、用戶資料和借閱記錄等。

## 功能特色

1. 帳號管理: 可以註冊用戶帳號，並進行登入和登出操作。
2. 管理介面: 提供圖書館管理員專用的管理介面，用於新增、修改和刪除書籍資訊。
3. 查詢系統: 用戶可以透過關鍵字搜尋書籍，並查看詳細的書籍資訊。
4. 條碼掃描: 支援條碼掃描功能，方便用戶快速查找和借閱書籍。
5. 多語言支援: 提供多種語言選項，方便不同語言使用者使用。
6. 響應式設計: 網站介面適應不同裝置和螢幕尺寸，提供良好的使用體驗。
7. 安全性: 採用獨特的 WebSockets 通訊協定，確保資料傳輸的安全性和完整性。
8. Github Page: 本系統的前端程式碼已開源並托管於 Github Page，歡迎有興趣的開發者參與貢獻。

```text
account/      faq/          maintain/     query/
announce/     .htaccess     login/        menu/         record/
barcode/      images/       lib.htm       logout/
cron/         inc/          m/            profile/      todo
```

## 登入流程

```
業界標準且相對安全的作法是採取**「HTTP 登入 ➔ 取得 Token ➔ 攜帶 Token 建立 WebSocket」**的流程：
HTTP 驗證 (REST API)：前端的 Vuetify 登入介面先透過標準的 HTTPS POST 請求（例如 /api/login）將 username 與 password 送出。
Go 與 MySQL 比對：Go 伺服器接收請求，從 MySQL 取出對應帳號的 Hash 密碼（實務上建議使用 bcrypt）進行驗證。
核發 JWT (JSON Web Token)：驗證成功後，Go 伺服器產生一組帶有時效性的 JWT，並將該使用者的權限等級（role: 0, 1, 2, 3）簽署在 Token 內傳回前端。
WebSocket 安全連線：前端取得 JWT 後，在建立 WebSocket 連線時將 JWT 帶上（通常放在連線請求的 Header，或是連線成功後的第一個認證訊息）。Go 的 WebSocket Server 驗證 JWT 確實有效且未過期後，才正式允許該連線存在並進行後續的廣播與操作。
這樣的設計可以確保只有「已經確認身分」的使用者能佔用 WebSocket 資源。同時，前端也可以直接透過解析 JWT，來決定 Vuetify 介面上是否要顯示「管理選單」以及對應的操作按鈕。
```

## API 說明

| 項目 | 功能 | 說明 |
| --- | --- | --- |
| login | 登入 | |
