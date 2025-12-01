const fs = require('fs');
const path = require('path');
const { initializeDatabase, exec, saveDatabase } = require('../src/db/connection');

const seedsDir = path.join(__dirname, '../src/db/seeds');

async function runSeeds() {
  console.log('Seeding database...');

  try {
    await initializeDatabase();

    const files = fs.readdirSync(seedsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const filePath = path.join(seedsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      console.log(`  Applying: ${file}`);
      exec(sql);
    }

    saveDatabase();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

runSeeds();
