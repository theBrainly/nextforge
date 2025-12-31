const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const version = process.argv[2]; // e.g., 'v1', 'v2', 'v3'

if (!version || !['v1', 'v2', 'v3'].includes(version)) {
    console.error('Please provide a version: v1, v2, or v3');
    process.exit(1);
}

const sourceDirName = `nextjs-${version}`;
const rootDir = path.resolve(__dirname, '..');
const sourcePath = path.join(rootDir, sourceDirName);
const distPath = path.join(rootDir, 'dist', sourceDirName);
const templatePath = path.join(distPath, 'template');

console.log(`Building CLI for ${sourceDirName}...`);

// 1. Clean dist
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(templatePath, { recursive: true });

// 2. Copy source to template (excluding node_modules, .next, .git)
console.log('Copying template files...');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        // Exclude directories
        if (['node_modules', '.next', '.git', 'dist'].includes(path.basename(src))) return;

        fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        // Exclude files
        if (['.env', '.env.local', '.DS_Store'].includes(path.basename(src))) return;
        fs.copyFileSync(src, dest);
    }
}

copyRecursiveSync(sourcePath, templatePath);

// 3. Rename package.json to _package.json to avoid npm installing its deps for the CLI itself
const pkgPath = path.join(templatePath, 'package.json');
if (fs.existsSync(pkgPath)) {
    fs.renameSync(pkgPath, path.join(templatePath, '_package.json'));
}

// 4. Create CLI package.json
const sourcePkg = require(path.join(sourcePath, 'package.json'));
const cliPkg = {
    name: sourceDirName, // e.g., nextjs-v1
    version: sourcePkg.version,
    description: `CLI to scaffold ${sourcePkg.description}`,
    bin: {
        [sourceDirName]: "./bin/index.js" // e.g. nextjs-v1
    },
    scripts: {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    author: sourcePkg.author || "",
    license: sourcePkg.license || "ISC",
    dependencies: {
    }
};

fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(cliPkg, null, 2));

// 5. Create bin/index.js
const binDir = path.join(distPath, 'bin');
fs.mkdirSync(binDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'templates', 'cli-index.js'), path.join(binDir, 'index.js'));
fs.chmodSync(path.join(binDir, 'index.js'), '755'); // Make executable

// 6. Copy README
if (fs.existsSync(path.join(sourcePath, 'README.md'))) {
    fs.copyFileSync(path.join(sourcePath, 'README.md'), path.join(distPath, 'README.md'));
}

console.log(`\nBuild complete for ${sourceDirName}!`);
console.log(`Directory: ${distPath}`);
console.log(`\nTo test locally:`);
console.log(`  cd ${distPath}`);
console.log(`  npm link`);
console.log(`  cd ../..`);
console.log(`  ${sourceDirName} my-test-app`);
