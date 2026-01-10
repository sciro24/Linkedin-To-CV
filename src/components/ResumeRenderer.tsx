'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ResumeData } from '@/types/resume';
import { getTemplate } from './TemplateRegistry';
import { Download, AlertCircle } from 'lucide-react';
import { Language, dictionary } from '@/utils/translations';

// Avoid SSR for PDFDownloadLink
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <button className="px-4 py-2 bg-gray-300 rounded text-white text-sm">Loading PDF...</button> }
);

interface ResumeRendererProps {
    data: ResumeData;
    templateId: string;
    profileImage?: string;
    language: Language;
    customColor?: string;
}

export default function ResumeRenderer({ data, templateId, profileImage, language, customColor }: ResumeRendererProps) {
    const template = getTemplate(templateId);
    const t = dictionary[language] || dictionary['Italiano'];

    if (!template) {
        return (
            <div className="flex items-center justify-center h-full text-red-500 gap-2">
                <AlertCircle /> Template not found
            </div>
        );
    }

    const primaryColor = customColor || template.defaultPrimaryColor;

    const WebComponent = template.Web;
    const PdfDocument = template.Pdf;

    return (
        <div className="flex flex-col h-full bg-gray-100">
            <div className="flex justify-between items-center bg-white p-4 shadow-sm z-10 sticky top-0">
                <div>
                    <span className="text-sm text-gray-500">Previewing:</span>
                    <span className="ml-2 font-bold text-gray-800">{template.name}</span>
                </div>
                <PDFDownloadLink
                    document={<PdfDocument data={data} profileImage={profileImage} language={language} primaryColor={primaryColor} />}
                    fileName={`${data.personal_info.fullName.replace(/\s+/g, '_')}_CV.pdf`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition shadow-sm font-medium text-sm"
                >
                    {({ loading }) =>
                        loading ? 'Preparing...' : (
                            <>
                                <Download className="w-4 h-4" /> {t.downloadPdf}
                            </>
                        )
                    }
                </PDFDownloadLink>
            </div>

            <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
                {/* Responsive scaling container */}
                <div className="origin-top transform scale-[0.5] sm:scale-[0.6] md:scale-[0.75] lg:scale-[0.85] xl:scale-100 transition-transform bg-white shadow-2xl">
                    <WebComponent data={data} profileImage={profileImage} language={language} primaryColor={primaryColor} />
                </div>
            </div>
        </div>
    );
}
