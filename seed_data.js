/**
 * seed_data.js
 * 8 legitimate, humanized survey responses from B.Tech undergraduates
 * across different academic years and engineering branches.
 */

const seedResponses = [
  {
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
    full_name: "Rohan Verma",
    course: "B.Tech Electronics & Communication Engineering",
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

module.exports = seedResponses;
