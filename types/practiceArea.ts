// types/practiceArea.ts

export interface PracticeArea {
  _id: string;
  title: string;
  description: string;
  image?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface PracticeAreaFormData {
  title: string;
  description: string;
  image?: File | string;
  status?: "active" | "inactive";
}

export interface PracticeAreaState {
  practiceAreas: PracticeArea[];
  selectedPracticeArea: PracticeArea | null;
  isLoading: boolean;
  error: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
