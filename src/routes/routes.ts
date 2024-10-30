import { Express } from "express-serve-static-core";
import gameRouter from "./gameRouter";

const Router = (app: Express) => {
  app.use("/api/wordGame", gameRouter);
};

export default Router;
