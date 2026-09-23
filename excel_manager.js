/**
 * excel_manager.js
 * Generates and updates the Excel (.xlsx) file with proper tables,
 * structured formatting, and research summary analytics.
 */

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const EXCEL_FILE_PATH = path.join(__dirname, 'survey_responses.xlsx');

function generateExcelReport(responses) {
  const wb = XLSX.utils.book_new();

  // 1. Prepare Main Responses Table
  const headers = [
    'Response ID',
    'Timestamp (UTC)',
    'Full Name',
    'Course / Branch',
    'Phone Number',
    'B.Tech Year',
    'AI Usage Frequency',
    'Pre-AI Recall (1-5)',
    'Retention Trend Since AI',
    'Forgets Quickly Due to AI (1-5)',
    'Pre-AI Breadth Exploration (1-5)',
    'Now AI Summaries over Docs (1-5)',
    'Willingness to Struggle Independently',
    'Qualitative Experience / Reflection'
  ];

  const rows = responses.map((r, index) => [
    r.id || (index + 1),
    r.created_at || new Date().toISOString(),
    r.full_name,
    r.course,
    r.phone_number,
    r.year_of_study,
    r.ai_usage_frequency,
    Number(r.recall_before_ai),
    r.retention_since_ai,
    Number(r.forget_quickly_likert),
    Number(r.breadth_before_ai_likert),
    Number(r.depth_now_ai_likert),
    r.struggle_independence,
    r.personal_reflection || 'None provided'
  ]);

  const sheetData = [
    ['Woxsen University - Industry-Integrated Technical Communication Project'],
    ['Study: The Impact of Generative AI on Cognitive Offloading & Information Retention'],
    ['Author: Kabir | Target Population: B.Tech Engineering Undergraduates'],
    [], // Blank line
    headers,
    ...rows
  ];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);

  // Set column widths for readability
  ws['!cols'] = [
    { wch: 14 }, // Response ID
    { wch: 22 }, // Timestamp
    { wch: 22 }, // Full Name
    { wch: 36 }, // Course / Branch
    { wch: 16 }, // Phone Number
    { wch: 14 }, // B.Tech Year
    { wch: 20 }, // AI Usage Frequency
    { wch: 18 }, // Pre-AI Recall
    { wch: 26 }, // Retention Trend
    { wch: 28 }, // Forgets Quickly
    { wch: 30 }, // Pre-AI Breadth
    { wch: 30 }, // Now AI Summaries
    { wch: 36 }, // Willingness to Struggle
    { wch: 60 }  // Qualitative Reflection
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Survey Responses');

  // 2. Prepare Analytics & Metrics Summary Sheet
  const total = responses.length;
  const dailyUsers = responses.filter(r => r.ai_usage_frequency === 'Daily').length;
  const retentionDecline = responses.filter(r => 
    r.retention_since_ai === 'Slightly Decreased' || r.retention_since_ai === 'Significantly Decreased'
  ).length;
  const struggleLoss = responses.filter(r => 
    r.struggle_independence === 'Made me much less independent'
  ).length;
  
  const avgPreRecall = total > 0 
    ? (responses.reduce((sum, r) => sum + Number(r.recall_before_ai || 0), 0) / total).toFixed(2)
    : 0;
  const avgForgetLikert = total > 0 
    ? (responses.reduce((sum, r) => sum + Number(r.forget_quickly_likert || 0), 0) / total).toFixed(2)
    : 0;
  const avgBreadthLikert = total > 0 
    ? (responses.reduce((sum, r) => sum + Number(r.breadth_before_ai_likert || 0), 0) / total).toFixed(2)
    : 0;
  const avgDepthLikert = total > 0 
    ? (responses.reduce((sum, r) => sum + Number(r.depth_now_ai_likert || 0), 0) / total).toFixed(2)
    : 0;

  const summaryData = [
    ['Key Research Findings & Empirical Summary Metrics'],
    ['Generated Automatically via Survey Synchronizer'],
    [],
    ['Metric Description', 'Sample Value', 'Interpretation / Research Reference'],
    ['Total Survey Respondents', total, 'Undergraduate Engineering sample at Woxsen University'],
    ['Daily Generative AI Usage Rate', `${((dailyUsers / (total || 1)) * 100).toFixed(1)}%`, 'Extremely high saturation of LLM aids in daily assignments'],
    ['Self-Reported Memory Retention Decline', `${((retentionDecline / (total || 1)) * 100).toFixed(1)}%`, 'Aligns with Barcaui (2026) 45-day retention drop experiment'],
    ['Reported Decline in Independent Problem Struggle', `${((struggleLoss / (total || 1)) * 100).toFixed(1)}%`, 'Demonstrates cognitive offloading bypassing deep synthesis'],
    ['Average Pre-AI Recall Score (1-5 Scale)', avgPreRecall, 'Baseline recall ability before widespread LLM adoption'],
    ['Average "Forgets Quickly Due to AI" (1-5 Likert)', avgForgetLikert, 'Direct measure of the Google Effect / Cognitive Offloading'],
    ['Average Pre-AI Breadth Exploration (1-5 Likert)', avgBreadthLikert, 'Traditional multi-source literature search practice'],
    ['Average Reliance on Instant Summaries over Docs (1-5 Likert)', avgDepthLikert, 'Transition from depth exploration to synthetic summarization']
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [
    { wch: 48 },
    { wch: 20 },
    { wch: 65 }
  ];

  XLSX.utils.book_append_sheet(wb, wsSummary, 'Key Research Metrics');

  // Write file out
  XLSX.writeFile(wb, EXCEL_FILE_PATH);
  console.log(`Excel file updated successfully: ${EXCEL_FILE_PATH} (${total} records)`);
  return EXCEL_FILE_PATH;
}

module.exports = {
  EXCEL_FILE_PATH,
  generateExcelReport
};
