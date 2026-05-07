export type ExperimentStatus = "running" | "holdout" | "ready-to-rollout" | "stopped";
export type InsightStatus = "hold" | "needs-review" | "rollout";

export interface Experiment {
  id: string;
  name: string;
  productArea: string;
  status: ExperimentStatus;
  primaryKpi: string;
  audience: string;
}

export interface Variant {
  id: string;
  experimentId: string;
  name: string;
  trafficAllocation: number;
  conversionRate: number;
}

export interface KpiMetric {
  id: string;
  experimentId: string;
  name: string;
  baselineValue: number;
  variantValue: number;
  unit: string;
}

export interface RolloutDecision {
  id: string;
  experimentId: string;
  decision: "expand" | "hold" | "rollback";
  reason: string;
}

export interface InsightFinding {
  id: string;
  experimentId: string;
  severity: "medium" | "high";
  summary: string;
}

export interface AnalysisInput {
  experimentName: string;
  productArea: string;
  primaryKpi: string;
  baselineConversionRate: number;
  variantConversionRate: number;
  sampleSize: number;
  confidenceLevel: number;
  rollbackRisk: "low" | "medium" | "high";
  executiveVisibility: boolean;
}

export interface AnalysisResponse {
  status: InsightStatus;
  score: number;
  issues: string[];
  passedChecks: string[];
  recommendedNextAction: string;
}

export interface RolloutResponse {
  priority: "medium" | "high" | "critical";
  rationale: string[];
  recommendedNextAction: string;
}
