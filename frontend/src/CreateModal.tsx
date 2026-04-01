import { useState } from "react";

interface CreateModalProps {
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) => Promise<void>;
}

export default function CreateModal({ onClose, onCreate }: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("backlog");
  const [priority, setPriority] = useState("none");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setSubmitting(true);
    await onCreate({ title, description, status, priority });
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="team-icon" style={{ width: 18, height: 18 }}>M</div>
          <span style={{ color: "#8b8b96", fontSize: 13 }}>MCP</span>
          <span style={{ color: "#c4c4cc" }}>›</span>
          <span className="modal-subtitle">New issue</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <input
            className="modal-title-input"
            placeholder="Issue title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="modal-description-input"
            placeholder="Add description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-properties">
          <select
            className="property-pill"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ appearance: "auto" }}
          >
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
          </select>
          <select
            className="property-pill"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ appearance: "auto" }}
          >
            <option value="none">Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="modal-footer">
          <div className="modal-footer-right">
            <button
              className="create-btn"
              onClick={handleSubmit}
              disabled={!title.trim() || submitting}
            >
              {submitting ? "Creating..." : "Create issue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
