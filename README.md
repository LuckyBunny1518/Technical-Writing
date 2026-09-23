# Technical Writing Project: The Impact of Generative AI on Cognitive Offloading

An empirical study and interactive academic survey investigating how Generative AI tools (ChatGPT, Gemini) impact information retention, productive struggle, and research depth among undergraduate engineering students.

**Researcher:** Kabir  
**Course:** Industry-Integrated Technical Communication  
**Institution:** Woxsen University, School of Technology  

---

## 🌟 Features
- **Modern Responsive Web Application**: Clean dark-glassmorphism design built with semantic HTML5, modern CSS, and JavaScript.
- **Section 3.2 Sample Questionnaire**: Captures student credentials, 10-digit phone numbers, and answers across Section A (Demographics), Section B (Memory & Retention), and Section C (Research Breadth & Depth).
- **Persistent Backend Database**: Real-time SQLite table recording each verified response.
- **Automated Live Excel (.xlsx) Sync**: Automatically regenerates and formats `survey_responses.xlsx` on every submission with structured tables and calculated metrics.
- **Protected Admin Portal**: Discreet access via secret passcode (`kabir2026`) with live KPI metric cards, searchable response table, and one-click Excel download.

---

## 🚀 Running Locally
```bash
# Install dependencies
npm install

# Start the server
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Render.com (Free)
1. Go to [render.com](https://render.com) and log in with your GitHub account.
2. Click **New +** &rarr; **Web Service**.
3. Connect this repository (`Technical-Writing` or `Technical Writing`).
4. Settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start` (or `node server.js`)
   - **Plan:** `Free`
5. Click **Deploy Web Service**!
