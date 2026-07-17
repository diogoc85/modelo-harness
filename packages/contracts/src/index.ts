import { z } from "zod";

export const healthResponseSchema = z.object({
  status: z.enum(["ok", "degraded"]),
});
export type HealthResponse = z.infer<typeof healthResponseSchema>;
