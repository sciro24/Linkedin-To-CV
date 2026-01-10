import { ResumeData } from '@/types/resume';
import { Template1Web } from './templates/Template1Web';
import { Template1Pdf } from './templates/Template1Pdf';
import { Template2Web } from './templates/Template2Web';
import { Template2Pdf } from './templates/Template2Pdf';
import { Template3Web } from './templates/Template3Web';
import { Template3Pdf } from './templates/Template3Pdf';
import { Template4Web } from './templates/Template4Web';
import { Template4Pdf } from './templates/Template4Pdf';
import { Template5Web } from './templates/Template5Web';

import { Template5Pdf } from './templates/Template5Pdf';
import { Template6Web } from './templates/Template6Web';
import { Template6Pdf } from './templates/Template6Pdf';
import { Template7Web } from './templates/Template7Web';
import { Template7Pdf } from './templates/Template7Pdf';
import { Template8Web } from './templates/Template8Web';
import { Template8Pdf } from './templates/Template8Pdf';
import { Language } from '@/utils/translations';

export interface TemplateConfig {
  id: string;
  name: string;
  styles: string;
  Web: React.FC<{ data: ResumeData; profileImage?: string; language: Language; primaryColor?: string }>;
  Pdf: React.FC<{ data: ResumeData; profileImage?: string; language: Language; primaryColor?: string }>;
  thumbnail: string;
  defaultPrimaryColor: string;
}

export const templates: TemplateConfig[] = [
  {
    id: 'template1',
    name: 'Modern Left Sidebar',
    styles: 'bg-slate-800',
    Web: Template1Web,
    Pdf: Template1Pdf,
    thumbnail: 'bg-slate-800',
    defaultPrimaryColor: '#1E293B', // Slate 800
  },
  {
    id: 'template2',
    name: 'Professional Top Header',
    styles: 'bg-[#2C3E50]',
    Web: Template2Web,
    Pdf: Template2Pdf,
    thumbnail: 'bg-[#2C3E50]',
    defaultPrimaryColor: '#2C3E50', // Navy
  },
  {
    id: 'template3',
    name: 'Elegant Right Sidebar',
    styles: 'bg-[#F1F5F9]',
    Web: Template3Web,
    Pdf: Template3Pdf,
    thumbnail: 'bg-[#F1F5F9]',
    defaultPrimaryColor: '#334155', // Slate 700
  },
  {
    id: 'template4',
    name: 'Minimalist Clean',
    styles: 'bg-white border',
    Web: Template4Web,
    Pdf: Template4Pdf,
    thumbnail: 'bg-white',
    defaultPrimaryColor: '#000000', // Black
  },
  {
    id: 'template5',
    name: 'Bold Creative',
    styles: 'bg-indigo-600',
    Web: Template5Web,
    Pdf: Template5Pdf,
    thumbnail: 'bg-indigo-600',
    defaultPrimaryColor: '#4F46E5', // Indigo 600
  },
  {
    id: 'template6',
    name: 'ATS Clean',
    styles: 'bg-white',
    Web: Template6Web,
    Pdf: Template6Pdf,
    thumbnail: 'bg-white border-2 border-slate-200',
    defaultPrimaryColor: '#000000', // Black
  },
  {
    id: 'template7',
    name: 'Modern Executive',
    styles: 'bg-white',
    Web: Template7Web,
    Pdf: Template7Pdf,
    thumbnail: 'bg-white border-t-8 border-slate-700',
    defaultPrimaryColor: '#2d3748', // Dark Gray
  },
  {
    id: 'template8',
    name: 'Tech Minimalist',
    styles: 'bg-slate-50',
    Web: Template8Web,
    Pdf: Template8Pdf,
    thumbnail: 'bg-slate-50',
    defaultPrimaryColor: '#0f172a', // Slate 900
  }
];

export const getTemplate = (id: string) => templates.find(t => t.id === id) || templates[0];
