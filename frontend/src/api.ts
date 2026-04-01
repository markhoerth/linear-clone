import { Issue } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function fetchIssues(): Promise<Issue[]> {
  const res = await fetch(`${API_URL}/api/issues`);
  if (!res.ok) throw new Error("Failed to fetch issues");
  return res.json();
}

export async function fetchIssue(id: number): Promise<Issue> {
  const res = await fetch(`${API_URL}/api/issues/${id}`);
  if (!res.ok) throw new Error("Failed to fetch issue");
  return res.json();
}

export async function createIssue(data: {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}): Promise<Issue> {
  const res = await fetch(`${API_URL}/api/issues`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create issue");
  return res.json();
}

export async function updateIssue(
  id: number,
  data: Partial<Issue>
): Promise<Issue> {
  const res = await fetch(`${API_URL}/api/issues/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update issue");
  return res.json();
}

export async function deleteIssue(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/issues/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete issue");
}
