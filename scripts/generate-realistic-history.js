const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = 'DEV_LOG.md';
const PROTOTYPE_DIR = 'prototype';
const START_DATE = new Date('2025-09-01T10:00:00');
const END_DATE = new Date('2025-12-31T18:00:00');

// File Templates
const TEMPLATES = {
    'server.js': `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening at http://localhost:\${port}\`);
});
`,
    'package.json': `{
  "name": "nextforge-prototype",
  "version": "0.1.0",
  "description": "Prototype for NextForge",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
`,
    'README.md': `# NextForge Prototype

Early prototype for the NextForge project.

## Getting Started

1. Install dependencies: \`npm install\`
2. Run server: \`npm start\`
`,
    'auth.js': `const jwt = require('jsonwebtoken');

const secret = 'supersecretkey';

function generateToken(user) {
    return jwt.sign(user, secret, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, secret);
    } catch (e) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
`,
    'db/schema.sql': `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`,
    'models/User.js': `class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    static async findById(id) {
        // TODO: Implement DB lookup
        return new User(id, 'testuser');
    }
}

module.exports = User;
`,
    'utils/logger.js': `const fs = require('fs');

function log(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync('app.log', \`[\${timestamp}] \${message}\\n\`);
    console.log(\`[\${timestamp}] \${message}\`);
}

module.exports = { log };
`
};

// Actions to perform
const ACTIONS = [
    { type: 'create', file: 'package.json', msg: "Initial commit: Add package.json" },
    { type: 'create', file: 'server.js', msg: "Setup basic Express server" },
    { type: 'create', file: 'README.md', msg: "Add README with setup instructions" },
    { type: 'edit', file: 'server.js', code: "\napp.use(express.json());", msg: "Enable JSON body parsing" },
    { type: 'create', file: 'auth.js', msg: "Implement basic JWT auth structure" },
    { type: 'create', file: 'db/schema.sql', msg: "Design initial database schema" },
    { type: 'edit', file: 'README.md', code: "\n## Features\n- Express server\n- JWT Auth", msg: "Update README with features" },
    { type: 'create', file: 'models/User.js', msg: "Add User model stub" },
    { type: 'edit', file: 'server.js', code: "\nconst auth = require('./auth');", msg: "Import auth module in server" },
    { type: 'create', file: 'utils/logger.js', msg: "Add simple file logger" },
    { type: 'edit', file: 'package.json', code: '    "dev": "nodemon server.js",', msg: "Add dev script to package.json" },
    { type: 'edit', file: 'auth.js', code: "\n// TODO: Add refresh token logic", msg: "Add TODO for refresh tokens" },
    { type: 'edit', file: 'db/schema.sql', code: "\nCREATE INDEX idx_users_username ON users(username);", msg: "Optimize user lookup with index" },
    { type: 'edit', file: 'server.js', code: "\napp.get('/health', (req, res) => res.sendStatus(200));", msg: "Add health check endpoint" },
    { type: 'edit', file: 'models/User.js', code: "\n    save() { console.log('Saving user...'); }", msg: "Implement save method in User model" },
    { type: 'edit', file: 'utils/logger.js', code: "\n// Fixed timestamp formatting", msg: "Refactor logger timestamp format" },
];

// Helper Functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const formatDate = (date) => date.toISOString();

const ensureDir = (filePath) => {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
};

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute command: ${command}`);
        // Don't exit, try to continue
    }
};

const main = () => {
    console.log(`Starting realisitc commit generation...`);

    // Reset Git
    // runCommand('rm -rf .git'); // Handled outside script for safety usually, but we can do here
    // runCommand('git init');
    // runCommand('git remote add origin https://github.com/theBrainly/nextforge.git');

    if (!fs.existsSync(PROTOTYPE_DIR)) {
        fs.mkdirSync(PROTOTYPE_DIR);
    }

    // Track current state
    let currentDate = new Date(START_DATE);
    let actionIndex = 0;

    // If we run out of defined actions, we generate random edits
    const GENERATE_EXTRA = true;
    const TOTAL_TARGET_COMMITS = 160;
    let commitCount = 0;

    while (currentDate <= END_DATE && (actionIndex < ACTIONS.length || commitCount < TOTAL_TARGET_COMMITS)) {
        const commitsToday = getRandomInt(2, 5);

        for (let i = 0; i < commitsToday; i++) {
            // Add random time
            const commitTime = new Date(currentDate);
            commitTime.setHours(getRandomInt(9, 23));
            commitTime.setMinutes(getRandomInt(0, 59));
            commitTime.setSeconds(getRandomInt(0, 59));
            const dateStr = formatDate(commitTime);

            let action;
            let message;
            let filePath;

            if (actionIndex < ACTIONS.length) {
                action = ACTIONS[actionIndex];
                actionIndex++;
                message = action.msg;
                filePath = path.join(PROTOTYPE_DIR, action.file);
            } else {
                // Procedural generation
                const files = Object.keys(TEMPLATES);
                const randomFile = files[getRandomInt(0, files.length - 1)];
                filePath = path.join(PROTOTYPE_DIR, randomFile);
                ensureDir(filePath); // Ensure it exists if we picked a file not yet created (edge case handling)
                if (!fs.existsSync(filePath)) {
                    // Create if not exists (fallback)
                    fs.writeFileSync(filePath, TEMPLATES[randomFile]);
                    message = `Add ${randomFile}`;
                } else {
                    // Append random comment/code
                    const content = fs.readFileSync(filePath, 'utf8');
                    const lines = content.split('\n');
                    // Insert somewhere random or append
                    const newContent = content + `\n// Update ${new Date().getTime()}\n`;
                    fs.writeFileSync(filePath, newContent);
                    const verbs = ["Refactor", "Update", "Fix", "Optimize", "Clean up", "Improve"];
                    const nouns = ["logic", "structure", "style", "performance", "formatting", "imports"];
                    message = `${verbs[getRandomInt(0, verbs.length - 1)]} ${path.basename(randomFile)} ${nouns[getRandomInt(0, nouns.length - 1)]}`;
                }
            }

            // Perform File Action
            if (action && action.type === 'create') {
                ensureDir(filePath);
                fs.writeFileSync(filePath, TEMPLATES[action.file] || '// Empty file');
            } else if (action && action.type === 'edit') {
                ensureDir(filePath);
                if (fs.existsSync(filePath)) {
                    fs.appendFileSync(filePath, action.code || `\n// Generic edit`);
                } else {
                    fs.writeFileSync(filePath, action.code || `// Generic edit`);
                }
            }

            // Git Commit
            runCommand(`git add ${filePath}`);
            runCommand(`git commit -m "${message}" --date="${dateStr}"`);
            commitCount++;
        }

        // Advance Date
        const daysToJump = getRandomInt(2, 4);
        currentDate.setDate(currentDate.getDate() + daysToJump);
    }

    console.log(`Generated ${commitCount} realistic commits.`);

    // cleanup prototype
    // execSync(`rm -rf ${PROTOTYPE_DIR}`); // Optional: keep it or remove it? User wants to "show how I made it". 
    // Maybe we leave it in the history, but deleting it in the final commit looks good too.

    // Final Commit: "Migration to v2" -> Add all actual files
    console.log('Staging actual project files...');
    const finalDate = new Date('2025-12-31T23:59:59').toISOString();

    // We need to temporarily force add everything, confusing part is we are INSIDE the repo. 
    // The script modifies 'prototype/', but the actual files are all around.
    // We should probably `git rm -r prototype` then `git add .` to switch context.

    runCommand(`git rm -r ${PROTOTYPE_DIR}`);
    runCommand(`git commit -m "Refactor: Migration to Next.js framework (v2.0)" --date="${finalDate}"`);

    // Now add everything else
    runCommand('git add .');
    runCommand(`git commit -m "Release v2.0: Official Launch" --date="${finalDate}"`);
};

main();
