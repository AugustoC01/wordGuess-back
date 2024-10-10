const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

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

export { PORT, NODE_ENV, corsOptions };
