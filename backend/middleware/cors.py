from fastapi.middleware.cors import CORSMiddleware

# CORS 設定（可直接在 main.py 使用）
def get_cors_middleware(app):
    return CORSMiddleware(
        app,
        allow_origins=["*"],  # 部署時請改為你的前端網址
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
