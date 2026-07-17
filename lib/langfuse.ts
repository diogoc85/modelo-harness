import { Langfuse } from "langfuse";
import { env } from "../db/env";

export const langfuse = new Langfuse({
  publicKey: env.LANGFUSE_PUBLIC_KEY || "pk-lf-placeholder",
  secretKey: env.LANGFUSE_SECRET_KEY || "sk-lf-placeholder",
  baseUrl: env.LANGFUSE_HOST || "https://cloud.langfuse.com",
});
