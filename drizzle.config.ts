import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    schema: "./libs/database/src/schemas/*.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    schemaFilter: ["public", "auraflow", "ems", "marketing"],
    verbose: true,
    strict: true,
});
