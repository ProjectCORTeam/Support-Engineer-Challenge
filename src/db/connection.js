const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'taskmaster.db');

let db = null;
let SQL = null;

// Initialize SQL.js and load/create database
async function initializeDatabase() {
  if (db) return db;
  
  SQL = await initSqlJs();
  
  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  return db;
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// Get database instance (synchronous after initialization)
function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.');
  }
  return db;
}

// Execute SQL and return results
function query(sql, params = []) {
  const database = getDb();
  const stmt = database.prepare(sql);
  stmt.bind(params);
  
  const results = [];
  while (stmt.step()) {
    const row = stmt.getAsObject();
    results.push(row);
  }
  stmt.free();
  
  return results;
}

// Execute SQL without returning results (for INSERT, UPDATE, DELETE)
function exec(sql) {
  const database = getDb();
  database.run(sql);
  saveDatabase();
}

// Get a single row
function get(sql, params = []) {
  const results = query(sql, params);
  return results[0] || null;
}

// Get all rows
function all(sql, params = []) {
  return query(sql, params);
}

module.exports = {
  initializeDatabase,
  saveDatabase,
  getDb,
  exec,
  get,
  all,
  dbPath
};
