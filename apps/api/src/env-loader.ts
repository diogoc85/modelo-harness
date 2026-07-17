import path from "path";
import dotenv from "dotenv";

// Carrega as variáveis de ambiente do arquivo .env localizado na raiz do monorepo antes de qualquer outro import
dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") });
