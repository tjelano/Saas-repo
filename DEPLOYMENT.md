# Supabase Live Deployment Guide

## 1. Create Production Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.io/)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Your production project name
   - **Database Password**: Use a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

## 3. Set Up Database Schema

Your project uses Drizzle ORM. Run these commands to set up your production database:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Run migrations to create tables
npm run migrate
```

## 4. Configure Environment Variables

Create a `.env` file in your production environment with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Database Configuration
DATABASE_URL=postgresql://postgres:vnHUQO13524@db.nxjvuesdhiaotoqlalbk.supabase.co:5432/postgres

# Website URL (for OAuth redirects)
NEXT_PUBLIC_WEBSITE_URL=https://your-domain.com

# OAuth Configuration (Optional)
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_OAUTH_CLIENT_ID=your_github_oauth_client_id
GITHUB_OAUTH_CLIENT_SECRET=your_github_oauth_client_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRICING_TABLE_ID=your_stripe_pricing_table_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Replicate API (if using AI features)
REPLICATE_API_TOKEN=your_replicate_api_token
```

## 5. Configure Supabase Authentication

### Set Up Site URL
1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production domain (e.g., `https://yourdomain.com`)
3. Add these redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com/login`
   - `https://yourdomain.com/signup`

### Configure OAuth Providers (Optional)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Add credentials to Supabase: **Authentication** → **Providers** → **Google**

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Add credentials to Supabase: **Authentication** → **Providers** → **GitHub**

## 6. Set Up Row Level Security (RLS)

Your database tables need RLS policies. Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable RLS on tables
ALTER TABLE users_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs_table ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users_table
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data" ON users_table
    FOR UPDATE USING (auth.uid()::text = id);

-- Designs policies
CREATE POLICY "Users can view own designs" ON designs_table
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own designs" ON designs_table
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own designs" ON designs_table
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own designs" ON designs_table
    FOR DELETE USING (auth.uid()::text = user_id::text);
```

## 7. Deploy Your Application

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

### Other Platforms
- **Netlify**: Add environment variables in site settings
- **Railway**: Add environment variables in project settings
- **DigitalOcean App Platform**: Add environment variables in app settings

## 8. Test Your Deployment

1. Visit your production URL
2. Test signup/signin flow
3. Test OAuth providers (if configured)
4. Test Stripe integration
5. Verify database operations work

## 9. Monitor and Maintain

### Enable Supabase Analytics
1. Go to **Settings** → **Usage**
2. Monitor database usage and performance

### Set Up Logging
1. Go to **Logs** in Supabase dashboard
2. Monitor authentication and database logs

### Backup Strategy
- Supabase automatically backs up your database
- Consider setting up additional backups if needed

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is in Supabase site URL settings
2. **Database Connection**: Verify DATABASE_URL format and credentials
3. **OAuth Redirects**: Check redirect URLs in both Supabase and OAuth provider settings
4. **RLS Policies**: Ensure policies are correctly set up for your use case

### Getting Help
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues) 