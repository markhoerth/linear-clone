import express from "express";
import cors from "cors";
import { getDb, saveDb } from "./db";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

function queryAll(db: any, sql: string, params: any[] = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows: any[] = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(db: any, sql: string, params: any[] = []) {
  const rows = queryAll(db, sql, params);
  return rows[0] || null;
}

// GET /api/issues
app.get("/api/issues", async (_req, res) => {
  try {
    const db = await getDb();
    const rows = queryAll(db, "SELECT * FROM issues ORDER BY created_at ASC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
});

// GET /api/issues/:id
app.get("/api/issues/:id", async (req, res) => {
  try {
    const db = await getDb();
    const row = queryOne(db, "SELECT * FROM issues WHERE id = ?", [Number(req.params.id)]);
    if (!row) return res.status(404).json({ error: "Issue not found" });
    res.json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch issue" });
  }
});

// POST /api/issues
app.post("/api/issues", async (req, res) => {
  try {
    const db = await getDb();
    const { title, description, status, priority, assignee, labels, project } = req.body;

    const countRow = queryOne(db, "SELECT COUNT(*) as c FROM issues");
    const identifier = `MCP-${(countRow?.c || 0) + 1}`;

    db.run(
      `INSERT INTO issues (identifier, title, description, status, priority, assignee, labels, project)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        identifier,
        title,
        description || "",
        status || "backlog",
        priority || "none",
        assignee || null,
        JSON.stringify(labels || []),
        project || null,
      ]
    );
    saveDb();

    const lastId = db.exec("SELECT last_insert_rowid()")[0].values[0][0];
    const issue = queryOne(db, "SELECT * FROM issues WHERE id = ?", [lastId as number]);
    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create issue" });
  }
});

// PUT /api/issues/:id
app.put("/api/issues/:id", async (req, res) => {
  try {
    const db = await getDb();
    const id = Number(req.params.id);
    const existing = queryOne(db, "SELECT * FROM issues WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Issue not found" });

    const { title, description, status, priority, assignee, labels, project } = req.body;

    db.run(
      `UPDATE issues SET
        title = ?, description = ?, status = ?, priority = ?,
        assignee = ?, labels = ?, project = ?, updated_at = datetime('now')
      WHERE id = ?`,
      [
        title ?? existing.title,
        description ?? existing.description,
        status ?? existing.status,
        priority ?? existing.priority,
        assignee !== undefined ? assignee : existing.assignee,
        labels ? JSON.stringify(labels) : existing.labels,
        project !== undefined ? project : existing.project,
        id,
      ]
    );
    saveDb();

    const updated = queryOne(db, "SELECT * FROM issues WHERE id = ?", [id]);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update issue" });
  }
});

// DELETE /api/issues/:id
app.delete("/api/issues/:id", async (req, res) => {
  try {
    const db = await getDb();
    const id = Number(req.params.id);
    const existing = queryOne(db, "SELECT * FROM issues WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Issue not found" });

    db.run("DELETE FROM issues WHERE id = ?", [id]);
    saveDb();
    res.json({ message: "Issue deleted", issue: existing });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete issue" });
  }
});

async function start() {
  await getDb();
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}

start().catch(console.error);
