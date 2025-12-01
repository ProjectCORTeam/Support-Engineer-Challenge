const fs = require('fs');
const path = require('path');
const { initializeDatabase, exec, saveDatabase } = require('../src/db/connection');

const migrationsDir = path.join(__dirname, '../src/db/migrations');

async function runMigrations() {
  console.log('Running migrations...');

  try {
    await initializeDatabase();

    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`  Applying: ${file}`);
      exec(sql);
    }

    saveDatabase();
    console.log('Migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
