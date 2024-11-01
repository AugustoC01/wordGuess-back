import { Router } from "express";
const gameRouter = Router();

import { getResult, handleGame } from "../services/gameService";

gameRouter.get("/:gameId?", async (req, res, next) => {
  try {
    const { gameId } = req.params;
    const gameData = await handleGame(gameId);
    res.status(200).json(gameData);
  } catch (error) {
    next(error)
  }
});

gameRouter.post("/", async (req, res, next) => {
  try {
    const { gameId, value } = req.body;

    if(!value || value === ""){
      throw new Error("BadRequest");
    }
    const result = await getResult(gameId, value)
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default gameRouter;
