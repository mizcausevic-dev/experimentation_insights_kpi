import { Router } from "express";
import { getDashboardSummary } from "../services/insightService.js";

const router = Router();

router.get("/summary", (_request, response) => {
  response.json(getDashboardSummary());
});

export default router;
