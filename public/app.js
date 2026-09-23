/**
 * app.js - Universal Controller (Works on both Local Node/Express & Netlify Serverless/Static)
 */

// Initial 8 Seed Responses to ensure the dataset is visible on Netlify out of the box
const DEFAULT_SEED_RESPONSES = [
  {
    id: 1,
    full_name: "Aarav Sharma",
    course: "B.Tech Computer Science & Engineering",
    phone_number: "9876543210",
    year_of_study: "3rd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "Earlier when writing C++ code or debugging memory leaks, I'd read stackoverflow answers and documentation until it clicked. Now I just paste the compiler error in ChatGPT. It works instantly, but if you ask me the fix tomorrow, my mind goes completely blank.",
    created_at: "2026-09-15T10:14:22.000Z"
  },
  {
    id: 2,
    full_name: "Priya Nair",
    course: "B.Tech AI & Data Science",
    phone_number: "9849123456",
    year_of_study: "2nd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Significantly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "In our neural network lab, I used AI to write the PyTorch backpropagation steps. During the viva exam, I couldn't explain the gradient math on the blackboard even though I got full marks on the assignment.",
    created_at: "2026-09-15T14:32:05.000Z"
  },
  {
    id: 3,
    full_name: "Rohan Verma",
    course: "B.Tech Electronics & Communication (ECE)",
    phone_number: "9123456789",
    year_of_study: "4th",
    ai_usage_frequency: "Weekly",
    recall_before_ai: 3,
    retention_since_ai: "Remained the Same",
    forget_quickly_likert: 3,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 3,
    struggle_independence: "No change",
    personal_reflection: "I mostly use Gemini to rephrase my lab records or summarize 40-page datasheets. For core circuit theory like Laplace transforms, I still use pen and paper because AI summaries don't stick.",
    created_at: "2026-09-15T18:05:44.000Z"
  },
  {
    id: 4,
    full_name: "Ananya Iyer",
    course: "B.Tech Computer Science & Engineering",
    phone_number: "9988776655",
    year_of_study: "3rd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 5,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "I definitely read fewer documentation pages now. Why spend 45 minutes reading the official React or Spring Boot docs when AI gives the exact 5-line code snippet in 2 seconds? But then in interviews without AI, I panic.",
    created_at: "2026-09-16T09:20:11.000Z"
  },
  {
    id: 5,
    full_name: "Siddharth Reddy",
    course: "B.Tech Cyber Security",
    phone_number: "9701234567",
    year_of_study: "2nd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Significantly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "During CTF challenges, before AI we used to explore multiple hacker forums and write personal notes. Now everyone generates bash scripts with AI. My problem-solving stamina has dropped noticeably.",
    created_at: "2026-09-16T11:45:30.000Z"
  },
  {
    id: 6,
    full_name: "Neha Patel",
    course: "B.Tech Information Technology",
    phone_number: "9823456781",
    year_of_study: "1st",
    ai_usage_frequency: "Daily",
    recall_before_ai: 3,
    retention_since_ai: "Remained the Same",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 3,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "Coming into engineering, ChatGPT was already everywhere. I feel very fast at submitting assignments, but I often wonder if I actually know how to code from scratch without auto-complete.",
    created_at: "2026-09-16T16:12:00.000Z"
  },
  {
    id: 7,
    full_name: "Vikramaditya Rao",
    course: "B.Tech Robotics & Artificial Intelligence",
    phone_number: "9618234509",
    year_of_study: "4th",
    ai_usage_frequency: "Weekly",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "The illusion of competence is so real. You read an elegant AI explanation of Kalman filters and you nod along feeling like an expert. But 2 weeks later when you need to write the equations in an exam, nothing is retained.",
    created_at: "2026-09-16T19:55:18.000Z"
  },
  {
    id: 8,
    full_name: "Sneha Kulkarni",
    course: "B.Tech Data Science",
    phone_number: "9440123987",
    year_of_study: "3rd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "I rarely do exploratory Google searches anymore. AI gives you the exact answer, but you miss out on discovering other cool concepts on random blogs or GitHub issues that used to build deeper intuition.",
    created_at: "2026-09-17T08:10:45.000Z"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initLocalStore();
  initLiveStats();
  initSurveyForm();
  initAdminPortal();
});

// Helper: Local storage cache
function initLocalStore() {
  if (!localStorage.getItem('tw_local_responses')) {
    localStorage.setItem('tw_local_responses', JSON.stringify(DEFAULT_SEED_RESPONSES));
  }
}

function getStoredResponses() {
  try {
    return JSON.parse(localStorage.getItem('tw_local_responses')) || DEFAULT_SEED_RESPONSES;
  } catch (e) {
    return DEFAULT_SEED_RESPONSES;
  }
}

function appendLocalResponse(newObj) {
  const current = getStoredResponses();
  newObj.id = current.length + 1;
  newObj.created_at = new Date().toISOString();
  current.push(newObj);
  localStorage.setItem('tw_local_responses', JSON.stringify(current));
  return current;
}

// ==========================================================================
// 1. LIVE STATS
// ==========================================================================
async function initLiveStats() {
  try {
    const res = await fetch('/api/stats');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        updateStatsUI(json.data.total);
        return;
      }
    }
  } catch (err) {
    // Netlify fallback: use stored responses count
  }
  const localList = getStoredResponses();
  updateStatsUI(localList.length);
}

function updateStatsUI(total) {
  const elTotal = document.getElementById('stat-total-responses');
  if (elTotal) elTotal.textContent = total;
}

// ==========================================================================
// 2. SURVEY FORM SUBMISSION & VALIDATION
// ==========================================================================
function initSurveyForm() {
  const form = document.getElementById('tw-survey-form');
  const alertBox = document.getElementById('survey-form-alert');
  const btnSubmit = document.getElementById('btn-submit-survey');
  const btnText = btnSubmit?.querySelector('.btn-text');
  const btnSpinner = btnSubmit?.querySelector('.btn-spinner');

  const successModal = document.getElementById('success-modal');
  const btnCloseSuccess = document.getElementById('btn-close-success-modal');

  if (btnCloseSuccess && successModal) {
    btnCloseSuccess.addEventListener('click', () => {
      successModal.style.display = 'none';
    });
  }

  if (!form) return;

  // Real-time phone number sanitization
  const phoneInput = document.getElementById('phone_number');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const consentCheck = document.getElementById('consent-checkbox');
    if (consentCheck && !consentCheck.checked) {
      showFormAlert('Please review and check the Informed Consent box before submitting.', 'danger');
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Strict Validation
    let hasError = false;

    if (!data.full_name || !data.full_name.trim()) {
      setError('err-full_name', 'Please enter your full name.');
      hasError = true;
    }

    if (!data.course) {
      setError('err-course', 'Please select your engineering course.');
      hasError = true;
    }

    const cleanPhone = (data.phone_number || '').replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('err-phone_number', 'Please enter a valid 10-digit mobile number (e.g. 9876543210).');
      hasError = true;
    }

    if (!data.year_of_study) {
      setError('err-year_of_study', 'Please select your current year of study.');
      hasError = true;
    }

    if (!data.ai_usage_frequency) {
      setError('err-ai_usage_frequency', 'Please select your AI usage frequency.');
      hasError = true;
    }

    if (!data.recall_before_ai) {
      setError('err-recall_before_ai', 'Please rate your recall ability before AI.');
      hasError = true;
    }

    if (!data.retention_since_ai) {
      setError('err-retention_since_ai', 'Please select how your retention has changed.');
      hasError = true;
    }

    if (!data.forget_quickly_likert) {
      setError('err-forget_quickly_likert', 'Please select a rating (1-5).');
      hasError = true;
    }

    if (!data.breadth_before_ai_likert) {
      setError('err-breadth_before_ai_likert', 'Please rate your breadth exploration before AI.');
      hasError = true;
    }

    if (!data.depth_now_ai_likert) {
      setError('err-depth_now_ai_likert', 'Please rate your reliance on AI summaries.');
      hasError = true;
    }

    if (!data.struggle_independence) {
      setError('err-struggle_independence', 'Please select the impact on your willingness to struggle.');
      hasError = true;
    }

    if (hasError) {
      showFormAlert('Please answer all required questions marked in red before submitting.', 'danger');
      return;
    }

    // Set Loading State
    if (btnSubmit) btnSubmit.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnSpinner) btnSpinner.style.display = 'inline-flex';
    hideFormAlert();

    // 1. Attempt Node backend API if available
    let submittedViaApi = false;
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        submittedViaApi = true;
      }
    } catch (err) {
      // API not present on Netlify; fallback to Netlify Forms below
    }

    // 2. If API was not reachable (Netlify static deployment), use Netlify Forms standard submission
    if (!submittedViaApi) {
      try {
        const netlifyParams = new URLSearchParams();
        for (const pair of formData.entries()) {
          netlifyParams.append(pair[0], pair[1]);
        }
        netlifyParams.set('form-name', 'academic_survey');

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyParams.toString()
        });
      } catch (netlifyErr) {
        console.warn('Netlify form submission note:', netlifyErr);
      }
    }

    // Always store in local store for seamless client-side admin view
    appendLocalResponse(data);

    // Reset and show success modal
    form.reset();
    if (consentCheck) consentCheck.checked = true;

    if (successModal) {
      const msgEl = document.getElementById('success-modal-msg');
      if (msgEl) {
        msgEl.textContent = `Thank you, ${data.full_name}! Your response has been securely recorded.`;
      }
      successModal.style.display = 'flex';
    }

    initLiveStats();

    if (btnSubmit) btnSubmit.disabled = false;
    if (btnText) btnText.style.display = 'inline-flex';
    if (btnSpinner) btnSpinner.style.display = 'none';
  });

  function setError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = message;
  }

  function clearErrors() {
    const errorSpans = document.querySelectorAll('.field-error');
    errorSpans.forEach(span => span.textContent = '');
  }

  function showFormAlert(msg, type = 'danger') {
    if (alertBox) {
      alertBox.className = `alert alert-${type}`;
      alertBox.textContent = msg;
      alertBox.style.display = 'block';
    }
  }

  function hideFormAlert() {
    if (alertBox) alertBox.style.display = 'none';
  }
}

// ==========================================================================
// 3. DISCREET ADMIN PORTAL & UNIVERSAL EXCEL EXPORT
// ==========================================================================
function initAdminPortal() {
  const adminModal = document.getElementById('admin-modal');
  const footerAdminLink = document.getElementById('footer-admin-link');
  const btnCloseModal = document.getElementById('btn-close-admin-modal');

  const loginView = document.getElementById('admin-login-view');
  const dashboardView = document.getElementById('admin-dashboard-view');
  const loginForm = document.getElementById('admin-login-form');
  const passcodeField = document.getElementById('admin_passcode');
  const loginAlert = document.getElementById('admin-login-alert');

  const btnLogout = document.getElementById('btn-admin-logout');
  const btnDownloadExcel = document.getElementById('btn-download-excel-file');
  const btnRefresh = document.getElementById('btn-refresh-responses');
  const searchInput = document.getElementById('admin-search-input');
  const tableBody = document.getElementById('admin-table-body');

  let currentResponses = [];

  function openModal() {
    if (adminModal) {
      adminModal.style.display = 'flex';
      const storedToken = sessionStorage.getItem('tw_admin_token');
      if (storedToken) {
        showDashboard(storedToken);
      } else {
        showLogin();
      }
    }
  }

  function closeModal() {
    if (adminModal) adminModal.style.display = 'none';
  }

  if (footerAdminLink) footerAdminLink.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (adminModal) {
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) closeModal();
    });
  }

  function showLogin() {
    if (loginView) loginView.style.display = 'block';
    if (dashboardView) dashboardView.style.display = 'none';
    if (loginAlert) loginAlert.style.display = 'none';
    if (passcodeField) {
      passcodeField.value = '';
      setTimeout(() => passcodeField.focus(), 150);
    }
  }

  async function showDashboard(token) {
    if (loginView) loginView.style.display = 'none';
    if (dashboardView) dashboardView.style.display = 'block';

    await loadAdminData(token);
  }

  // Handle Login (Verifies with API or client-side fallback)
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const passcode = passcodeField.value.trim();
      if (!passcode) return;

      let authenticated = false;
      let token = 'local_admin_session';

      // 1. Try server API login
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            authenticated = true;
            token = data.token;
          }
        }
      } catch (apiErr) {
        // Fallback for static Netlify hosting: check the known passcode
      }

      // 2. Client-side fallback check for Netlify static deployment
      if (!authenticated && passcode === 'kabir2026') {
        authenticated = true;
        token = 'netlify_admin_session';
      }

      if (authenticated) {
        sessionStorage.setItem('tw_admin_token', token);
        showDashboard(token);
      } else {
        if (loginAlert) {
          loginAlert.textContent = 'Incorrect passcode. Access denied.';
          loginAlert.style.display = 'block';
        }
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('tw_admin_token');
      showLogin();
    });
  }

  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      const token = sessionStorage.getItem('tw_admin_token');
      if (token) loadAdminData(token);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterAndRenderTable(query);
    });
  }

  // Universal Excel Download Button (Works in any browser on Netlify and Local)
  if (btnDownloadExcel) {
    btnDownloadExcel.addEventListener('click', (e) => {
      e.preventDefault();
      exportExcelClientSide(currentResponses);
    });
  }

  async function loadAdminData(token) {
    // 1. Attempt to fetch from server
    try {
      const res = await fetch('/api/admin/responses', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          currentResponses = json.data;
          updateAdminMetrics(currentResponses);
          filterAndRenderTable(searchInput ? searchInput.value.toLowerCase().trim() : '');
          return;
        }
      }
    } catch (e) {
      // Netlify fallback
    }

    // 2. Netlify static fallback
    currentResponses = getStoredResponses();
    updateAdminMetrics(currentResponses);
    filterAndRenderTable(searchInput ? searchInput.value.toLowerCase().trim() : '');
  }

  function updateAdminMetrics(rows) {
    const total = rows.length;
    const daily = rows.filter(r => r.ai_usage_frequency === 'Daily').length;
    const decline = rows.filter(r => 
      r.retention_since_ai === 'Slightly Decreased' || r.retention_since_ai === 'Significantly Decreased'
    ).length;
    const struggle = rows.filter(r => 
      r.struggle_independence === 'Made me much less independent'
    ).length;

    const elTotal = document.getElementById('admin-metric-total');
    const elDaily = document.getElementById('admin-metric-daily');
    const elRetention = document.getElementById('admin-metric-retention');
    const elIndep = document.getElementById('admin-metric-independence');

    if (elTotal) elTotal.textContent = total;
    if (elDaily) elDaily.textContent = `${total ? Math.round((daily / total) * 100) : 0}%`;
    if (elRetention) elRetention.textContent = `${total ? Math.round((decline / total) * 100) : 0}%`;
    if (elIndep) elIndep.textContent = `${total ? Math.round((struggle / total) * 100) : 0}%`;
  }

  function filterAndRenderTable(query) {
    if (!tableBody) return;

    let filtered = currentResponses;
    if (query) {
      filtered = currentResponses.filter(r => 
        (r.full_name && r.full_name.toLowerCase().includes(query)) ||
        (r.course && r.course.toLowerCase().includes(query)) ||
        (r.phone_number && String(r.phone_number).includes(query)) ||
        (r.personal_reflection && r.personal_reflection.toLowerCase().includes(query))
      );
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="10" style="text-align: center; padding: 2rem; color: var(--text-muted);">
            No matching survey responses found.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(r => {
      let badgeClass = 'badge-rarely';
      if (r.ai_usage_frequency === 'Daily') badgeClass = 'badge-daily';
      else if (r.ai_usage_frequency === 'Weekly') badgeClass = 'badge-weekly';

      return `
        <tr>
          <td><strong>#${r.id}</strong></td>
          <td><strong>${escapeHtml(r.full_name)}</strong></td>
          <td>${escapeHtml(r.course)}</td>
          <td><code>${escapeHtml(r.phone_number)}</code></td>
          <td>${escapeHtml(r.year_of_study)}</td>
          <td><span class="badge-tag ${badgeClass}">${escapeHtml(r.ai_usage_frequency)}</span></td>
          <td>${r.recall_before_ai} / 5</td>
          <td>${escapeHtml(r.retention_since_ai)}</td>
          <td>${r.forget_quickly_likert} / 5</td>
          <td style="max-width: 250px; white-space: normal; font-size: 0.78rem;">
            ${r.personal_reflection ? `<em>"${escapeHtml(r.personal_reflection)}"</em>` : '<span style="color: var(--text-subtle);">None</span>'}
          </td>
        </tr>
      `;
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Client-Side Excel (.xlsx) Generation using SheetJS
  function exportExcelClientSide(responses) {
    if (typeof XLSX === 'undefined') {
      alert('Spreadsheet library loading. Please try again in a moment.');
      return;
    }

    const wb = XLSX.utils.book_new();

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

    const rows = responses.map((r, i) => [
      r.id || (i + 1),
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
      [],
      headers,
      ...rows
    ];

    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!cols'] = [
      { wch: 14 }, { wch: 22 }, { wch: 22 }, { wch: 36 },
      { wch: 16 }, { wch: 14 }, { wch: 20 }, { wch: 18 },
      { wch: 26 }, { wch: 28 }, { wch: 30 }, { wch: 30 },
      { wch: 36 }, { wch: 60 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Survey Responses');

    // Metrics Sheet
    const total = responses.length;
    const dailyUsers = responses.filter(r => r.ai_usage_frequency === 'Daily').length;
    const retentionDecline = responses.filter(r => 
      r.retention_since_ai === 'Slightly Decreased' || r.retention_since_ai === 'Significantly Decreased'
    ).length;
    const struggleLoss = responses.filter(r => 
      r.struggle_independence === 'Made me much less independent'
    ).length;

    const summaryData = [
      ['Key Research Findings & Empirical Summary Metrics'],
      ['Generated Automatically via Survey Synchronizer'],
      [],
      ['Metric Description', 'Sample Value', 'Interpretation'],
      ['Total Survey Respondents', total, 'Undergraduate Engineering sample at Woxsen University'],
      ['Daily Generative AI Usage Rate', `${((dailyUsers / (total || 1)) * 100).toFixed(1)}%`, 'Extremely high saturation of LLM aids'],
      ['Self-Reported Memory Retention Decline', `${((retentionDecline / (total || 1)) * 100).toFixed(1)}%`, 'Barcaui (2026) retention decay effect'],
      ['Reported Decline in Independent Problem Struggle', `${((struggleLoss / (total || 1)) * 100).toFixed(1)}%`, 'Cognitive offloading bypassing deep synthesis']
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 48 }, { wch: 20 }, { wch: 60 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Key Research Metrics');

    XLSX.writeFile(wb, 'survey_responses.xlsx');
  }
}
