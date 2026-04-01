import { useState, useEffect, useCallback } from "react";
import { Issue } from "./types";
import * as api from "./api";
import Sidebar from "./Sidebar";
import TeamView from "./TeamView";
import IssueDetail from "./IssueDetail";
import CreateModal from "./CreateModal";

export default function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [view, setView] = useState<"list" | "detail">("list");

  const loadIssues = useCallback(async () => {
    try {
      const data = await api.fetchIssues();
      setIssues(data);
    } catch (err) {
      console.error("Failed to load issues:", err);
    }
  }, []);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const handleSelectIssue = (issue: Issue) => {
    setSelectedIssue(issue);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedIssue(null);
    loadIssues();
  };

  const handleCreateIssue = async (data: {
    title: string;
    description: string;
    status: string;
    priority: string;
  }) => {
    await api.createIssue(data);
    setShowCreateModal(false);
    loadIssues();
  };

  const handleUpdateIssue = async (id: number, data: Partial<Issue>) => {
    const updated = await api.updateIssue(id, data);
    setSelectedIssue(updated);
    loadIssues();
  };

  const handleDeleteIssue = async (id: number) => {
    await api.deleteIssue(id);
    handleBackToList();
  };

  return (
    <div className="app-layout">
      <Sidebar onCreateClick={() => setShowCreateModal(true)} />

      <main className="main-content">
        {view === "list" ? (
          <TeamView
            issues={issues}
            onSelectIssue={handleSelectIssue}
            onCreateClick={() => setShowCreateModal(true)}
          />
        ) : selectedIssue ? (
          <IssueDetail
            issue={selectedIssue}
            issueCount={issues.length}
            issueIndex={issues.findIndex((i) => i.id === selectedIssue.id) + 1}
            onBack={handleBackToList}
            onUpdate={handleUpdateIssue}
            onDelete={handleDeleteIssue}
          />
        ) : null}
      </main>

      {showCreateModal && (
        <CreateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateIssue}
        />
      )}

      <div className="help-btn">?</div>
    </div>
  );
}
