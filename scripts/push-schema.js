const { execSync } = require('child_process');

console.log('Pushing database schema...');

try {
  execSync('npx drizzle-kit push', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('Schema push completed successfully!');
} catch (error) {
  console.error('Schema push failed:', error.message);
  process.exit(1);
} 