import { defineConfig } from "drizzle-kit";
import { config } from 'dotenv';

config({ path: '.env.local' });

export default defineConfig({
    schema: "./utils/db/schema.ts",
    out: "./utils/db/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});