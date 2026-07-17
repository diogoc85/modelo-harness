import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  ALLOWED_ORIGINS: z.string().min(1).default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

export type ApiConfig = {
  port: number;
  allowedOrigins: string[];
  authSecret: string;
  googleClientId: string;
  googleClientSecret: string;
};

export function loadConfig(source: NodeJS.ProcessEnv = process.env): ApiConfig {
  const value = schema.parse(source);
  return {
    port: value.PORT,
    allowedOrigins: value.ALLOWED_ORIGINS.split(",").map((origin) =>
      origin.trim(),
    ),
    authSecret: value.NEXTAUTH_SECRET,
    googleClientId: value.GOOGLE_CLIENT_ID,
    googleClientSecret: value.GOOGLE_CLIENT_SECRET,
  };
}
