// types/attorney.ts

export interface Attorney {
  _id: string;
  name: string;
  email: string;
  phone: string;
  designation?: string;
  role?: string;
  location: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  biography: string;
  profileImage?: string;
  bannerImage?: string;
  education: string[];
  barAdmission: string[];
  professionalMemberships: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface AttorneyFormData {
  name: string;
  email: string;
  phone: string;
  designation?: string;
  location: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  biography: string;
  profileImage?: File | string;
  bannerImage?: File | string;
  education: string[];
  barAdmission: string[];
  professionalMemberships: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  status?: "active" | "inactive";
}

export interface AttorneyState {
  attorneys: Attorney[];
  selectedAttorney: Attorney | null;
  isLoading: boolean;
  error: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
