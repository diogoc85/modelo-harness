import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const app = createApp({
  port: 3001,
  allowedOrigins: ["http://localhost:3000"],
  authSecret: "test-secret-that-is-long-enough-for-auth",
  googleClientId: "test-client",
  googleClientSecret: "test-secret",
});

describe("API", () => {
  it("reports liveness", async () => {
    const response = await app.request("/api/health/live");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "ok" });
  });

  it("does not expose the former public users endpoint", async () => {
    const response = await app.request("/api/users");
    expect(response.status).toBe(404);
  });

  it("does not allow an unknown CORS origin", async () => {
    const response = await app.request("/api/health/live", {
      headers: { origin: "https://evil.example" },
    });
    expect(response.headers.get("access-control-allow-origin")).toBeNull();
  });
});
