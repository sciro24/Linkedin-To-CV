'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MinimalWeb } from './templates/MinimalWeb';
import { ModernWeb } from './templates/ModernWeb';
import { MinimalPdf } from './templates/MinimalPdf';
import { ModernPdf } from './templates/ModernPdf';
import { ResumeData } from '@/types/resume';
import { Download } from 'lucide-react';

// Dynamically import PDFDownloadLink to avoid SSR issues with @react-pdf/renderer
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false, loading: () => <button className="btn-disabled">Loading PDF...</button> }
);

interface ResumeRendererProps {
    data: ResumeData;
    templateId: 'minimal' | 'modern';
    profileImage?: string;
}

export default function ResumeRenderer({ data, templateId, profileImage }: ResumeRendererProps) {

    const WebTemplate = templateId === 'modern' ? ModernWeb : MinimalWeb;
    const PdfTemplate = templateId === 'modern' ? ModernPdf : MinimalPdf;

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-end mb-4 bg-white p-2 rounded shadow-sm sticky top-0 z-10">
                <PDFDownloadLink
                    document={<PdfTemplate data={data} profileImage={profileImage} />}
                    fileName={`${data.profile.fullName.replace(/\s+/g, '_')}_CV.pdf`}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >

                    {({ blob, url, loading, error }) =>
                        loading ? 'Preparing PDF...' : (
                            <>
                                <Download className="w-4 h-4" /> Download PDF
                            </>
                        )
                    }
                </PDFDownloadLink>
            </div>

            <div className="flex-1 overflow-auto bg-gray-100 p-4 flex justify-center">
                {/* Scale transformation could be added to fit screen if needed */}
                <div className="origin-top transform scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 transition-transform">
                    <WebTemplate data={data} profileImage={profileImage} />
                </div>
            </div>
        </div>
    );
}
