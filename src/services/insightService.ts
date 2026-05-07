import {
  experiments,
  findings,
  kpis,
  rolloutDecisions,
  variants,
} from "../data.js";
import type {
  AnalysisInput,
  AnalysisResponse,
  InsightStatus,
  RolloutResponse,
} from "../types.js";

function statusFromScore(score: number): InsightStatus {
  if (score >= 80) {
    return "rollout";
  }

  if (score >= 55) {
    return "needs-review";
  }

  return "hold";
}

function percentLift(input: AnalysisInput) {
  return ((input.variantConversionRate - input.baselineConversionRate) / input.baselineConversionRate) * 100;
}

export function analyzeLift(input: AnalysisInput): AnalysisResponse {
  const issues: string[] = [];
  const passedChecks: string[] = [];
  let score = 20;
  const lift = percentLift(input);

  if (lift >= 10) {
    passedChecks.push("Variant lift is materially above the practical rollout threshold.");
    score += 28;
  } else if (lift > 0) {
    issues.push("Lift is positive but may not yet justify broad release.");
    score += 10;
  } else {
    issues.push("Variant performance is flat or negative relative to baseline.");
    score -= 10;
  }

  if (input.confidenceLevel >= 0.95) {
    passedChecks.push("Confidence level supports decision-making without additional holdout extension.");
    score += 22;
  } else {
    issues.push("Confidence level is below the desired governance threshold.");
    score += 4;
  }

  if (input.sampleSize >= 15000) {
    passedChecks.push("Sample size is large enough to reduce rollout noise concerns.");
    score += 16;
  } else {
    issues.push("Sample size may be too light for an executive-visible rollout call.");
    score += 2;
  }

  if (input.rollbackRisk === "high") {
    issues.push("Rollback risk is high and requires additional release caution.");
    score -= 14;
  } else if (input.rollbackRisk === "medium") {
    issues.push("Rollback risk should be reviewed before broader release.");
    score -= 6;
  } else {
    passedChecks.push("Rollback risk is currently low.");
    score += 8;
  }

  if (input.executiveVisibility) {
    issues.push("Executive visibility increases the bar for experiment-readout confidence and rollout discipline.");
    score -= 4;
  } else {
    passedChecks.push("The experiment can remain in standard growth review without executive escalation.");
  }

  const finalScore = Math.max(0, Math.min(100, score));
  const status = statusFromScore(finalScore);
  const recommendedNextAction =
    status === "rollout"
      ? "Proceed with a phased rollout and publish a KPI-focused readout to product and growth leadership."
      : status === "needs-review"
        ? "Extend observation, validate downstream quality signals, and prepare a narrower rollout recommendation."
        : "Hold the experiment, review execution quality, and avoid broad release until performance improves.";

  return {
    status,
    score: finalScore,
    issues,
    passedChecks,
    recommendedNextAction,
  };
}

export function analyzeSignificance(input: AnalysisInput): AnalysisResponse {
  const result = analyzeLift(input);

  if (input.confidenceLevel < 0.95) {
    result.issues.push("Significance posture does not yet support a clear go-forward decision.");
    result.score = Math.max(0, result.score - 5);
    result.status = statusFromScore(result.score);
    result.recommendedNextAction =
      "Continue running the experiment until the confidence bar is met and re-check downstream KPI behavior.";
  }

  return result;
}

export function analyzeRollout(input: AnalysisInput): RolloutResponse {
  const rationale: string[] = [];
  let priority: RolloutResponse["priority"] = "medium";
  const lift = percentLift(input);

  if (lift >= 10 && input.confidenceLevel >= 0.95) {
    priority = "high";
    rationale.push("Positive lift and high confidence support rollout planning.");
  }

  if (input.rollbackRisk === "high") {
    priority = "critical";
    rationale.push("High rollback risk requires controlled rollout safeguards and stakeholder alignment.");
  }

  if (input.executiveVisibility) {
    rationale.push("Executive visibility means rollout communications and KPI framing need tighter discipline.");
    if (priority === "medium") {
      priority = "high";
    }
  }

  if (rationale.length === 0) {
    rationale.push("The experiment should remain in a standard readout flow without immediate release pressure.");
  }

  const recommendedNextAction =
    priority === "critical"
      ? "Prepare a phased release plan with rollback checkpoints and executive-facing KPI guardrails before expansion."
      : priority === "high"
        ? "Advance toward rollout with a measured release plan and downstream KPI monitoring."
        : "Keep the experiment in review, gather more data, and reassess release readiness after the next readout.";

  return {
    priority,
    rationale,
    recommendedNextAction,
  };
}

export function getDashboardSummary() {
  const rolloutReadyCount = experiments.filter((experiment) => experiment.status === "ready-to-rollout").length;
  const runningCount = experiments.filter((experiment) => experiment.status === "running").length;
  const highSeverityFindings = findings.filter((finding) => finding.severity === "high").length;

  return {
    experimentCount: experiments.length,
    rolloutReadyCount,
    runningCount,
    highSeverityFindingCount: highSeverityFindings,
    topDecisionThemes: [
      "Enterprise conversion lift vs downstream quality",
      "Confidence threshold discipline before rollout",
      "Rollback risk management on executive-visible experiments",
    ],
  };
}

export { experiments, findings, kpis, rolloutDecisions, variants };
