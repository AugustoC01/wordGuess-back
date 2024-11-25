import { Express } from "express-serve-static-core";
import gameRouter from "./gameRouter";
import testRouter from "./testRouter";

const Router = (app: Express) => {
  app.use("/wordGame", gameRouter);
  app.use("/ping", testRouter);
};

export default Router;
