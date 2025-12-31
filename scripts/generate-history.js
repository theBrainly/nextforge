const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = 'DEV_LOG.md';
const START_DATE = new Date('2025-09-01T10:00:00');
const END_DATE = new Date('2025-12-31T18:00:00');

const MESSAGES = [
    "Initial project structure setup",
    "Added express proxy server",
    "Implemented basic authentication",
    "Refactored API endpoints",
    "Updated dependencies",
    "Fixed minor bugs in login flow",
    "Added user profile page",
    "Improved database schema",
    "Optimized database queries",
    "Added unit tests for auth service",
    "Setup CI/CD pipeline configuration",
    "Updated README with installation steps",
    "Added error handling middleware",
    "Implemented JWT token verification",
    "Created database migration scripts",
    "Added logging service",
    "Refactored frontend components",
    "Styled login page with CSS grid",
    "Added dark mode support",
    "Fixed responsive layout issues",
    "Optimized image loading",
    "Added caching layer",
    "Implemented rate limiting",
    "Added security headers",
    "Updated API documentation",
    "Fixed memory leak in worker process",
    "Added health check endpoint",
    "Implemented password reset flow",
    "Added email notification service",
    "Updated UI color palette",
    "Refactored state management",
    "Added data validation schema",
    "Optimized bundle size",
    "Added integration tests",
    "Fixed race condition in transaction",
    "Updated footer links",
    "Added terms of service page",
    "Implemented file upload feature",
    "Added progress bar component",
    "Fixed navigation menu bug",
    "Added loading skeletons",
    "Implemented infinite scroll",
    "Added search functionality",
    "Optimized search queries",
    "Added analytics tracking",
    "Fixed broken links",
    "Updated font families",
    "Added accessibility attributes",
    "Implemented i18n support",
    "Added dockerfile for deployment"
];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatDate = (date) => {
    return date.toISOString();
};

const runCommand = (command) => {
    try {
        execSync(command, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute command: ${command}`);
        process.exit(1);
    }
};

const main = () => {
    let currentDate = new Date(START_DATE);
    let commitCount = 0;

    console.log(`Starting commit generation from ${START_DATE.toDateString()} to ${END_DATE.toDateString()}...`);

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, '# Development Log\n\n');
    }

    while (currentDate <= END_DATE) {
        // Daily commits: 3 to 6
        const commitsToday = getRandomInt(3, 6);

        for (let i = 0; i < commitsToday; i++) {
            // Add random time to the current date for variety
            const commitTime = new Date(currentDate);
            commitTime.setHours(getRandomInt(9, 23)); // 9 AM to 11 PM
            commitTime.setMinutes(getRandomInt(0, 59));
            commitTime.setSeconds(getRandomInt(0, 59));

            const message = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
            const dateStr = formatDate(commitTime);

            // Update log file to verify changes
            fs.appendFileSync(LOG_FILE, `- [${dateStr}] ${message}\n`);

            // Git operations
            runCommand(`git add ${LOG_FILE}`);
            runCommand(`git commit -m "${message}" --date="${dateStr}"`);

            commitCount++;
        }

        // Advance date by 2 to 4 days
        const daysToJump = getRandomInt(2, 4);
        currentDate.setDate(currentDate.getDate() + daysToJump);
    }

    // Final Commit with all current files
    console.log(`\nGenerated ${commitCount} backdated commits.`);
    console.log('Adding all project files for final commit...');

    const finalDate = new Date('2025-12-31T23:59:59').toISOString();
    runCommand('git add .');
    runCommand(`git commit -m "Release v1.0: Initial public release" --date="${finalDate}"`);
    console.log('Done!');
};

main();
