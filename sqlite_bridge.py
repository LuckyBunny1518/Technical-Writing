"""
sqlite_bridge.py
Zero-dependency Python SQLite interface for survey database.
Usage: python sqlite_bridge.py <db_path> <action> [payload_json]
"""

import sqlite3
import json
import sys

def main():
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing arguments"}))
        sys.exit(1)

    db_path = sys.argv[1]
    action = sys.argv[2]
    payload_str = sys.argv[3] if len(sys.argv) > 3 else "{}"

    con = sqlite3.connect(db_path)
    con.row_factory = sqlite3.Row
    cur = con.cursor()

    cur.execute('''
    CREATE TABLE IF NOT EXISTS survey_responses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        course TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        year_of_study TEXT NOT NULL,
        ai_usage_frequency TEXT NOT NULL,
        recall_before_ai INTEGER NOT NULL,
        retention_since_ai TEXT NOT NULL,
        forget_quickly_likert INTEGER NOT NULL,
        breadth_before_ai_likert INTEGER NOT NULL,
        depth_now_ai_likert INTEGER NOT NULL,
        struggle_independence TEXT NOT NULL,
        personal_reflection TEXT,
        created_at TEXT NOT NULL
    )
    ''')
    con.commit()

    if action == "init":
        print(json.dumps({"status": "ok"}))

    elif action == "getAll":
        cur.execute("SELECT * FROM survey_responses ORDER BY id ASC")
        rows = [dict(r) for r in cur.fetchall()]
        print(json.dumps(rows))

    elif action == "insert":
        data = json.loads(payload_str)
        cur.execute('''
        INSERT INTO survey_responses (
            full_name, course, phone_number, year_of_study, ai_usage_frequency,
            recall_before_ai, retention_since_ai, forget_quickly_likert,
            breadth_before_ai_likert, depth_now_ai_likert, struggle_independence,
            personal_reflection, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data.get("full_name"),
            data.get("course"),
            data.get("phone_number"),
            data.get("year_of_study"),
            data.get("ai_usage_frequency"),
            int(data.get("recall_before_ai")),
            data.get("retention_since_ai"),
            int(data.get("forget_quickly_likert")),
            int(data.get("breadth_before_ai_likert")),
            int(data.get("depth_now_ai_likert")),
            data.get("struggle_independence"),
            data.get("personal_reflection", ""),
            data.get("created_at")
        ))
        con.commit()
        new_id = cur.lastrowid
        print(json.dumps({"status": "ok", "id": new_id}))

    elif action == "count":
        cur.execute("SELECT COUNT(*) as cnt FROM survey_responses")
        cnt = cur.fetchone()["cnt"]
        print(json.dumps({"count": cnt}))

    else:
        print(json.dumps({"error": f"Unknown action {action}"}))

    con.close()

if __name__ == "__main__":
    main()
