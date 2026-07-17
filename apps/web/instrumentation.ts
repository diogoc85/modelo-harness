import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "antigravity-ultimate-harness-template" });
}
