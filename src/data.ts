import type {
  Experiment,
  InsightFinding,
  KpiMetric,
  RolloutDecision,
  Variant,
} from "./types.js";

export const experiments: Experiment[] = [
  {
    id: "exp_01",
    name: "Enterprise CTA Modernization",
    productArea: "Web Platform",
    status: "ready-to-rollout",
    primaryKpi: "Demo conversion rate",
    audience: "Enterprise prospects",
  },
  {
    id: "exp_02",
    name: "Onboarding Form Simplification",
    productArea: "Growth",
    status: "running",
    primaryKpi: "Qualified lead completion rate",
    audience: "Mid-market prospects",
  },
  {
    id: "exp_03",
    name: "Pricing Page Social Proof",
    productArea: "Revenue Marketing",
    status: "holdout",
    primaryKpi: "Pricing CTA click-through",
    audience: "High-intent return visitors",
  }
];

export const variants: Variant[] = [
  {
    id: "var_01",
    experimentId: "exp_01",
    name: "Control",
    trafficAllocation: 50,
    conversionRate: 0.041,
  },
  {
    id: "var_02",
    experimentId: "exp_01",
    name: "Modernized CTA",
    trafficAllocation: 50,
    conversionRate: 0.053,
  },
  {
    id: "var_03",
    experimentId: "exp_02",
    name: "Simplified Form",
    trafficAllocation: 45,
    conversionRate: 0.167,
  }
];

export const kpis: KpiMetric[] = [
  {
    id: "kpi_01",
    experimentId: "exp_01",
    name: "Demo conversion rate",
    baselineValue: 4.1,
    variantValue: 5.3,
    unit: "percent",
  },
  {
    id: "kpi_02",
    experimentId: "exp_02",
    name: "Qualified lead completion rate",
    baselineValue: 14.4,
    variantValue: 16.7,
    unit: "percent",
  },
  {
    id: "kpi_03",
    experimentId: "exp_03",
    name: "Pricing CTA click-through",
    baselineValue: 8.2,
    variantValue: 8.0,
    unit: "percent",
  }
];

export const rolloutDecisions: RolloutDecision[] = [
  {
    id: "rollout_01",
    experimentId: "exp_01",
    decision: "expand",
    reason: "Lift is strong enough to support phased rollout across enterprise pages.",
  },
  {
    id: "rollout_02",
    experimentId: "exp_03",
    decision: "hold",
    reason: "Lift is not yet convincing enough to justify broader release.",
  }
];

export const findings: InsightFinding[] = [
  {
    id: "finding_01",
    experimentId: "exp_01",
    severity: "high",
    summary: "Variant lift is strong, but rollout should still account for enterprise funnel quality downstream.",
  },
  {
    id: "finding_02",
    experimentId: "exp_03",
    severity: "medium",
    summary: "Pricing page social proof variant shows flat performance and should remain in holdout review.",
  }
];
