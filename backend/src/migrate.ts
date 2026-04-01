import pool from "./db";

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS issues (
      id SERIAL PRIMARY KEY,
      identifier VARCHAR(20) NOT NULL,
      title VARCHAR(500) NOT NULL,
      description TEXT DEFAULT '',
      status VARCHAR(50) NOT NULL DEFAULT 'todo',
      priority VARCHAR(50) NOT NULL DEFAULT 'none',
      assignee VARCHAR(200) DEFAULT NULL,
      labels TEXT[] DEFAULT '{}',
      project VARCHAR(200) DEFAULT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );

    -- Seed some initial issues if table is empty
    INSERT INTO issues (identifier, title, description, status, priority)
    SELECT * FROM (VALUES
      ('MCP-1', 'Get familiar with Linear', 'Welcome to Linear! Watch an introductory video and access a list of resources below.', 'todo', 'none'),
      ('MCP-2', 'Set up your teams', 'Configure your team structure and invite team members.', 'todo', 'none'),
      ('MCP-3', 'Connect your tools', 'Integrate with GitHub, Slack, and other tools your team uses.', 'todo', 'none'),
      ('MCP-4', 'Import your data', 'Import existing issues from Jira, Asana, or other project management tools.', 'todo', 'none')
    ) AS seed(identifier, title, description, status, priority)
    WHERE NOT EXISTS (SELECT 1 FROM issues LIMIT 1);
  `);

  console.log("Migration complete");
  await pool.end();
}

migrate().catch(console.error);
