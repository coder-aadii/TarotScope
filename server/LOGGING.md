# Logging in TarotScope

This document explains the logging system implemented in TarotScope to reduce server overhead and improve performance in production.

## Overview

We've implemented a custom logging utility that respects the current environment:

- In development, all logs are displayed to help with debugging
- In production, only warnings and errors are shown to reduce overhead

## Logger Utility

The logger utility (`utils/logger.js`) provides four logging levels:

1. **debug**: For detailed debugging information (suppressed in production)
2. **info**: For general information (suppressed in production)
3. **warn**: For warnings (shown in all environments)
4. **error**: For errors (shown in all environments)

## Usage

```javascript
const logger = require('../utils/logger');

// Debug logs (only shown in development)
logger.debug('Detailed debugging information');

// Info logs (only shown in development)
logger.info('General information');

// Warning logs (shown in all environments)
logger.warn('Warning message');

// Error logs (shown in all environments)
logger.error('Error message');
```

## Environment Configuration

The logger checks the `NODE_ENV` environment variable to determine the current environment:

```javascript
const isProduction = process.env.NODE_ENV === 'production';
```

To run the server in production mode, set the `NODE_ENV` environment variable to `production`:

```bash
# Linux/Mac
export NODE_ENV=production
node server.js

# Windows
set NODE_ENV=production
node server.js
```

## Updating Existing Code

We've provided a script to update all console.log calls in the project to use the logger utility:

```bash
node scripts/updateLogs.js
```

This script will:

1. Add the logger import to files that use console.log, console.error, or console.warn
2. Replace console.log calls with logger.debug
3. Replace console.error calls with logger.error
4. Replace console.warn calls with logger.warn

## Benefits

This logging system provides several benefits:

1. **Reduced overhead**: In production, debug and info logs are suppressed, reducing CPU and memory usage
2. **Cleaner logs**: Production logs only contain important information (warnings and errors)
3. **Consistent logging**: All logs use the same format and can be easily filtered
4. **Flexibility**: The logging system can be extended to support additional features like log rotation or remote logging

## Best Practices

1. Use the appropriate log level for each message:
   - `debug` for detailed debugging information
   - `info` for general information
   - `warn` for warnings
   - `error` for errors

2. Include relevant context in log messages:
   - For errors, include the error object: `logger.error('Error processing request:', error)`
   - For user actions, include the user ID: `logger.info('User logged in:', userId)`

3. Avoid logging sensitive information:
   - Don't log passwords, tokens, or other sensitive data
   - Be careful with user data (PII)