import { useState, useEffect } from "react";
import { Issue } from "./types";

interface IssueDetailProps {
  issue: Issue;
  issueCount: number;
  issueIndex: number;
  onBack: () => void;
  onUpdate: (id: number, data: Partial<Issue>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function IssueDetail({
  issue,
  issueCount,
  issueIndex,
  onBack,
  onUpdate,
  onDelete,
}: IssueDetailProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(issue.title);
    setDescription(issue.description);
  }, [issue]);

  const handleSave = async (field: string, value: string) => {
    setSaving(true);
    await onUpdate(issue.id, { [field]: value });
    setSaving(false);
  };

  return (
    <div className="issue-detail">
      <div className="breadcrumb-bar">
        <div className="team-icon" style={{ width: 16, height: 16, fontSize: 8 }}>M</div>
        <span className="breadcrumb-link" onClick={onBack}>MCPworkshop</span>
        <span style={{ color: "#c4c4cc" }}>›</span>
        <span className="breadcrumb-current">
          {issue.identifier} {issue.title}
        </span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, color: "#8b8b96", fontSize: 13 }}>
          <span>{issueIndex} / {issueCount}</span>
        </div>
      </div>

      <div className="issue-detail-wrapper">
        <div className="issue-detail-content">
          <input
            className="issue-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleSave("title", title)}
          />
          <textarea
            className="issue-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => handleSave("description", description)}
            placeholder="Add description..."
          />
          {saving && <span className="save-indicator">Saving...</span>}
        </div>

        <div className="properties-panel">
          <div className="properties-title">Properties ▾</div>

          <div className="property-row">
            <div className="property-status" />
            <select
              className="status-select"
              value={issue.status}
              onChange={(e) => onUpdate(issue.id, { status: e.target.value })}
            >
              <option value="backlog">Backlog</option>
              <option value="todo">Todo</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="property-row">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="3" y1="8" x2="5" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
              <line x1="7" y1="8" x2="9" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
              <line x1="11" y1="8" x2="13" y2="8" stroke="#c4c4cc" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <select
              className="priority-select"
              value={issue.priority}
              onChange={(e) => onUpdate(issue.id, { priority: e.target.value })}
            >
              <option value="none">No priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="property-section">
            <div className="property-section-title">Labels ▾</div>
            <div className="property-row">
              <span className="property-label" style={{ color: "#8b8b96" }}>Add label</span>
            </div>
          </div>

          <div className="property-section">
            <div className="property-section-title">Project ▾</div>
            <div className="property-row">
              <span className="property-label" style={{ color: "#8b8b96" }}>Add to project</span>
            </div>
          </div>

          <div className="property-section">
            <button className="delete-btn" onClick={() => onDelete(issue.id)}>
              Delete issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
