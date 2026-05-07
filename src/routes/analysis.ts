import { Router } from "express";
import { z } from "zod";
import {
  analyzeLift,
  analyzeRollout,
  analyzeSignificance,
} from "../services/insightService.js";

const router = Router();

const analysisSchema = z.object({
  experimentName: z.string().min(2),
  productArea: z.string().min(2),
  primaryKpi: z.string().min(2),
  baselineConversionRate: z.number().positive(),
  variantConversionRate: z.number().positive(),
  sampleSize: z.number().int().positive(),
  confidenceLevel: z.number().min(0).max(1),
  rollbackRisk: z.enum(["low", "medium", "high"]),
  executiveVisibility: z.boolean(),
});

router.post("/analyze/lift", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeLift(input));
});

router.post("/analyze/significance", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeSignificance(input));
});

router.post("/analyze/rollout", (request, response) => {
  const input = analysisSchema.parse(request.body);
  response.json(analyzeRollout(input));
});

export default router;
