import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "codex-software-template" });
}
