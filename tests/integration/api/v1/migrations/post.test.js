import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to api/v1/migrations should retun 200", async () => {
  const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res1.status).toBe(201);

  const resBody1 = await res1.json();
  expect(Array.isArray(resBody1)).toBe(true);
  expect(resBody1.length).toBeGreaterThan(0);

  const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res2.status).toBe(200);

  const resBody2 = await res2.json();
  expect(Array.isArray(resBody2)).toBe(true);
  expect(resBody2.length).toBe(0);
});
