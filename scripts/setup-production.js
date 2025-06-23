const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Supabase for production...\n');

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    console.log('Please set your production DATABASE_URL before running this script.');
    console.log('Example: export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"');
    process.exit(1);
}

// Check if Supabase URL and key are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('❌ Supabase environment variables are not set!');
    console.log('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
}

try {
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('\n🗄️  Running database migrations...');
    execSync('npm run migrate', { stdio: 'inherit' });
    
    console.log('\n✅ Production setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Set up Row Level Security (RLS) policies in Supabase dashboard');
    console.log('2. Configure OAuth providers if needed');
    console.log('3. Set up Stripe webhooks');
    console.log('4. Deploy your application');
    
} catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
} 