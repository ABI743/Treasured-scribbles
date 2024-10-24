const { execSync } = require('child_process');
const fs = require('fs');

// Function to run shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
  }
}

// Update package.json
const packageJson = {
  "name": "treasured-scribbles",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "12.3.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "mongodb": "^4.1.0"
  },
  "devDependencies": {
    "@types/node": "18.11.0",
    "@types/react": "18.0.21",
    "autoprefixer": "^10.4.12",
    "postcss": "^8.4.18",
    "tailwindcss": "^3.2.0",
    "typescript": "4.8.4"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('Updated package.json');

// Run npm install
runCommand('npm install');

console.log('npm install completed');

// Verify package-lock.json exists
if (fs.existsSync('package-lock.json')) {
  console.log('package-lock.json created successfully');
} else {
  console.error('Error: package-lock.json not created');
}

// Update workflow file
const workflowYaml = `
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '14'
          
      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: \${{ runner.OS }}-node-\${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            \${{ runner.OS }}-node-
            
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          MONGODB_URI: \${{ secrets.MONGODB_URI }}
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
`;

fs.writeFileSync('.github/workflows/deploy.yml', workflowYaml);

console.log('Updated .github/workflows/deploy.yml');

console.log('Setup completed successfully');
