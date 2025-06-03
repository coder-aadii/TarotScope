/**
 * Logger utility for TarotScope
 * 
 * This utility provides logging functions that respect the current environment.
 * In production, info and debug logs are suppressed to reduce overhead.
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Log informational messages (suppressed in production)
 * @param {...any} args - Arguments to log
 */
const info = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

/**
 * Log debug messages (suppressed in production)
 * @param {...any} args - Arguments to log
 */
const debug = (...args) => {
  if (!isProduction) {
    console.log(...args);
  }
};

/**
 * Log warning messages (shown in all environments)
 * @param {...any} args - Arguments to log
 */
const warn = (...args) => {
  console.warn(...args);
};

/**
 * Log error messages (shown in all environments)
 * @param {...any} args - Arguments to log
 */
const error = (...args) => {
  console.error(...args);
};

module.exports = {
  info,
  debug,
  warn,
  error
};