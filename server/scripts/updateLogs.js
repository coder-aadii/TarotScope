/**
 * Script to update console.log calls to use the logger utility
 * 
 * This script can be run to update all console.log, console.error, and console.warn calls
 * in the project to use the logger utility instead.
 * 
 * Usage:
 * node scripts/updateLogs.js
 */

const fs = require('fs');
const path = require('path');

// Directories to exclude
const excludeDirs = ['node_modules', 'tests', '.git'];

// File extensions to process
const extensions = ['.js'];

// Function to recursively process files in a directory
function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !excludeDirs.includes(file)) {
      processDirectory(filePath);
    } else if (stat.isFile() && extensions.includes(path.extname(file))) {
      processFile(filePath);
    }
  }
}

// Function to process a single file
function processFile(filePath) {
  logger.debug(`Processing ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if the file already imports the logger
  const hasLoggerImport = content.includes("const logger = require('./utils/logger')") || 
                          content.includes("const logger = require('../utils/logger')") ||
                          content.includes("const logger = require('../../utils/logger')");
  
  // Add logger import if needed
  if (!hasLoggerImport && (content.includes('console.log') || content.includes('console.error') || content.includes('console.warn'))) {
    // Determine the correct relative path to the logger
    let relativePath = '';
    const relativeToRoot = path.relative(path.dirname(filePath), path.resolve(__dirname, '..'));
    
    if (relativeToRoot === '') {
      relativePath = './utils/logger';
    } else if (relativeToRoot === '..') {
      relativePath = '../utils/logger';
    } else {
      const depth = relativeToRoot.split(path.sep).length;
      relativePath = '../'.repeat(depth) + 'utils/logger';
    }
    
    // Add the import statement after other requires
    const importStatement = `const logger = require('${relativePath}');\n`;
    
    // Find a good place to insert the import
    const lastRequireIndex = content.lastIndexOf('require(');
    if (lastRequireIndex !== -1) {
      const endOfLineIndex = content.indexOf('\n', lastRequireIndex);
      if (endOfLineIndex !== -1) {
        content = content.slice(0, endOfLineIndex + 1) + importStatement + content.slice(endOfLineIndex + 1);
        modified = true;
      }
    }
  }
  
  // Replace console.log with logger.info or logger.debug
  if (content.includes('console.log')) {
    content = content.replace(/console\.log\(/g, 'logger.debug(');
    modified = true;
  }
  
  // Replace console.error with logger.error
  if (content.includes('console.error')) {
    content = content.replace(/console\.error\(/g, 'logger.error(');
    modified = true;
  }
  
  // Replace console.warn with logger.warn
  if (content.includes('console.warn')) {
    content = content.replace(/console\.warn\(/g, 'logger.warn(');
    modified = true;
  }
  
  // Save the modified file
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    logger.debug(`Updated ${filePath}`);
  }
}

// Start processing from the server directory
const serverDir = path.resolve(__dirname, '..');
processDirectory(serverDir);

logger.debug('Done updating log calls!');