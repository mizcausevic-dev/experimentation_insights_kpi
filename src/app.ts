import fs from "node:fs";
import path from "node:path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import healthRouter from "./routes/health.js";
import experimentsRouter from "./routes/experiments.js";
import variantsRouter from "./routes/variants.js";
import kpisRouter from "./routes/kpis.js";
import rolloutsRouter from "./routes/rollouts.js";
import findingsRouter from "./routes/findings.js";
import dashboardRouter from "./routes/dashboard.js";
import analysisRouter from "./routes/analysis.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const docsPath = path.join(process.cwd(), "docs", "openapi.yaml");
const openApiDocument = yaml.load(
  fs.readFileSync(docsPath, "utf8"),
) as Parameters<typeof swaggerUi.setup>[0];

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use("/health", healthRouter);
app.use("/api/experiments", experimentsRouter);
app.use("/api/variants", variantsRouter);
app.use("/api/kpis", kpisRouter);
app.use("/api/rollouts", rolloutsRouter);
app.use("/api/findings", findingsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api", analysisRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
