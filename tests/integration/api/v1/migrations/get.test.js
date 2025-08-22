import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

// hook executado antes dos testes
beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("GET to api/v1/migrations should retun 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/migrations");
  expect(res.status).toBe(200);

  const resBody = await res.json();

  expect(Array.isArray(resBody)).toBe(true);
  expect(resBody.length).toBeGreaterThan(0);
});
