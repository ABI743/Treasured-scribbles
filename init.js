const fs = require('fs');
const { execSync } = require('child_process');

const setupScript = `#!/bin/bash

# Update npm to the latest version
npm install -g npm@latest

# Install project dependencies
npm install

# Run the development server
npm run dev

# Build the project for production
npm run build

# Start the production server
npm run start

# Run linting
npm run lint

# Additional commands (commented out by default)

# Create a new Next.js app (uncomment if needed)
# npx create-next-app@latest

# Install additional dependencies (uncomment and modify as needed)
# npm install tailwindcss@latest postcss@latest autoprefixer@latest

# Initialize Tailwind CSS (uncomment if needed)
# npx tailwindcss init -p

# Update all packages to their latest versions (use with caution)
# npm update
`;

// Write the setup.sh file
fs.writeFileSync('setup.sh', setupScript);

// Make the file executable
try {
  execSync('chmod +x setup.sh');
  console.log('setup.sh has been created and made executable.');
} catch (error) {
  console.error('Error making setup.sh executable:', error);
  console.log('You may need to manually make the file executable using: chmod +x setup.sh');
}