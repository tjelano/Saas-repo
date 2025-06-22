const { execSync } = require('child_process');

console.log('Running database migrations...');

try {
  execSync('npx drizzle-kit migrate', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('Migrations completed successfully!');
} catch (error) {
  console.error('Migration failed:', error.message);
  process.exit(1);
} 