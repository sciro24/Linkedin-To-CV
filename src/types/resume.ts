export interface ResumeData {
  profile: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string; // e.g., "Jan 2020"
    endDate: string;   // e.g., "Present" or "Dec 2022"
    description: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
  }>;
  skills: string[];
}
