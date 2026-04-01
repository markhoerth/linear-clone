export interface Issue {
  id: number;
  identifier: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string | null;
  labels: string[];
  project: string | null;
  created_at: string;
  updated_at: string;
}
