from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class GameRecord(Base):
    __tablename__ = "game_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, nullable=True)
    score = Column(Integer, nullable=False)
    played_at = Column(DateTime(timezone=True), server_default=func.now()) 