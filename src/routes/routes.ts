import { Express } from "express-serve-static-core";
import wordRouter from "./wordRoutes";

const Router = (app: Express) => {
  app.use("/api/word", wordRouter);
};

export default Router;
