import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending mihrations", () => {
      test("For the first time", async () => {
        const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(res1.status).toBe(201);

        const resBody1 = await res1.json();
        expect(Array.isArray(resBody1)).toBe(true);
        expect(resBody1.length).toBeGreaterThan(0);
      });

      test("For the second time", async () => {
        const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(res2.status).toBe(200);

        const resBody2 = await res2.json();
        expect(Array.isArray(resBody2)).toBe(true);
        expect(resBody2.length).toBe(0);
      });
    });
  });
});
