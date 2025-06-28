# Ecommerce-trend-analyzer
## 使用工具&框架
### 前端（使用 Next.js 架構）
採用 Next.js App Router 架構，結合 TypeScript、Tailwind CSS 與 shadcn/ui，打造現代化、響應式的電商趨勢分析儀表板。所有 API 請求皆透過環境變數 NEXT_PUBLIC_API_BASE_URL 串接後端，並支援 Vercel 雲端自動部署
- **TypeScript**：靜態型別語言，提升開發安全性與維護性。
- **Next.js**：React 全端框架，支援 SSR/SSG，優化 SEO 與效能。
- **React 19**：主流 UI 框架，負責組件式開發。
- **Tailwind CSS**：原子化 CSS 框架，快速設計響應式 UI。
- **shadcn/ui**：基於 Radix UI 的 React 元件庫，提升 UI 一致性與開發效率。
- **Recharts**:資料視覺化圖表元件，繪製趨勢、分佈等統計圖。
- **Vercel**：前端伺服器無縫部署，支援 Serverless 架構與自動 CI/CD。
### 自動化流程(使用N8N)
利用 N8N 與 Docker，實現爬蟲排程、資料清洗、API 觸發等自動化流程，提升資料更新效率與穩定性。
- **Docker**：容器化部署，確保開發、測試、正式環境一致。
- **N8N**：開源自動化流程工具，串接爬蟲、API、資料庫等任務。
- **Crawl4ai**：自訂爬蟲任務，定時抓取各大電商平台商品資料。
### 資料庫與後端服務(使用Fastapi)
後端採 FastAPI + SQLAlchemy 架構，結合 Alembic 管理資料庫遷移，並以 Render 雲端部署。API 提供商品排行、關鍵字分析、類別分佈等資料，支援 CORS 並與前端解耦。
- **FastAPI**：高效 Python Web 框架，負責 RESTful API 與商業邏輯。
- **SQLAlchemy**：ORM 工具，負責資料庫操作與模型定義。
- **Supabase**：雲端 PostgreSQL 資料庫服務，儲存商品、關鍵字、快照等資料。
- **Render**：後端 API 雲端部署平台，支援自動化 CI/CD。

## 部署與架構(Vercel+Render)
專案完全基於 Serverless 架構開發與部署
- **Supabase**：

- **Vercel**：

- **N8N**：

- **Cloudflare**：

- **Render**：



