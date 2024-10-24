const { execSync } = require('child_process');

// Function to run shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
  }
}

// Install additional dependencies
const additionalDependencies = [
  'tailwindcss@latest',
  'postcss@latest',
  'autoprefixer@latest'
];

console.log('Installing additional dependencies...');
runCommand(`npm install ${additionalDependencies.join(' ')}`);

// Initialize Tailwind CSS
console.log('Initializing Tailwind CSS...');
runCommand('npx tailwindcss init -p');

console.log('All dependencies installed and configured successfully');
