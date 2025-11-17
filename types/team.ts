// types/team.ts

export interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  designation: string;
  biography: string;
  profileImage: string | File;
  bannerImage: string | File;
  education: string[];
  barAdmission: string[];
  professionalMemberships: string[];
  date: string;
}