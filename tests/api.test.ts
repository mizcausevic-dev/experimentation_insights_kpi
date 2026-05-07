import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET /health returns 200", async () => {
  const response = await request(app).get("/health");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.service, "Experimentation Insights KPI");
});

test("GET /api/experiments returns an array", async () => {
  const response = await request(app).get("/api/experiments");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
  assert.ok(response.body.length >= 1);
});

test("POST /api/analyze/lift returns score and status", async () => {
  const response = await request(app).post("/api/analyze/lift").send({
    experimentName: "Enterprise CTA Modernization",
    productArea: "Web Platform",
    primaryKpi: "Demo conversion rate",
    baselineConversionRate: 0.041,
    variantConversionRate: 0.053,
    sampleSize: 18420,
    confidenceLevel: 0.97,
    rollbackRisk: "medium",
    executiveVisibility: true,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.score, "number");
  assert.equal(typeof response.body.status, "string");
});

test("GET /api/findings returns an array", async () => {
  const response = await request(app).get("/api/findings");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test("POST /api/analyze/rollout returns recommended next-step output", async () => {
  const response = await request(app).post("/api/analyze/rollout").send({
    experimentName: "Enterprise CTA Modernization",
    productArea: "Web Platform",
    primaryKpi: "Demo conversion rate",
    baselineConversionRate: 0.041,
    variantConversionRate: 0.053,
    sampleSize: 18420,
    confidenceLevel: 0.97,
    rollbackRisk: "medium",
    executiveVisibility: true,
  });

  assert.equal(response.status, 200);
  assert.equal(typeof response.body.priority, "string");
  assert.equal(typeof response.body.recommendedNextAction, "string");
});
