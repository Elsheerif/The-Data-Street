/**
 * Environment variable validation for production deployment
 * Ensures all required environment variables are set with correct format
 */

interface EnvValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateEnvironment(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required variables
  const required = {
    DATABASE_URL: 'PostgreSQL connection string',
    NEXT_PUBLIC_API_URL: 'API base URL',
  };

  for (const [key, description] of Object.entries(required)) {
    if (!process.env[key]) {
      errors.push(`Missing ${key}: ${description}`);
    }
  }

  // Validate DATABASE_URL format
  if (process.env.DATABASE_URL) {
    if (!process.env.DATABASE_URL.startsWith('postgresql://')) {
      errors.push('DATABASE_URL must use postgresql:// protocol');
    }
  }

  // Production-specific checks
  if (process.env.NODE_ENV === 'production') {
    // Security checks
    if (!process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET.includes('dev-secret')) {
      errors.push('ADMIN_SESSION_SECRET must be set to a secure random value for production');
    }

    if (!process.env.ADMIN_PASSWORD_HASH) {
      errors.push('ADMIN_PASSWORD_HASH must be set in production (use bcrypt hash)');
    }

    // Database security
    if (process.env.DATABASE_URL?.includes('localhost')) {
      warnings.push('DATABASE_URL points to localhost - ensure proper network setup for production');
    }

    // HTTPS check
    if (process.env.NEXT_PUBLIC_API_URL?.startsWith('http://')) {
      warnings.push('API URL uses HTTP - ensure HTTPS is used in production');
    }
  }

  // Development warnings
  if (process.env.NODE_ENV === 'development') {
    if (process.env.DATABASE_URL?.includes('datastreet_dev')) {
      console.log('✓ Using development database (datastreet_dev)');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Log environment validation results
 */
export function logEnvironmentValidation(): void {
  const result = validateEnvironment();

  if (result.errors.length > 0) {
    console.error('❌ Environment validation failed:');
    result.errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  if (result.warnings.length > 0) {
    console.warn('⚠️  Environment warnings:');
    result.warnings.forEach(warn => console.warn(`  - ${warn}`));
  }

  if (result.valid) {
    console.log('✓ Environment validation passed');
  }
}

/**
 * Get database name from DATABASE_URL
 */
export function getDatabaseName(): string {
  const url = process.env.DATABASE_URL || '';
  const match = url.match(/\/([^?]+)/);
  return match?.[1] || 'unknown';
}

/**
 * Check if connected to production database
 */
export function isProductionDatabase(): boolean {
  const dbName = getDatabaseName();
  return !dbName.includes('dev') && !dbName.includes('test') && !dbName.includes('localhost');
}
