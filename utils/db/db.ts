import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Add error handling for missing environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);

