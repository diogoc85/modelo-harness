import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import "./env-loader.js";

const config = loadConfig();
const app = createApp(config);
const server = serve({ fetch: app.fetch, port: config.port });

function shutdown() {
  server.close(() => {
    process.exitCode = 0;
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
