from fastapi import APIRouter, Depends
from typing import List

from app.models.game import GameRecord
from app.services.game_service import GameService

router = APIRouter(prefix="/game", tags=["game"])

@router.post("/score")
async def submit_score(
    score: int, 
    game_service: GameService = Depends()
):
    record = game_service.create_record(score)
    return {"code": 200, "data": record}

@router.get("/leaderboard")
async def get_leaderboard(
    game_service: GameService = Depends()
) -> List[GameRecord]:
    leaderboard = game_service.get_top_scores()
    return {"code": 200, "data": leaderboard} 