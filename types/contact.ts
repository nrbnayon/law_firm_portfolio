// types/contact.ts

export interface ContactInfo {
  _id?: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactState {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  error: string | null;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  matterType: string;
  message: string;
  agreement: boolean;
}