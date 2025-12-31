#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectDir = process.argv[2] || 'my-nextjs-app';
const currentDir = process.cwd();
const projectPath = path.join(currentDir, projectDir);

if (fs.existsSync(projectPath)) {
    console.error(`Error: Directory ${projectDir} already exists.`);
    process.exit(1);
}

console.log(`Creating a new Next.js app in ${projectPath}...`);
fs.mkdirSync(projectPath, { recursive: true });

// Copy template files
const templateDir = path.join(__dirname, '..', 'template');
if (!fs.existsSync(templateDir)) {
    console.error('Error: Template directory not found. This package might be corrupted.');
    process.exit(1);
}

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

copyRecursiveSync(templateDir, projectPath);

// Rename _package.json to package.json
const packageJsonPath = path.join(projectPath, 'package.json');
const underscorePackageJsonPath = path.join(projectPath, '_package.json');

if (fs.existsSync(underscorePackageJsonPath)) {
    fs.renameSync(underscorePackageJsonPath, packageJsonPath);
}

// Update package.json name
if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    pkg.name = projectDir;
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
}

console.log('Installing dependencies...');
try {
    execSync('npm install', { cwd: projectPath, stdio: 'inherit' });
    console.log('\nSuccess! Created project at', projectPath);
    console.log('Inside that directory, you can run several commands:\n');
    console.log('  npm run dev');
    console.log('    Starts the development server.\n');
    console.log('  npm run build');
    console.log('    Builds the app for production.\n');
    console.log('  npm start');
    console.log('    Runs the built app in production mode.\n');
    console.log('We suggest that you begin by typing:\n');
    console.log(`  cd ${projectDir}`);
    console.log('  npm run dev');
} catch (error) {
    console.error('Error installing dependencies:', error);
}
