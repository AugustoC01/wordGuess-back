import { Router } from "express";
const testRouter = Router();

testRouter.get("/", async (_req, res, next) => {
  try {
    res.status(200).json("pong");
  } catch (error) {
    next(error)
  }
});

export default testRouter;
