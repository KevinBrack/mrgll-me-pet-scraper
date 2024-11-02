const fs = require('fs');
const path = require('path');

// Check if database file exists
const dbPath = path.join(__dirname, '..', 'db', 'mrgll-me.sqlite3');
if (fs.existsSync(dbPath)) {
    console.log('\x1b[33m%s\x1b[0m', 'Warning: Database file already exists at:');
    console.log('\x1b[33m%s\x1b[0m', dbPath);
    console.log('\x1b[33m%s\x1b[0m', 'Running init-dev-db will add seed data to your existing database.');
    console.log('\x1b[33m%s\x1b[0m', 'If you want a fresh start, delete the database file first.\n');
}

// Continue with initialization
process.exit(0);
