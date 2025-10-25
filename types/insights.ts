// types/insights.ts

export interface CaseInsight {
  id: number;
  title: string;
  type: string;
  description: string;
  outcome: string;
  date: string;
  status: "active" | "inactive";
}

export interface InsightFormData {
  title: string;
  type: string;
  description: string;
  outcome: string;
}
