# Experimentation Insights KPI Architecture

## Service Overview

Experimentation Insights KPI models an internal operational service used by product, growth, revenue marketing, and leadership teams to evaluate experiment performance before broad rollout decisions are made.

It centralizes:

- experiment records and lifecycle posture
- variants and traffic allocation
- KPI metrics
- rollout decisions
- insight findings
- rollout risk and confidence analysis

## Request Flow

1. An experiment scenario is submitted to an analysis endpoint.
2. The request body is validated with Zod.
3. The service reviews lift, confidence level, sample size, rollback risk, and executive visibility.
4. The service returns issues, passed checks, a rollout posture, and recommended next action.
5. Teams use dashboard, KPI, and rollout endpoints to coordinate readouts and release planning.

## Endpoint Map

- `GET /health`
- `GET /api/experiments`
- `GET /api/experiments/:id`
- `GET /api/variants`
- `GET /api/kpis`
- `GET /api/rollouts`
- `GET /api/findings`
- `GET /api/dashboard/summary`
- `POST /api/analyze/lift`
- `POST /api/analyze/significance`
- `POST /api/analyze/rollout`

## Decision Model

### Experiment Review

The experimentation workflow scores:

- relative KPI lift
- confidence threshold posture
- sample size sufficiency
- rollback risk
- executive visibility and narrative risk

### Rollout Decisioning

The rollout model prioritizes:

- meaningful and confident lift
- guardrails against premature release
- phased rollout planning when rollback risk is elevated
- disciplined executive reporting for high-visibility experiments

## Security Notes

- Requests are validated before service logic runs.
- Configuration remains environment-driven.
- Error responses are centralized and consistent.
- CI, Dependabot, and CodeQL support ongoing repository hygiene.

## Future Production Upgrades

- persist experiment outcomes and KPI history in PostgreSQL
- connect product analytics and feature-flag systems
- add downstream funnel quality and retention-weighted KPI support
- support experiment guardrail metrics and rollout holdback groups
- add executive readout exports and experiment governance dashboards
