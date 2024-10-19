import { createClient } from "redis";
import { dbConfig } from "../config";

const redis = createClient(dbConfig);

export const dbConnect = async () => {
  redis.on("error", (err) => {
    console.log("Redis client error ", err);
  });

  redis.on("ready", () => {
    console.log("Redis client started");
  });

  await redis.connect();
};