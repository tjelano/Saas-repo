import { config } from 'dotenv';
import postgres from 'postgres';

// Load environment variables
config({ path: '.env.local' });

const DATABASE_URLS = [
  'postgresql://postgres.nxjvuesdhiaotoqlalbk:vnHUQO13524@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  'postgresql://postgres.nxjvuesdhiaotoqlalbk:vnHUQO13524@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
  process.env.DATABASE_URL // Original one
].filter(Boolean);

console.log('🔍 Testing database connections...');

for (let i = 0; i < DATABASE_URLS.length; i++) {
  const DATABASE_URL = DATABASE_URLS[i];
  console.log(`\n📡 Testing connection ${i + 1}/${DATABASE_URLS.length}:`);
  console.log('URL:', DATABASE_URL.replace(/:[^:@]*@/, ':****@')); // Hide password

  try {
    const sql = postgres(DATABASE_URL, {
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    console.log('⏳ Attempting to connect...');
    
    const result = await sql`SELECT version()`;
    console.log('✅ Database connection successful!');
    console.log('📊 PostgreSQL version:', result[0].version);
    
    await sql.end();
    console.log('🔌 Connection closed');
    
    // If we get here, this connection works
    console.log(`\n🎉 SUCCESS! Connection ${i + 1} works.`);
    console.log('💡 Update your .env.local with this DATABASE_URL:');
    console.log(DATABASE_URL);
    
    process.exit(0);
    
  } catch (error) {
    console.error(`❌ Connection ${i + 1} failed:`);
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ETIMEDOUT') {
      console.log('💡 This is a timeout error - network connectivity issue');
    }
  }
}

console.log('\n❌ All database connections failed.');
console.log('💡 Possible solutions:');
console.log('1. Check if your network allows outbound connections to ports 5432/6543');
console.log('2. Verify the credentials are correct');
console.log('3. Check if Supabase database is accessible from your location');
console.log('4. Try using a VPN or different network');
console.log('5. Contact Supabase support if the issue persists');

process.exit(1); 