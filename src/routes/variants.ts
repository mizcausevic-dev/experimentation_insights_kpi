import { Router } from "express";
import { variants } from "../services/insightService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(variants);
});

export default router;
