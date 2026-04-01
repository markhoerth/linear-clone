import initSqlJs, { Database } from "sql.js";
import fs from "fs";
import path from "path";

let db: Database;
const dbPath = path.join(__dirname, "..", "data.db");

export async function getDb(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS issues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      identifier TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      status TEXT NOT NULL DEFAULT 'todo',
      priority TEXT NOT NULL DEFAULT 'none',
      assignee TEXT DEFAULT NULL,
      labels TEXT DEFAULT '[]',
      project TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const [count] = db.exec("SELECT COUNT(*) as c FROM issues");
  if (count.values[0][0] === 0) {
    const stmt = db.prepare(
      "INSERT INTO issues (identifier, title, description, status, priority) VALUES (?, ?, ?, ?, ?)"
    );
    stmt.run(["MCP-1", "Get familiar with Linear", "Welcome to Linear! Watch an introductory video and access a list of resources below.", "todo", "none"]);
    stmt.run(["MCP-2", "Set up your teams", "Configure your team structure and invite team members.", "todo", "none"]);
    stmt.run(["MCP-3", "Connect your tools", "Integrate with GitHub, Slack, and other tools your team uses.", "todo", "none"]);
    stmt.run(["MCP-4", "Import your data", "Import existing issues from Jira, Asana, or other project management tools.", "todo", "none"]);
    stmt.free();
  }

  saveDb();
  return db;
}

export function saveDb() {
  if (!db) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}
