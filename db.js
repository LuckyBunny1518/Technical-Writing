/**
 * db.js - SQLite & JSON Hybrid Persistent Database Layer
 * Stores all survey responses in a real SQLite database table and syncs JSON cache.
 * Fully cross-platform: Windows (python), Linux / Render (python3 or python), with JSON fallback.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'survey_database.db');
const JSON_FILE = path.join(DATA_DIR, 'responses.json');
const BRIDGE_SCRIPT = path.join(__dirname, 'sqlite_bridge.py');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Determine best Python executable (Windows: python, Linux/Render: python3 or python)
let resolvedPythonCmd = null;

function getPythonExecutable() {
  if (resolvedPythonCmd) return resolvedPythonCmd;
  const candidates = process.platform === 'win32' ? ['python', 'py'] : ['python3', 'python'];
  for (const cmd of candidates) {
    try {
      const check = spawnSync(cmd, ['--version'], { encoding: 'utf-8' });
      if (!check.error && check.status === 0) {
        resolvedPythonCmd = cmd;
        return resolvedPythonCmd;
      }
    } catch (e) {
      // try next
    }
  }
  return null; // Will fallback to pure JSON storage
}

function runBridge(action, payload = null) {
  const pyCmd = getPythonExecutable();
  if (!pyCmd) {
    throw new Error('Python runtime not found; operating in JSON database mode.');
  }

  const args = [BRIDGE_SCRIPT, DB_FILE, action];
  if (payload !== null) {
    args.push(typeof payload === 'string' ? payload : JSON.stringify(payload));
  }

  const result = spawnSync(pyCmd, args, {
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`Bridge failed with exit code ${result.status}: ${result.stderr}`);
  }

  return JSON.parse(result.stdout.trim());
}

// In-memory / JSON file cache sync
function readJsonDisk() {
  if (fs.existsSync(JSON_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'));
    } catch (e) {
      console.warn('Warning reading JSON cache:', e.message);
    }
  }
  return [];
}

function saveToDisk(rows) {
  try {
    fs.writeFileSync(JSON_FILE, JSON.stringify(rows, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Warning writing JSON cache:', e.message);
  }
}

// Initialize SQLite schema if python is available
try {
  runBridge('init');
} catch (e) {
  console.log('Notice: SQLite bridge init info:', e.message);
}

const db = {
  getAll() {
    try {
      const rows = runBridge('getAll');
      saveToDisk(rows);
      return rows;
    } catch (e) {
      return readJsonDisk();
    }
  },

  insert(data) {
    if (!data.created_at) {
      data.created_at = new Date().toISOString();
    }

    try {
      const res = runBridge('insert', data);
      data.id = res.id;
      this.getAll(); // update cache
      return data;
    } catch (e) {
      // JSON storage fallback if Python is not present in runtime
      const rows = readJsonDisk();
      data.id = rows.length > 0 ? (rows[rows.length - 1].id || rows.length) + 1 : 1;
      rows.push(data);
      saveToDisk(rows);
      return data;
    }
  },

  count() {
    try {
      const res = runBridge('count');
      return res.count;
    } catch (e) {
      return readJsonDisk().length;
    }
  }
};

module.exports = db;
