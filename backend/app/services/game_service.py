from sqlalchemy.orm import Session
from typing import List

from app.models.game import GameRecord

class GameService:
    def __init__(self, db: Session):
        self.db = db

    def create_record(self, score: int, user_id: str = None) -> GameRecord:
        record = GameRecord(score=score, user_id=user_id)
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record

    def get_top_scores(self, limit: int = 10) -> List[GameRecord]:
        return (
            self.db.query(GameRecord)
            .order_by(GameRecord.score.desc())
            .limit(limit)
            .all()
        ) 