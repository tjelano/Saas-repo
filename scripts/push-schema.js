import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

try {
  execSync('npx drizzle-kit push:pg', { stdio: 'inherit' });
  console.log('Schema pushed successfully.');
} catch (error) {
  console.error('Failed to push schema:', error);
  process.exit(1);
} 