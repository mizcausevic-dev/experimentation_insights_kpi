import { Router } from "express";
import { rolloutDecisions } from "../services/insightService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(rolloutDecisions);
});

export default router;
