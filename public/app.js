/**
 * app.js - Universal Controller (Works on both Local Node/Express & Netlify Serverless/Static)
 */

// Seed Responses spanning multiple university faculties
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
    full_name: "Tanya Sen",
    course: "B.Arch Architecture & Spatial Planning",
    phone_number: "9849123456",
    year_of_study: "4th",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Significantly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "When working on studio design briefs, I used to study physical monographs and calculate floor-area ratios and setbacks manually from municipal gazettes. Now AI drafts the brief in seconds, but during jury reviews I notice my recall of structural bylaws is much weaker.",
    created_at: "2026-09-15T14:32:05.000Z"
  },
  {
    id: 3,
    full_name: "Rohan Verma",
    course: "BBA Business Administration",
    phone_number: "9123456789",
    year_of_study: "2nd",
    ai_usage_frequency: "Weekly",
    recall_before_ai: 3,
    retention_since_ai: "Remained the Same",
    forget_quickly_likert: 3,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 3,
    struggle_independence: "No change",
    personal_reflection: "I mostly use Gemini to outline business pitch decks and rephrase survey reports. For core financial accounting and ledger adjustments, I still practice by hand because AI summaries don't stick.",
    created_at: "2026-09-15T18:05:44.000Z"
  },
  {
    id: 4,
    full_name: "Ananya Iyer",
    course: "MBA Management Studies",
    phone_number: "9988776655",
    year_of_study: "5th / Postgrad",
    ai_usage_frequency: "Daily",
    recall_before_ai: 5,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "In consulting case prep, ChatGPT generates a MECE framework instantly. It saves hours, but in live boardroom case discussions without AI, I realize my instinctive grasp of unit economics isn't as spontaneous as it was.",
    created_at: "2026-09-16T09:20:11.000Z"
  },
  {
    id: 5,
    full_name: "Siddharth Reddy",
    course: "B.Des Design & Visual Arts",
    phone_number: "9701234567",
    year_of_study: "3rd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Significantly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "I used to sketch 40 thumbnail iterations on paper when tackling a UX brief. Now Midjourney and ChatGPT spit out moodboards immediately. My aesthetic exploration feels faster, but my creative stamina to struggle through visual blocks on paper has eroded.",
    created_at: "2026-09-16T11:45:30.000Z"
  },
  {
    id: 6,
    full_name: "Neha Patel",
    course: "BA LL.B / LL.M Legal Studies",
    phone_number: "9823456781",
    year_of_study: "4th",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "For moot court memorials, we used to comb through 80-page Supreme Court bench rulings to find subtle obiter dicta. Now AI summarizes the ratio in two paragraphs. But under rapid questions from judges, I stumble because I haven't internalized the underlying jurisprudence.",
    created_at: "2026-09-16T16:12:00.000Z"
  },
  {
    id: 7,
    full_name: "Dr. Vikramaditya Rao",
    course: "MBBS / Health Sciences",
    phone_number: "9618234509",
    year_of_study: "3rd",
    ai_usage_frequency: "Weekly",
    recall_before_ai: 5,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 4,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "The illusion of understanding is dangerous in medicine. When AI synthesizes a differential diagnosis for chronic pancreatitis, it seems so clear on screen. But during bedside clinical viva with real patients, only active rote recall works.",
    created_at: "2026-09-16T19:55:18.000Z"
  },
  {
    id: 8,
    full_name: "Sneha Kulkarni",
    course: "B.Com Commerce & Finance",
    phone_number: "9440123987",
    year_of_study: "2nd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "When solving tax assessment problems, I used to memorize section limits and deduction conditions under the Income Tax Act. Now AI drafts the entire computation, but I struggle to verify errors without prompting again.",
    created_at: "2026-09-17T08:10:45.000Z"
  },
  {
    id: 9,
    full_name: "Farhan Akhtar",
    course: "B.Sc / B.A. Economics",
    phone_number: "9312345678",
    year_of_study: "3rd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Significantly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 4,
    depth_now_ai_likert: 5,
    struggle_independence: "Made me much less independent",
    personal_reflection: "Working through Lagrangian utility maximization or econometric proofs by hand built real mathematical muscle. With AI doing step-by-step calculus instantly, the struggle disappears and so does my long-term memory of the proof.",
    created_at: "2026-09-17T11:24:19.000Z"
  },
  {
    id: 10,
    full_name: "Meera Joshi",
    course: "B.A. Psychology & Behavioral Science",
    phone_number: "9834567123",
    year_of_study: "2nd",
    ai_usage_frequency: "Daily",
    recall_before_ai: 4,
    retention_since_ai: "Slightly Decreased",
    forget_quickly_likert: 5,
    breadth_before_ai_likert: 5,
    depth_now_ai_likert: 4,
    struggle_independence: "Made me much less independent",
    personal_reflection: "As a psychology student studying memory, experiencing cognitive offloading firsthand is eye-opening. I offload authors, experiment years, and sample sizes to ChatGPT, remembering only vague headlines.",
    created_at: "2026-09-17T15:40:02.000Z"
  }
];

// 16 Discipline-Specific Adaptive Profiles (Unified Psychometric Meaning & Scales)
const DISCIPLINE_PROFILES = {
  engineering: {
    name: "Engineering & Technology",
    q1a: "1a. What year of your Engineering program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like ChatGPT, Copilot, or Gemini) for programming, math, or technical assignments?",
    secBDesc: "Reflect on your memory and retention of algorithms, syntax, system architectures, and mathematical proofs.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to mentally recall algorithms, syntax, and core engineering formulas?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of technical coding syntax and mathematical concepts has:",
    q2c: '"I find myself forgetting syntax, API methods, and algorithmic steps quickly because I know I can just prompt an AI again."',
    secCDesc: "How AI code generators and instant synthesizers have altered your technical problem-solving habits.",
    q3a: '"Before AI, I frequently explored multiple diverse sources (official documentation, GitHub issues, StackOverflow) to debug and understand an issue."',
    q3b: '"Now, I rely primarily on instant AI code completions and summaries rather than reading full technical documentation or textbooks."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult coding bugs and algorithmic problems independently?",
    reflectionDesc: "Share your thoughts on how AI affects your programming problem-solving, debugging stamina, or retention of engineering concepts.",
    reflectionPlaceholder: "e.g. Earlier when writing C++ code or debugging memory leaks, I'd read documentation until it clicked. Now I paste errors into AI. It works immediately, but I forget the syntax the next day..."
  },
  architecture: {
    name: "Architecture & Spatial Planning",
    q1a: "1a. What year of your B.Arch / Architecture program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like ChatGPT, Gemini, or Midjourney) for design briefs, structural queries, or spatial case studies?",
    secBDesc: "Reflect on your memory and retention of structural bylaws, load-bearing principles, spatial proportions, and material standards.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall municipal building codes, structural calculations, and design precedents?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of structural formulas, zoning regulations, and architectural standards has:",
    q2c: '"I find myself forgetting building bylaws, material specifications, and structural formulas quickly because I know I can just prompt an AI again."',
    secCDesc: "How instant AI generation has affected your depth of architectural precedent analysis and spatial research.",
    q3a: '"Before AI, I frequently explored multiple diverse architectural monographs, site precedents, and physical library archives to develop a concept."',
    q3b: '"Now, I rely primarily on instant AI summaries and concept prompts rather than thoroughly studying comprehensive building codes and architectural treatises."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through complex spatial layout challenges and structural drafting independently?",
    reflectionDesc: "Share your thoughts on how AI affects your drafting, design intuition, or recall of structural and environmental bylaws.",
    reflectionPlaceholder: "e.g. When working on studio design briefs, I used to study physical case studies and calculate floor area ratios manually. Now AI drafts the brief in seconds, but I notice my mental grip on municipal bylaws is weakening..."
  },
  bba: {
    name: "Business Administration (BBA)",
    q1a: "1a. What year of your BBA program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like ChatGPT or Gemini) for business case studies, market analysis, or presentations?",
    secBDesc: "Reflect on your retention of management frameworks, financial formulas, organizational theories, and market dynamics.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall core business frameworks (e.g. SWOT, Porter's 5 Forces, 4Ps) and financial ratios?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of business theories, market valuation models, and operational principles has:",
    q2c: '"I find myself forgetting management models and case study facts quickly because I know I can just prompt an AI to regenerate them."',
    secCDesc: "How instant AI analysis has influenced your approach to qualitative and quantitative business research.",
    q3a: '"Before AI, I frequently explored multiple diverse business journals, annual reports, and economic news sources to analyze a corporate case."',
    q3b: '"Now, I rely primarily on instant AI case summaries rather than deeply reading complete business whitepapers and financial disclosures."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult market forecasting and quantitative business problems independently?",
    reflectionDesc: "Share your thoughts on how AI affects your business reasoning, pitch preparation, or retention of financial concepts.",
    reflectionPlaceholder: "e.g. When preparing case studies for marketing or finance, I used to synthesize annual reports by hand. Now ChatGPT outlines the strategy immediately, but I find it harder to defend the numbers on the spot during presentations..."
  },
  mba: {
    name: "Management Studies (MBA)",
    q1a: "1a. What year/term of your MBA / Post-Graduate Management program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for strategic consulting frameworks, executive briefing drafts, or financial modeling?",
    secBDesc: "Reflect on your retention of corporate strategy models, balance sheet intricacies, leadership frameworks, and economic indicators.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall strategic management frameworks, valuation methodologies, and econometric models?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of executive frameworks, market entry strategies, and organizational behavioral models has:",
    q2c: '"I find myself forgetting executive decision models and industry benchmark figures quickly because I know I can generate an AI brief in seconds."',
    secCDesc: "How AI executive summaries have shifted your depth of reading Harvard Business Review cases and financial filings.",
    q3a: '"Before AI, I frequently synthesized multiple industry reports, SEC/MCA filings, and academic business journals to build strategic conviction."',
    q3b: '"Now, I rely primarily on instant AI executive summaries rather than dissecting comprehensive 50-page company filings and consultancy whitepapers."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through ambiguous, high-friction strategic business dilemmas independently?",
    reflectionDesc: "Share your perspective on whether AI enhances or erodes strategic judgment, mental synthesis, and executive recall.",
    reflectionPlaceholder: "e.g. In consulting case preps, AI gives an immediate MECE breakdown. While it saves hours, during live whiteboard interviews I realize my instinctive grasp of unit economics isn't as sharp without manual crunching..."
  },
  design: {
    name: "Design & Creative Arts (B.Des / M.Des)",
    q1a: "1a. What year of your Design program (B.Des / M.Des) are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like Midjourney, ChatGPT, or Firefly) for moodboards, UX research briefs, or creative copywriting?",
    secBDesc: "Reflect on your retention of design principles (Gestalt, visual hierarchy, ergonomics, typography scales, material fabrication).",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall fundamental design rules, ergonomics, and color theory principles?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of design history, ergonomics, and human-centered design heuristics has:",
    q2c: '"I find myself forgetting typography scales, UX heuristics, and material specifications quickly because I can just prompt an AI to suggest them."',
    secCDesc: "How generative visual & text tools have transformed your exploratory research and iterative sketching.",
    q3a: '"Before AI, I frequently spent hours exploring diverse design archives, museum exhibitions, physical books, and obscure design blogs for inspiration."',
    q3b: '"Now, I rely primarily on AI-generated prompts and imagery rather than conducting hands-on user fieldwork or studying classic design archives."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through painful creative blocks and iterative manual sketches independently?",
    reflectionDesc: "Share how AI visual generators and copy tools affect your personal creative voice, aesthetic intuition, or technical design retention.",
    reflectionPlaceholder: "e.g. When tackling design briefs, I used to brainstorm 50 thumbnail sketches by hand. Now Midjourney and ChatGPT spit out concepts instantly, but I feel my own aesthetic muscle and ability to justify design choices is getting lazy..."
  },
  law: {
    name: "Law & Legal Jurisprudence (LL.B / LL.M)",
    q1a: "1a. What year of your Law program (LL.B / BA LL.B / LL.M) are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like ChatGPT, Claude, or legal AI tools) for case law research, statutory interpretation, or draft briefs?",
    secBDesc: "Reflect on your memory and retention of statutory sections, landmark case ratios, constitutional precedents, and procedural codes.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall statutory provisions, case citations, and legal ratios decidendi?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of legal precedents, procedural rules (CPC/CrPC), and statutory sections has:",
    q2c: '"I find myself forgetting landmark case names, judicial precedents, and statutory sections quickly because I know an AI can pull them up instantly."',
    secCDesc: "How AI legal assistants have impacted your depth of reading unedited law reports and judicial bench judgments.",
    q3a: '"Before AI, I frequently cross-referenced multiple legal reporters, law reviews, and SCC/AIR volumes to construct a legal argument."',
    q3b: '"Now, I rely primarily on instant AI case summaries rather than reading unedited judicial opinions and full bench judgments (depth)."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through dense, convoluted statutory texts and legal drafting independently?",
    reflectionDesc: "Share how AI impacts your moot court preparation, memorial drafting, or retention of judicial doctrines.",
    reflectionPlaceholder: "e.g. For moot court memorials, I used to read full 120-page Supreme Court judgments to extract subtle dicta. Now AI summarizes the ratio in two paragraphs, but in oral rounds I struggle to answer bench questions on the nuances..."
  },
  medicine: {
    name: "Medicine & Health Sciences (MBBS)",
    q1a: "1a. What professional year / phase of your Medical / Health Sciences program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for clinical case analysis, differential diagnosis study, or medical theory summaries?",
    secBDesc: "Reflect on your retention of anatomical relations, physiological mechanisms, pathology pathways, and pharmacological dosages.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall complex anatomical structures, biochemical pathways, and drug mechanisms?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of clinical criteria, anatomical relations, and pathological pathways has:",
    q2c: '"I find myself forgetting drug mechanisms, diagnostic criteria, and dosage regimens quickly because I know an AI can list them instantly."',
    secCDesc: "How AI medical summaries have influenced your engagement with gold-standard textbooks (e.g. Harrison, Robbins, Gray's).",
    q3a: '"Before AI, I frequently cross-referenced multiple standard medical textbooks, histological atlases, and clinical journals to master a syndrome."',
    q3b: '"Now, I rely primarily on instant AI bullet-point summaries rather than reading complete clinical chapters in standard medical textbooks."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult diagnostic reasoning and pathophysiological mechanisms independently?",
    reflectionDesc: "Share how AI affects your clinical reasoning, memory retention during ward rounds/viva, or study habits in medicine.",
    reflectionPlaceholder: "e.g. When studying differential diagnoses for autoimmune disorders, AI gives a neat table in 5 seconds. But during ward rounds or clinical vivas, I freeze up because passive AI reading doesn't build active clinical recall..."
  },
  pharmacy: {
    name: "Pharmacy & Pharmaceutical Sciences",
    q1a: "1a. What year of your B.Pharm / M.Pharm program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for drug synthesis pathways, pharmacokinetics, or medicinal chemistry assignments?",
    secBDesc: "Reflect on your retention of chemical structures, receptor binding mechanisms, pharmacokinetics (ADME), and formulation science.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall drug classes, SAR (Structure-Activity Relationships), and dosage calculations?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of pharmacology mechanisms, drug interactions, and formulation equations has:",
    q2c: '"I find myself forgetting chemical structures, side-effect profiles, and pharmacokinetics quickly because I know AI can look them up on demand."',
    secCDesc: "How AI has affected your reading of pharmacopoeias (IP/BP/USP) and scientific pharmaceutical research.",
    q3a: '"Before AI, I frequently consulted multiple official pharmacopoeias, chemistry handbooks, and journal articles to understand a formulation."',
    q3b: '"Now, I rely primarily on instant AI summaries rather than reading full pharmacopoeia monographs and drug stability literature."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through complex stereochemistry or pharmacokinetic calculations independently?",
    reflectionDesc: "Share your thoughts on how AI affects your memory of drug interactions, chemical mechanisms, or lab formulations.",
    reflectionPlaceholder: "e.g. In medicinal chemistry, memorizing SAR structures used to require drawing them over and over. With AI explaining the pathway, I feel I understand it in the moment, but forget the functional groups during exams..."
  },
  commerce: {
    name: "Commerce & Accounting (B.Com / M.Com)",
    q1a: "1a. What year of your Commerce (B.Com / M.Com / Professional Course) are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for tax provisions, accounting standards (IFRS/Ind AS), or financial reporting coursework?",
    secBDesc: "Reflect on your retention of ledger rules, tax computation sections, auditing standards, and financial accounting principles.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall accounting standards, tax deductions, and financial statement line items?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of tax laws, statutory exemptions, and complex journal entry rules has:",
    q2c: '"I find myself forgetting statutory tax sections and accounting standards quickly because I know an AI can compute or list them immediately."',
    secCDesc: "How AI has affected your reading of statutory acts, master circulars, and comprehensive balance sheets.",
    q3a: '"Before AI, I frequently consulted multiple accounting manuals, bare tax acts, and audited financial statements to resolve an accounting query."',
    q3b: '"Now, I rely primarily on instant AI tax summaries and solutions rather than deeply studying full statutory tax circulars and accounting standards."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through reconciling complex balance sheets or tax computations independently?",
    reflectionDesc: "Share how AI affects your numerical accuracy, statutory retention, or problem-solving in commerce and auditing.",
    reflectionPlaceholder: "e.g. When solving GST or corporate tax practical problems, I used to memorize section limits and deduction conditions. Now AI formats the entire computation, but I struggle to verify errors without AI assistance..."
  },
  economics: {
    name: "Economics & Econometrics",
    q1a: "1a. What year of your Economics degree are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for econometric modeling, statistical proofs, or economic policy essays?",
    secBDesc: "Reflect on your retention of micro/macro models, mathematical proofs, econometric estimators, and economic doctrines.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall mathematical proofs of economic equilibria, IS-LM curves, and regression assumptions?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of economic models, mathematical derivatives, and econometric assumptions has:",
    q2c: '"I find myself forgetting economic proofs and econometric formulas quickly because I know an AI can derive them on demand."',
    secCDesc: "How AI synthesis has affected your deep reading of primary economic literature (e.g. Keynes, Friedman, AER papers).",
    q3a: '"Before AI, I frequently read multiple seminal economic papers, empirical datasets, and textbooks to understand the intuition behind a model."',
    q3b: '"Now, I rely primarily on instant AI breakdowns rather than working through the dense mathematical appendices of empirical economics papers."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult mathematical economic proofs and econometric regressions independently?",
    reflectionDesc: "Share how AI impacts your economic intuition, mathematical derivation stamina, or retention of macroeconomic models.",
    reflectionPlaceholder: "e.g. In advanced microeconomics, working through Lagrangian utility maximization by hand cemented the intuition. When AI gives the step-by-step derivation immediately, the conceptual friction disappears and so does my memory..."
  },
  pure_sciences: {
    name: "Pure Sciences (Physics, Chemistry, Math)",
    q1a: "1a. What year of your Pure Sciences program (B.Sc / M.Sc) are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for solving scientific equations, theorem proofs, or lab analysis?",
    secBDesc: "Reflect on your retention of fundamental scientific laws, mathematical derivations, chemical mechanisms, and physical constants.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall core physical laws, organic reaction mechanisms, and mathematical proofs?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of scientific principles, mathematical lemmas, and physical equations has:",
    q2c: '"I find myself forgetting mathematical theorem steps and chemical pathways quickly because I know an AI can prove or generate them in seconds."',
    secCDesc: "How instant scientific AI answers have affected your deep engagement with peer-reviewed physics/chemistry journals and textbooks.",
    q3a: '"Before AI, I frequently consulted multiple scientific treatises, peer-reviewed journals, and specialized problem sets to understand a natural law."',
    q3b: '"Now, I rely primarily on instant AI solutions and summaries rather than working through rigorous scientific derivations in classical textbooks."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through rigorous, multi-page mathematical proofs or scientific problem sets independently?",
    reflectionDesc: "Share your thoughts on how AI affects your scientific rigor, problem-solving stamina, or memory of foundational derivations.",
    reflectionPlaceholder: "e.g. In quantum mechanics or organic reaction mechanisms, the mental grind of deriving wave equations was where the actual learning happened. Now AI delivers the proof instantly, but I can't replicate it on paper without peeking..."
  },
  biotech: {
    name: "Biotechnology & Life Sciences",
    q1a: "1a. What year of your Biotechnology / Life Sciences program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for genetic protocols, bioinformatic analysis, or molecular biology assignments?",
    secBDesc: "Reflect on your retention of metabolic pathways, genetic sequencing algorithms, cell signaling cascades, and enzymatic kinetics.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall molecular pathways, enzyme kinetics equations, and gene expression mechanisms?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of cellular signaling pathways, genetic regulation, and bioprocess formulas has:",
    q2c: '"I find myself forgetting molecular pathways and lab protocol parameters quickly because I know an AI can list them instantly."',
    secCDesc: "How AI literature summaries have impacted your reading of primary biological research papers and NCBI/EMBL databases.",
    q3a: '"Before AI, I frequently read multiple PubMed papers, experimental protocols, and molecular biology textbooks to design an experiment."',
    q3b: '"Now, I rely primarily on instant AI literature overviews rather than reading full experimental methodology sections in peer-reviewed biology journals."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through complex bioinformatic data pipelines and molecular puzzles independently?",
    reflectionDesc: "Share how AI impacts your retention of biological systems, wet-lab trouble-shooting, or experimental design.",
    reflectionPlaceholder: "e.g. When designing PCR primers or analyzing recombinant DNA pathways, AI gives the protocol in seconds. But during wet-lab vivas, I struggle to explain the biochemical reasoning without checking an AI chat..."
  },
  psychology: {
    name: "Psychology & Behavioral Sciences",
    q1a: "1a. What year of your Psychology / Behavioral Sciences degree are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for psychological essays, cognitive theory research, or statistical analysis?",
    secBDesc: "Reflect on your retention of psychological theories, neurobiological mechanisms, diagnostic criteria (DSM/ICD), and psychometric scales.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall foundational psychological theories, neuroanatomy, and statistical test assumptions?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of behavioral theories, experimental methodologies, and cognitive psychology concepts has:",
    q2c: '"I find myself forgetting psychological study citations and theoretical models quickly because I know an AI can synthesize them on command."',
    secCDesc: "How AI summaries have affected your reading of classic psychological experiments and empirical journal articles.",
    q3a: '"Before AI, I frequently read multiple primary empirical psychology studies, meta-analyses, and theoretical monographs to form an argument."',
    q3b: '"Now, I rely primarily on instant AI summaries of psychological papers rather than reading full empirical methods and discussion sections."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through complex psychological statistics and conceptual ambiguities independently?",
    reflectionDesc: "Share your experience on how AI affects your psychological critical thinking, recall of empirical studies, or understanding of human cognition.",
    reflectionPlaceholder: "e.g. As a psychology student studying cognitive offloading, using AI is fascinating. I find myself offloading authors and experiment setups to ChatGPT, remembering only the general finding but none of the methodology..."
  },
  liberal_arts: {
    name: "Liberal Arts & Humanities",
    q1a: "1a. What year of your Liberal Arts / Humanities degree are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for textual analysis, philosophical essays, or historical research?",
    secBDesc: "Reflect on your retention of philosophical treatises, historical timelines, literary criticism theories, and rhetorical devices.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall historical chronologies, philosophical arguments, and literary frameworks?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of literary texts, philosophical arguments, and historical context has:",
    q2c: '"I find myself forgetting textual nuances, quotes, and historical dates quickly because I know an AI can provide them instantly."',
    secCDesc: "How AI has affected your reading of original primary texts, philosophical treatises, and historical archives.",
    q3a: '"Before AI, I frequently read entire primary literary texts, historical source documents, and philosophical treatises from cover to cover."',
    q3b: '"Now, I rely primarily on instant AI chapter summaries and thematic breakdowns rather than immersing myself in full primary literary texts."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through dense, difficult philosophical prose and original close-reading independently?",
    reflectionDesc: "Share your thoughts on how AI affects your voice as a writer, your critical reading stamina, or memory of literary/historical texts.",
    reflectionPlaceholder: "e.g. In literary studies, close reading requires wrestling with difficult prose line by line. When AI summarizes Heidegger or Shakespeare, the surface meaning is there, but the deep interpretive struggle that builds genuine intellectual depth is lost..."
  },
  mass_comm: {
    name: "Journalism & Mass Communication",
    q1a: "1a. What year of your Journalism / Mass Communication program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools for news story angles, editorial copy, media research, or interview questions?",
    secBDesc: "Reflect on your retention of media ethics codes, communication theories, current affairs chronology, and journalistic guidelines.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall media laws, news framing theories, and factual current affairs context?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of media theories, investigative reporting frameworks, and historical facts has:",
    q2c: '"I find myself forgetting factual chronologies and media guidelines quickly because I know an AI can draft backgrounders in seconds."',
    secCDesc: "How instant AI news generation has influenced your investigative curiosity and multi-source verification.",
    q3a: '"Before AI, I frequently contacted multiple human sources, verified across diverse archives, and read complete investigative exposés."',
    q3b: '"Now, I rely primarily on instant AI story summaries and synthesized angles rather than conducting exhaustive primary investigative research."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult story investigations and independent editorial drafting?",
    reflectionDesc: "Share how AI impacts your journalistic voice, fact-checking habits, or retention of media theory.",
    reflectionPlaceholder: "e.g. When writing investigative features, AI generates a neat story skeleton and list of angles in seconds. But I notice I rely less on digging into archives myself, and my mental archive of source details feels much hazier..."
  },
  general: {
    name: "Interdisciplinary Academic Studies",
    q1a: "1a. What year of your degree program are you currently in?",
    q1b: "1b. How often do you use Generative AI tools (like ChatGPT or Gemini) for academic research, coursework, or assignments?",
    secBDesc: "Reflect on your memory and retention of foundational academic concepts, formulas, and theories.",
    q2a: "2a. Reflecting on your study habits before AI was highly accessible, how would you rate your ability to recall complex concepts and discipline-specific principles?",
    q2b: "2b. Since actively using AI tools, I feel my long-term retention of academic information and core subject knowledge has:",
    q2c: '"I find myself forgetting information quickly because I know I can just prompt an AI again."',
    secCDesc: "How AI accessibility has affected your research depth and willingness to consult primary academic literature.",
    q3a: '"Before AI, I frequently explored multiple diverse primary sources (breadth) to find an answer and build deep understanding."',
    q3b: '"Now, I rely primarily on instant AI summaries rather than reading full academic papers, textbooks, or technical documentation (depth)."',
    q3c: "3c. How has the accessibility of AI impacted your willingness to struggle through difficult academic problems independently?",
    reflectionDesc: "Feel free to type any thoughts on how AI affects your study habits, problem-solving stamina, or memory in your field.",
    reflectionPlaceholder: "Share your personal academic experience here..."
  }
};

// Helper: Map course select value to discipline profile key
function getDisciplineKey(val) {
  if (!val) return 'general';
  const lower = val.toLowerCase();
  if (lower.includes('arch') || lower.includes('spatial')) return 'architecture';
  if (lower.includes('bba')) return 'bba';
  if (lower.includes('mba') || lower.includes('management')) return 'mba';
  if (lower.includes('des') || lower.includes('design') || lower.includes('visual')) return 'design';
  if (lower.includes('law') || lower.includes('ll.b') || lower.includes('legal') || lower.includes('ll.m')) return 'law';
  if (lower.includes('mbbs') || lower.includes('health') || lower.includes('medicine')) return 'medicine';
  if (lower.includes('pharm')) return 'pharmacy';
  if (lower.includes('b.com') || lower.includes('commerce') || lower.includes('accounting')) return 'commerce';
  if (lower.includes('economic')) return 'economics';
  if (lower.includes('pure science') || lower.includes('physics') || lower.includes('chemistry') || lower.includes('mathematics')) return 'pure_sciences';
  if (lower.includes('biotech') || lower.includes('life science')) return 'biotech';
  if (lower.includes('psycholog') || lower.includes('behavioral')) return 'psychology';
  if (lower.includes('liberal art') || lower.includes('humanities')) return 'liberal_arts';
  if (lower.includes('journalism') || lower.includes('mass comm') || lower.includes('media')) return 'mass_comm';
  if (lower.includes('b.tech') || lower.includes('engineer') || lower.includes('computer') || lower.includes('cyber') || lower.includes('robotics')) return 'engineering';
  return 'general';
}

// Dynamically re-contextualize the questionnaire for the student's background
function applyDisciplineProfile(profileKey) {
  const profile = DISCIPLINE_PROFILES[profileKey] || DISCIPLINE_PROFILES.general;
  
  // Update badge banner
  const badgeWrap = document.getElementById('discipline-badge-wrap');
  const badgeName = document.getElementById('disc-badge-name');
  if (badgeWrap && badgeName) {
    badgeName.textContent = profile.name;
    badgeWrap.style.display = 'flex';
  }

  // Smooth cross-fade updater
  const updateWithFade = (elementId, htmlContent) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.classList.remove('question-text-fade');
    void el.offsetWidth; // Trigger reflow
    el.innerHTML = htmlContent;
    el.classList.add('question-text-fade');
  };

  updateWithFade('q1a-title', `${profile.q1a} <span class="required">*</span>`);
  updateWithFade('q1b-title', `${profile.q1b} <span class="required">*</span>`);
  
  const secBDesc = document.getElementById('sec-b-desc');
  if (secBDesc) {
    secBDesc.classList.remove('question-text-fade');
    void secBDesc.offsetWidth;
    secBDesc.textContent = profile.secBDesc;
    secBDesc.classList.add('question-text-fade');
  }

  updateWithFade('q2a-title', `${profile.q2a} <span class="required">*</span>`);
  updateWithFade('q2b-title', `${profile.q2b} <span class="required">*</span>`);
  updateWithFade('q2c-title', `${profile.q2c} <span class="required">*</span>`);

  const secCDesc = document.getElementById('sec-c-desc');
  if (secCDesc) {
    secCDesc.classList.remove('question-text-fade');
    void secCDesc.offsetWidth;
    secCDesc.textContent = profile.secCDesc;
    secCDesc.classList.add('question-text-fade');
  }

  updateWithFade('q3a-title', `${profile.q3a} <span class="required">*</span>`);
  updateWithFade('q3b-title', `${profile.q3b} <span class="required">*</span>`);
  updateWithFade('q3c-title', `${profile.q3c} <span class="required">*</span>`);

  const refDesc = document.getElementById('reflection-desc');
  if (refDesc) {
    refDesc.classList.remove('question-text-fade');
    void refDesc.offsetWidth;
    refDesc.textContent = profile.reflectionDesc;
    refDesc.classList.add('question-text-fade');
  }

  const refInput = document.getElementById('personal_reflection');
  if (refInput && profile.reflectionPlaceholder) {
    refInput.placeholder = profile.reflectionPlaceholder;
  }
}

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

  // Real-time dynamic discipline questionnaire switcher
  const courseSelect = document.getElementById('course');
  if (courseSelect) {
    courseSelect.addEventListener('change', (e) => {
      const selectedValue = e.target.value;
      const profileKey = getDisciplineKey(selectedValue);
      applyDisciplineProfile(profileKey);
    });

    // Initial check if pre-filled by browser cache
    if (courseSelect.value) {
      applyDisciplineProfile(getDisciplineKey(courseSelect.value));
    }
  }

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
      setError('err-course', 'Please select your course / degree program.');
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
      'Course / Degree',
      'Phone Number',
      'Academic Year',
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
      ['Author: Kabir | Target Population: University Students Across Multiple Academic Disciplines'],
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
      ['Total Survey Respondents', total, 'Interdisciplinary student sample at Woxsen University'],
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
