import { Router } from "express";
import { findings } from "../services/insightService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(findings);
});

export default router;
