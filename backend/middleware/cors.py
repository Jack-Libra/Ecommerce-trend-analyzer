from fastapi.middleware.cors import CORSMiddleware

# CORS 設定（可直接在 main.py 使用）
def get_cors_middleware(app):
    return CORSMiddleware(
        app,
        allow_origins=[
            "https://ecommerce-trend-analyzer.vercel.app",
            "https://ecommerce-trend-analyzer-ib1e.vercel.app",
            "https://ecommerce-trend-analyzer-ib1e-git-main-jack-libras-projects.vercel.app",
            "https://ecommerce-trend-analyzer-ib1e-pm9i9jzy1-jack-libras-projects.vercel.app"
        ],  # 部署時請改為你的前端網址
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
