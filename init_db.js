/**
 * init_db.js
 * Seeds the database if empty and generates the initial Excel file.
 */

const db = require('./db');
const seedResponses = require('./seed_data');
const { generateExcelReport } = require('./excel_manager');

function initDatabase() {
  const currentCount = db.count();
  console.log(`Current records in DB: ${currentCount}`);

  if (currentCount === 0) {
    console.log('Seeding 8 legitimate humanized responses...');
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
