import { Issue } from "./types";

interface TeamViewProps {
  issues: Issue[];
  onSelectIssue: (issue: Issue) => void;
  onCreateClick: () => void;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function PriorityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="3" y1="8" x2="5" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="7" y1="8" x2="9" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
      <line x1="11" y1="8" x2="13" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export default function TeamView({ issues, onSelectIssue, onCreateClick }: TeamViewProps) {
  const todoIssues = issues.filter((i) => i.status === "todo");
  const backlogIssues = issues.filter((i) => i.status === "backlog");
  const inProgressIssues = issues.filter((i) => i.status === "in_progress");
  const doneIssues = issues.filter((i) => i.status === "done");

  const groups = [
    { label: "In Progress", issues: inProgressIssues },
    { label: "Todo", issues: todoIssues },
    { label: "Backlog", issues: backlogIssues },
    { label: "Done", issues: doneIssues },
  ].filter((g) => g.issues.length > 0);

  return (
    <>
      <div className="main-header">
        <div className="main-title">
          <div className="team-icon">M</div>
          <h1>MCPworkshop</h1>
        </div>
      </div>

      <div className="tabs">
        <div className="tab active">All issues</div>
        <div className="tab">Active</div>
        <div className="tab">Backlog</div>
      </div>

      <div className="filter-bar">
        <button className="filter-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1.5 3.5h11M3.5 7h7M5.5 10.5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Filter
        </button>
      </div>

      <div className="issue-list">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="group-header">
              <span style={{ fontSize: 10, color: "#8b8b96" }}>▾</span>
              <div className="group-icon" />
              <span>{group.label}</span>
              <span className="group-count">{group.issues.length}</span>
              <button className="add-issue-btn" onClick={onCreateClick}>+</button>
            </div>
            {group.issues.map((issue) => (
              <div
                key={issue.id}
                className="issue-row"
                onClick={() => onSelectIssue(issue)}
              >
                <div className="issue-priority">
                  <PriorityIcon />
                </div>
                <div className="issue-status" />
                <span className="issue-id">{issue.identifier}</span>
                <span className="issue-title-text">{issue.title}</span>
                <div className="issue-meta">
                  <span className="issue-date">{formatDate(issue.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        ))}

        {issues.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "#8b8b96" }}>
            No issues yet. Click + to create one.
          </div>
        )}
      </div>
    </>
  );
}
