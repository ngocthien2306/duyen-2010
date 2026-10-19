# 💐 Gửi Minh Duyên · 20/10

Trang web quà tặng ngày Phụ nữ Việt Nam.

- `web/` — React + Vite + Tailwind + framer-motion, deploy lên GitHub Pages qua `.github/workflows/pages.yml`.
- `server/` — Express API trên Cloud Run (`patent-agent-505803`, `asia-east1`): Firestore DB `love-2010`, Gemini (Vertex AI) làm thơ, gửi email báo cho anh khi em mở quà / dùng phiếu / thả điều ước / đồng ý lời mời.

## Sửa nội dung
Tất cả chữ, ảnh, câu hỏi, phiếu quà... nằm trong `web/src/data.js`.

## Chạy local
```bash
cd web && npm install && VITE_API_URL=https://duyen-2010-api-400620690402.asia-east1.run.app npm run dev
```

## Deploy lại backend
```bash
cd server && gcloud run deploy duyen-2010-api --source . --region asia-east1 --project patent-agent-505803
```
