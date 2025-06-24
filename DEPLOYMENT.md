# Deployment Guide

This guide will help you deploy your Next.js SaaS application with Supabase, Stripe, and Replicate.

## 1. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_supabase_database_url

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_PRICING_TABLE_ID=your_stripe_pricing_table_id
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Website URL
NEXT_PUBLIC_WEBSITE_URL=your_website_url

# AI/Replicate
REPLICATE_API_TOKEN=your_replicate_api_token

# Optional: OAuth Providers
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
GITHUB_OAUTH_CLIENT_ID=your_github_oauth_client_id
GITHUB_OAUTH_CLIENT_SECRET=your_github_oauth_client_secret
```

## 2. Set Up Supabase

### Create a New Project
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### Run Database Migrations
1. Update your `.env.local` with your Supabase credentials
2. Run: `npm run migrate`

### Set Up Row Level Security (RLS)
**IMPORTANT**: Run this SQL script in your Supabase SQL Editor to enable RLS:

```sql
-- Copy and paste the contents of scripts/setup-rls.sql
-- Or run the following commands:

-- Enable RLS on all tables
ALTER TABLE users_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE designs_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_images ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own data" ON users_table
    FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data" ON users_table
    FOR UPDATE USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own data" ON users_table
    FOR INSERT WITH CHECK (auth.uid()::text = id);

-- Designs policies
CREATE POLICY "Users can view own designs" ON designs_table
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own designs" ON designs_table
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own designs" ON designs_table
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own designs" ON designs_table
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Generated Images policies
CREATE POLICY "Users can view own generated images" ON generated_images
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own generated images" ON generated_images
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own generated images" ON generated_images
    FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own generated images" ON generated_images
    FOR DELETE USING (auth.uid()::text = user_id::text);

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON users_table TO authenticated;
GRANT ALL ON designs_table TO authenticated;
GRANT ALL ON generated_images TO authenticated;
```

## 3. Configure Supabase Authentication

### Set Up Site URL
1. Go to **Authentication** → **URL Configuration**
2. Set **Site URL** to your production domain (e.g., `https://yourdomain.com`)
3. Add these redirect URLs:
   - `https://yourdomain.com/auth/callback`
   - `https://yourdomain.com/login`
   - `https://yourdomain.com/signup`
   - `https://yourdomain.com/forgot-password`

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

## 4. Set Up Stripe

### Create Stripe Account
1. Go to [Stripe](https://stripe.com)
2. Create an account and get your API keys
3. Set up your pricing table

### Configure Webhooks
1. Go to **Developers** → **Webhooks**
2. Add endpoint: `https://yourdomain.com/webhook/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Copy the webhook secret to your environment variables

## 5. Set Up Replicate

### Get API Token
1. Go to [Replicate](https://replicate.com)
2. Sign up and get your API token
3. Add to environment variables

## 6. Deploy Your Application

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

### Other Platforms
- **Netlify**: Add environment variables in site settings
- **Railway**: Add environment variables in project settings
- **DigitalOcean App Platform**: Add environment variables in app settings

## 7. Test Your Deployment

1. Visit your production URL
2. Test signup/signin flow
3. Test OAuth providers (if configured)
4. Test Stripe integration
5. Test AI image generation
6. Verify database operations work with RLS

## 8. Monitor and Maintain

### Enable Supabase Analytics
1. Go to **Settings** → **Usage**
2. Monitor database usage and performance

### Set Up Logging
1. Check application logs in your deployment platform
2. Monitor authentication and database logs in Supabase
3. Use the structured logging utility for better debugging

### Backup Strategy
- Supabase automatically backs up your database
- Consider setting up additional backups if needed

## Security Checklist

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ API routes protected with authentication
- ✅ Environment variables properly configured
- ✅ Webhook signatures verified
- ✅ Input validation implemented
- ✅ Error handling and logging in place
- ✅ HTTPS enabled in production

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your domain is in Supabase site URL settings
2. **Database Connection**: Verify DATABASE_URL format and credentials
3. **OAuth Redirects**: Check redirect URLs in both Supabase and OAuth provider settings
4. **RLS Policies**: Ensure policies are correctly set up for your use case
5. **Webhook Failures**: Verify webhook secret and endpoint URL

### Getting Help
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com/)
- [GitHub Issues](https://github.com/supabase/supabase/issues) 