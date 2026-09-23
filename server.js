/**
 * server.js - Express Web Server & API for Kabir's Technical Writing Project
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const db = require('./db');
const { EXCEL_FILE_PATH, generateExcelReport } = require('./excel_manager');
const initDatabase = require('./init_db');

const app = express();
const PORT = process.env.PORT || 3000;

// Admin authentication passcode
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'kabir2026';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize DB and Seed on startup
initDatabase();

// ----------------------------------------------------
// Public APIs
// ----------------------------------------------------

// Get aggregate statistics for charts & live counters
app.get('/api/stats', (req, res) => {
  try {
    const responses = db.getAll();
    const total = responses.length;

    const dailyAi = responses.filter(r => r.ai_usage_frequency === 'Daily').length;
    const retentionDecline = responses.filter(r => 
      r.retention_since_ai === 'Slightly Decreased' || r.retention_since_ai === 'Significantly Decreased'
    ).length;
    const struggleLoss = responses.filter(r => 
      r.struggle_independence === 'Made me much less independent'
    ).length;

    const avgPreRecall = total > 0 
      ? (responses.reduce((sum, r) => sum + Number(r.recall_before_ai || 0), 0) / total).toFixed(1) 
      : '0.0';
    const avgForgetQuickly = total > 0 
      ? (responses.reduce((sum, r) => sum + Number(r.forget_quickly_likert || 0), 0) / total).toFixed(1) 
      : '0.0';
    const avgBreadth = total > 0 
      ? (responses.reduce((sum, r) => sum + Number(r.breadth_before_ai_likert || 0), 0) / total).toFixed(1) 
      : '0.0';
    const avgDepth = total > 0 
      ? (responses.reduce((sum, r) => sum + Number(r.depth_now_ai_likert || 0), 0) / total).toFixed(1) 
      : '0.0';

    // Distribution by B.Tech Year
    const yearDist = { '1st': 0, '2nd': 0, '3rd': 0, '4th': 0 };
    responses.forEach(r => {
      if (yearDist[r.year_of_study] !== undefined) {
        yearDist[r.year_of_study]++;
      }
    });

    // Distribution of Retention Trend
    const retentionDist = {
      'Significantly Improved': 0,
      'Remained the Same': 0,
      'Slightly Decreased': 0,
      'Significantly Decreased': 0
    };
    responses.forEach(r => {
      if (retentionDist[r.retention_since_ai] !== undefined) {
        retentionDist[r.retention_since_ai]++;
      }
    });

    res.json({
      success: true,
      data: {
        total,
        dailyAiPercentage: total ? Math.round((dailyAi / total) * 100) : 0,
        retentionDeclinePercentage: total ? Math.round((retentionDecline / total) * 100) : 0,
        struggleLossPercentage: total ? Math.round((struggleLoss / total) * 100) : 0,
        avgPreRecall,
        avgForgetQuickly,
        avgBreadth,
        avgDepth,
        yearDist,
        retentionDist
      }
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Submit a new survey response
app.post('/api/survey', (req, res) => {
  try {
    const {
      full_name,
      course,
      phone_number,
      year_of_study,
      ai_usage_frequency,
      recall_before_ai,
      retention_since_ai,
      forget_quickly_likert,
      breadth_before_ai_likert,
      depth_now_ai_likert,
      struggle_independence,
      personal_reflection
    } = req.body;

    // Validation
    if (!full_name || !full_name.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }
    if (!course || !course.trim()) {
      return res.status(400).json({ success: false, error: 'Course / Branch is required.' });
    }
    
    // Strict 10-digit phone number check
    const cleanPhone = String(phone_number || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide a valid 10-digit phone number (e.g. 9876543210).' 
      });
    }

    if (!year_of_study) {
      return res.status(400).json({ success: false, error: 'Year of study is required.' });
    }
    if (!ai_usage_frequency) {
      return res.status(400).json({ success: false, error: 'AI usage frequency is required.' });
    }
    if (!recall_before_ai || recall_before_ai < 1 || recall_before_ai > 5) {
      return res.status(400).json({ success: false, error: 'Recall rating must be between 1 and 5.' });
    }
    if (!retention_since_ai) {
      return res.status(400).json({ success: false, error: 'Retention trend selection is required.' });
    }
    if (!forget_quickly_likert || forget_quickly_likert < 1 || forget_quickly_likert > 5) {
      return res.status(400).json({ success: false, error: 'Forgetting likert rating is required (1-5).' });
    }
    if (!breadth_before_ai_likert || breadth_before_ai_likert < 1 || breadth_before_ai_likert > 5) {
      return res.status(400).json({ success: false, error: 'Breadth exploration rating is required (1-5).' });
    }
    if (!depth_now_ai_likert || depth_now_ai_likert < 1 || depth_now_ai_likert > 5) {
      return res.status(400).json({ success: false, error: 'Depth / AI summary rating is required (1-5).' });
    }
    if (!struggle_independence) {
      return res.status(400).json({ success: false, error: 'Impact on independent struggle selection is required.' });
    }

    const newRecord = {
      full_name: full_name.trim(),
      course: course.trim(),
      phone_number: cleanPhone,
      year_of_study,
      ai_usage_frequency,
      recall_before_ai: Number(recall_before_ai),
      retention_since_ai,
      forget_quickly_likert: Number(forget_quickly_likert),
      breadth_before_ai_likert: Number(breadth_before_ai_likert),
      depth_now_ai_likert: Number(depth_now_ai_likert),
      struggle_independence,
      personal_reflection: (personal_reflection || '').trim(),
      created_at: new Date().toISOString()
    };

    // Save into database
    const saved = db.insert(newRecord);

    // Immediately regenerate and update Excel file
    const allRecords = db.getAll();
    generateExcelReport(allRecords);

    res.json({
      success: true,
      message: 'Thank you! Your survey response has been successfully recorded and synced to the database.',
      id: saved.id
    });
  } catch (err) {
    console.error('Error submitting survey:', err);
    res.status(500).json({ success: false, error: 'Server error processing survey submission.' });
  }
});

// ----------------------------------------------------
// Admin APIs (Authenticated)
// ----------------------------------------------------

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { passcode } = req.body;
  if (!passcode || passcode !== ADMIN_PASSCODE) {
    return res.status(401).json({ success: false, error: 'Invalid admin passcode. Access denied.' });
  }

  // Issue a simple session token
  const token = Buffer.from(`admin:${ADMIN_PASSCODE}:${Date.now()}`).toString('base64');
  res.json({
    success: true,
    message: 'Admin authentication successful.',
    token
  });
});

// Admin Auth Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || req.query.token;
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Missing authorization token.' });
  }
  try {
    const raw = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    if (decoded.startsWith(`admin:${ADMIN_PASSCODE}:`)) {
      return next();
    }
  } catch (e) {
    // fall through
  }
  return res.status(401).json({ success: false, error: 'Invalid or expired admin session.' });
}

// Get all responses for admin dashboard table
app.get('/api/admin/responses', requireAdmin, (req, res) => {
  try {
    const responses = db.getAll();
    res.json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch responses.' });
  }
});

// Download the live updated Excel file (.xlsx)
app.get('/api/admin/download-excel', (req, res) => {
  // Can authenticate via query parameter ?token=... or session header
  const token = req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Unauthorized: Missing access token.');
  }

  try {
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    if (!decoded.startsWith(`admin:${ADMIN_PASSCODE}:`)) {
      return res.status(401).send('Unauthorized: Invalid admin token.');
    }
  } catch (e) {
    return res.status(401).send('Unauthorized: Invalid token format.');
  }

  if (!fs.existsSync(EXCEL_FILE_PATH)) {
    // Generate it if not found
    generateExcelReport(db.getAll());
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="survey_responses.xlsx"');
  res.sendFile(EXCEL_FILE_PATH);
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 Kabir TW Project Server running at: http://localhost:${PORT}`);
  console.log(`🔐 Admin Passcode: ${ADMIN_PASSCODE}`);
  console.log(`📊 Live Excel: ${EXCEL_FILE_PATH}`);
  console.log(`=======================================================`);
});
