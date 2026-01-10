export interface RequestBody {
  file: File;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  visible: boolean;
}

export interface Certification {
  name: string;
  visible: boolean;
}

export interface ResumeData {
  personal_info: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    portfolioUrl: string;
    summary: string;
  };
  work_experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: LanguageItem[];
  certifications: Certification[];
}

export interface LanguageItem {
  name: string;
  visible: boolean;
}
