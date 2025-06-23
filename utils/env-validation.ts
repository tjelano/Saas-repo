/**
 * Environment Variable Validation Utility
 * This utility checks for all required environment variables and provides clear error messages.
 */

interface EnvValidationResult {
  isValid: boolean;
  missing: string[];
  errors: string[];
}

export function validateEnvironmentVariables(): EnvValidationResult {
  const required = {
    // Supabase
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    
    // Database
    'DATABASE_URL': process.env.DATABASE_URL,
    
    // Stripe
    'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY,
    'STRIPE_PUBLISHABLE_KEY': process.env.STRIPE_PUBLISHABLE_KEY,
    'STRIPE_PRICING_TABLE_ID': process.env.STRIPE_PRICING_TABLE_ID,
    'STRIPE_WEBHOOK_SECRET': process.env.STRIPE_WEBHOOK_SECRET,
    
    // Website URL
    'NEXT_PUBLIC_WEBSITE_URL': process.env.NEXT_PUBLIC_WEBSITE_URL,
    
    // AI/Replicate
    'REPLICATE_API_TOKEN': process.env.REPLICATE_API_TOKEN,
  };

  const missing: string[] = [];
  const errors: string[] = [];

  // Check for missing required variables
  Object.entries(required).forEach(([key, value]) => {
    if (!value) {
      missing.push(key);
      errors.push(`${key} is not set`);
    }
  });

  // Additional validation for specific variables
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('https://')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL should start with https://');
  }

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgresql://')) {
    errors.push('DATABASE_URL should start with postgresql://');
  }

  if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    errors.push('STRIPE_SECRET_KEY should start with sk_');
  }

  if (process.env.STRIPE_PUBLISHABLE_KEY && !process.env.STRIPE_PUBLISHABLE_KEY.startsWith('pk_')) {
    errors.push('STRIPE_PUBLISHABLE_KEY should start with pk_');
  }

  return {
    isValid: missing.length === 0 && errors.length === 0,
    missing,
    errors
  };
}

export function logEnvironmentValidation(): void {
  const result = validateEnvironmentVariables();
  
  if (result.isValid) {
    console.log('✅ All environment variables are properly configured');
  } else {
    console.error('❌ Environment variable validation failed:');
    if (result.missing.length > 0) {
      console.error('Missing variables:', result.missing);
    }
    if (result.errors.length > 0) {
      console.error('Validation errors:', result.errors);
    }
  }
}

// Optional variables (for features that can be disabled)
export function getOptionalEnvironmentVariables() {
  return {
    // OAuth (optional)
    'GOOGLE_OAUTH_CLIENT_ID': process.env.GOOGLE_OAUTH_CLIENT_ID,
    'GOOGLE_OAUTH_CLIENT_SECRET': process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    'GITHUB_OAUTH_CLIENT_ID': process.env.GITHUB_OAUTH_CLIENT_ID,
    'GITHUB_OAUTH_CLIENT_SECRET': process.env.GITHUB_OAUTH_CLIENT_SECRET,
  };
} 