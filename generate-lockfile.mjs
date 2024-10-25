import { execSync } from 'child_process';
import fs from 'fs';

try {
  // Verify package.json exists and is valid
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json not found');
  }

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('package.json is valid');

  // Run npm install to generate package-lock.json
  console.log('Generating package-lock.json...');
  execSync('npm install --package-lock-only', { stdio: 'inherit' });

  // Verify package-lock.json was created
  if (fs.existsSync('package-lock.json')) {
    console.log('package-lock.json generated successfully.');
  } else {
    throw new Error('Failed to generate package-lock.json');
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
