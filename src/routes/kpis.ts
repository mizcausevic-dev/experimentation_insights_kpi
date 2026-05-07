import { Router } from "express";
import { kpis } from "../services/insightService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(kpis);
});

export default router;
