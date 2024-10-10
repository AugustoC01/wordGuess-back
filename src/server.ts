import express from "express";
import cors from "cors";
import { corsOptions, PORT } from "./config";

export const app = express();

app.use(express.json());

app.use(cors(corsOptions));

import Router from "./routes/routes";
import { globalErrorHandler } from "./Middleware/errorHandler";
Router(app);
app.use(globalErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
