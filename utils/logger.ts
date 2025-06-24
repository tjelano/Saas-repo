/**
 * Structured Logging Utility
 * Provides consistent logging across the application with different log levels
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatLog(entry: LogEntry): string {
    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const base = `[${entry.timestamp}] ${levelNames[entry.level]}: ${entry.message}`;
    
    if (entry.context) {
      return `${base} ${JSON.stringify(entry.context)}`;
    }
    
    return base;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
    };

    const formatted = this.formatLog(entry);
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.ERROR:
        console.error(formatted);
        if (error) {
          console.error('Error details:', error);
        }
        break;
    }
  }

  debug(message: string, context?: Record<string, any>) {
    this.log(LogLevel.DEBUG, message, context);
  }

  info(message: string, context?: Record<string, any>) {
    this.log(LogLevel.INFO, message, context);
  }

  warn(message: string, context?: Record<string, any>) {
    this.log(LogLevel.WARN, message, context);
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log(LogLevel.ERROR, message, context, error);
  }

  // API-specific logging methods
  apiRequest(method: string, path: string, userId?: string) {
    this.info('API Request', { method, path, userId });
  }

  apiResponse(method: string, path: string, statusCode: number, duration: number) {
    this.info('API Response', { method, path, statusCode, duration });
  }

  authEvent(event: string, userId?: string, context?: Record<string, any>) {
    this.info('Auth Event', { event, userId, ...context });
  }

  databaseOperation(operation: string, table: string, userId?: string) {
    this.debug('Database Operation', { operation, table, userId });
  }
}

// Create default logger instance
export const logger = new Logger(
  process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
);

// Export for use in other files
export default logger; 