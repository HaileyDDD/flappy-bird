from pydantic import BaseSettings, PostgresDsn, validator
from typing import Optional, Dict, Any

class Settings(BaseSettings):
    # 数据库配置
    DATABASE_URL: Optional[PostgresDsn] = None
    
    # 安全配置
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # 跨域配置
    CORS_ORIGINS: list = ["*"]
    
    # 日志级别
    LOG_LEVEL: str = "INFO"
    
    # 调试模式
    DEBUG: bool = False
    
    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get("POSTGRES_USER"),
            password=values.get("POSTGRES_PASSWORD"),
            host=values.get("POSTGRES_SERVER", "localhost"),
            path=f"/{values.get('POSTGRES_DB', 'app')}"
        )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings() 