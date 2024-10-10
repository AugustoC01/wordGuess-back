import { Router } from "express";
const wordRouter = Router();

import { getRandomWord, getResult } from "../services/wordService";


wordRouter.get("/", (_, res, next) => {
  try {
    const word = getRandomWord();
    res.status(200).json(word);
  } catch (error) {
    next(error)
  }
});

wordRouter.post("/", (req, res, next) => {
  try {
    const { value } = req.body;

    if(!value || value === ""){
      throw new Error("BadRequest");
    }

    const result = getResult(value);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default wordRouter;
