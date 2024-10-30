import { Router } from "express";
const gameRouter = Router();

import { newGame, getResult } from "../services/gameService";

gameRouter.get("/", async (req, res, next) => {
  try {
    const { gameId } = req.body;
    const newGameId = await newGame(gameId);
    res.status(200).json(newGameId);
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
