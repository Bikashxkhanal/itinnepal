import { describe, it, expect } from "vitest";
import { GET } from "@/app/health/route";

describe("GET /health", () => {
  it("returns status ok with timestamp and uptime", async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe("ok");
    expect(data.service).toBe("itinnepal-web");
    expect(data).toHaveProperty("timestamp");
    expect(data).toHaveProperty("uptime");
  });
});
