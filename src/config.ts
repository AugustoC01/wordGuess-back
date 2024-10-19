import 'dotenv/config'
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";
const REDIS_USER = process.env.REDIS_USER || "default";
const REDIS_PASS = process.env.REDIS_PASS || "pass";
const REDIS_HOST = process.env.REDIS_HOST || "awesome.redis.server";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  methods: "GET,POST",
  origin: "*",
  preflightContinue: false,
};

const dbConfig = {
  url: `redis://${REDIS_USER}:${REDIS_PASS}@${REDIS_HOST}:${REDIS_PORT}`
};

export { PORT, NODE_ENV, corsOptions, dbConfig };
