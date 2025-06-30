# Ecommerce-trend-analyzer
## 特色功能

- **跨平台電商趨勢分析**：自動整合多個電商平台（如蝦皮、momo、PChome 等）商品資料，提供即時熱門商品排行榜、價格趨勢、關鍵字熱度、類別分佈等多維度分析。
- **自動化爬蟲與資料流**：結合 N8N、Crawl4ai 與 Docker，實現商品資料自動抓取、清洗、入庫與 API 服務全流程自動化。
- **爬蟲優點（Crawl4ai CSS 策略）**：採用 crawl4ai 的 CSS selector 策略，直接定位網頁資料欄位，無需依賴大量 markdown 文件、LLM 或 AI agent，維護簡單、效能高且穩定性佳。

> 適合資料分析、電商監控、商業情報、學術研究等多種場景，並可快速擴充至其他平台或資料來源。

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

## 部署與架構 (Vercel + Render)
採用 Serverless 架構，前後端分離部署，確保高可用性與彈性擴展。
- **Supabase**：雲端 PostgreSQL 資料庫，負責資料儲存與備份。
- **Vercel**：前端（Next.js）自動化部署平台，支援 CI/CD、Preview、Production 多環境，並可自動讀取環境變數。
- **N8N**：自動化流程服務，負責爬蟲排程、資料同步等任務，可用 Docker 部署。
- **Render**：後端（FastAPI）自動化部署平台，支援 API Server、資料庫、定時任務等。
- **Cloudflare**：DNS 解析與安全防護，提升網站存取速度與穩定性。

### 部署說明
- 前端程式碼推送至 GitHub，Vercel 會自動 build 並部署，環境變數（如 `NEXT_PUBLIC_API_BASE_URL`）可於 Vercel 後台設定。
- 後端（FastAPI）推送至 GitHub，Render 會自動 build 並啟動 API 服務，需設定 CORS 允許 Vercel 網域。
> CORS可於 backend/main.py 設定。
- Supabase 作為資料庫服務，與 FastAPI 連線。
- N8N 可用於自動化爬蟲排程、API 觸發等。

## 本地下載與 .env 檔案說明
請於各自平台設定環境變數或本地建立 `.env.local`、`.env` 檔案。


### 下載前提
- **N8N**
- **Crawl4ai**
- **Docker(可選)**
### 本地下載專案步驟
1. 下載專案：
   ```bash
   git clone https://github.com/your-username/ecommerce-trend-analyzer.git
   ```
2. 進入 frontend 和 backend 資料夾，依需求安裝依賴：
   ```bash
   cd frontend
   pnpm install
   # 或
   cd ../backend
   pip install -r requirements.txt
   ```
3. 於各自資料夾建立對應的 .env 檔案：
   - 前端（frontend/.env.local）
     ```
     NEXT_PUBLIC_API_BASE_URL=https://... .onrender.com # render api
     # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 # 本地api
     ```
   - 後端（backend/.env）
     ```
     DATABASE_URL=postgresql://... # Supabase 連線字串
     SECRET_KEY=your-secret 
     ```
4. （可選）初始化資料庫結構（需先設定好 backend/.env）：
   ```bash
   cd backend
   alembic upgrade head
   ```
5. 啟動專案：
   - 前端（Next.js）：
     ```bash
     cd frontend
     pnpm dev
     ```
   - 後端（FastAPI）：
     ```bash
     cd backend
     uvicorn main:app --reload --host 0.0.0.0 --port 8000
     ```
## 其他
### 授權
- **MIT License**:歡迎二次開發與商業應用

### 聯絡方式
- **信箱**：dafsf60804@gmail.com

### 專案結構.txt幫你更快掌握專案
### 尚處於MVP階段




