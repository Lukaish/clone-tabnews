import orchestrator from "tests/orchestrator.js";

// hook executado antes dos testes
beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to api/v1/status should retun 200", async () => {
  const res = await fetch("http://localhost:3000/api/v1/status");
  expect(res.status).toBe(200);

  const resBody = await res.json();
  expect(resBody.updated_at).toBeDefined();

  const parseUpdateAt = new Date(resBody.updated_at).toISOString();
  expect(resBody.updated_at).toEqual(parseUpdateAt);

  expect(resBody.dependecies.database.version).toEqual("17.4");
  expect(resBody.dependecies.database.max_connections).toEqual(100);
  expect(resBody.dependecies.database.opened_connections).toEqual(1);
  // expect(Object.keys(resBody.dependecies.database).length).toEqual(3);
});
