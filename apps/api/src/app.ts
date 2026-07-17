import GoogleProvider from "@auth/core/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import { checkDatabase, db } from "@repo/database";
import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiConfig } from "./config.js";

export function createApp(config: ApiConfig) {
  const app = new Hono();

  app.use(
    "/api/*",
    cors({
      origin: (origin) =>
        config.allowedOrigins.includes(origin) ? origin : "",
      credentials: true,
    }),
  );

  app.use(
    "/api/auth/*",
    initAuthConfig(() => ({
      secret: config.authSecret,
      adapter: DrizzleAdapter(db),
      providers: [
        GoogleProvider({
          clientId: config.googleClientId,
          clientSecret: config.googleClientSecret,
        }),
      ],
      session: { strategy: "jwt" },
    })),
  );
  app.all("/api/auth/*", authHandler());

  app.get("/api/health/live", (context) => context.json({ status: "ok" }));
  app.get("/api/health/ready", async (context) => {
    try {
      await checkDatabase();
      return context.json({ status: "ok" });
    } catch {
      return context.json({ status: "degraded" }, 503);
    }
  });

  app.get("/api/protected", verifyAuth(), (context) => {
    const auth = context.get("authUser");
    return context.json({ message: "Acesso autorizado!", user: auth.user });
  });

  app.notFound((context) => context.json({ error: "not_found" }, 404));
  app.onError((error, context) => {
    console.error("request_failed", { message: error.message });
    return context.json({ error: "internal_error" }, 500);
  });

  return app;
}
