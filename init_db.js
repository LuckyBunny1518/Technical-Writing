/**
 * init_db.js
 * Seeds the database if empty and generates the initial Excel file.
 */

const db = require('./db');
const seedResponses = require('./seed_data');
const { generateExcelReport } = require('./excel_manager');

function initDatabase(forceReseed = false) {
  const currentCount = db.count();
  console.log(`Current records in DB: ${currentCount}`);

  if (currentCount === 0 || forceReseed || currentCount < seedResponses.length) {
    console.log(`Seeding all ${seedResponses.length} student responses...`);
    // Delete existing DB file and JSON file if reseeding to ensure clean state
    const fs = require('fs');
    const path = require('path');
    const dbFile = path.join(__dirname, 'data', 'survey_database.db');
    const jsonFile = path.join(__dirname, 'data', 'responses.json');
    if (fs.existsSync(dbFile)) {
      try { fs.unlinkSync(dbFile); } catch (e) { /* ignore */ }
    }
    if (fs.existsSync(jsonFile)) {
      try { fs.unlinkSync(jsonFile); } catch (e) { /* ignore */ }
    }
    for (const item of seedResponses) {
      db.insert(item);
    }
    console.log('Database seeded successfully!');
  }

  const all = db.getAll();
  console.log(`Total records in DB now: ${all.length}`);
  generateExcelReport(all);
}

if (require.main === module) {
  initDatabase();
}

module.exports = initDatabase;
