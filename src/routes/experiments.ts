import { Router } from "express";
import { experiments } from "../services/insightService.js";

const router = Router();

router.get("/", (_request, response) => {
  response.json(experiments);
});

router.get("/:id", (request, response) => {
  const experiment = experiments.find((entry) => entry.id === request.params.id);

  if (!experiment) {
    return response.status(404).json({
      error: "Not Found",
      message: "Experiment was not found.",
    });
  }

  return response.json(experiment);
});

export default router;
