import { execSync } from 'child_process';
import fs from 'fs';

// Run npm install to generate package-lock.json
console.log('Generating package-lock.json...');
execSync('npm install --package-lock-only', { stdio: 'inherit' });

// Verify package-lock.json was created
if (fs.existsSync('package-lock.json')) {
  console.log('package-lock.json generated successfully.');
} else {
  console.error('Failed to generate package-lock.json');
  process.exit(1);
}
