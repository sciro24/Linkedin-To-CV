import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template7Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#2d3748' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans text-gray-800">
            {/* Top Border */}
            <div className="h-4 w-full" style={{ backgroundColor: primaryColor }} />

            <div className="p-12">
                {/* Header */}
                <header className="flex justify-between items-end border-b-2 border-gray-100 pb-8 mb-10">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-tight text-gray-900 mb-2">
                            {personal_info.fullName}
                        </h1>
                        <div className="flex flex-col gap-1 text-sm text-gray-600 font-medium">
                            <div className="flex gap-4">
                                {personal_info.email && <span>{personal_info.email}</span>}
                                {personal_info.phone && <span>{personal_info.phone}</span>}
                            </div>
                            <div className="flex gap-4">
                                {personal_info.location && <span>{personal_info.location}</span>}
                                {personal_info.linkedinUrl && (
                                    <span style={{ color: primaryColor }} className="cursor-default">
                                        LinkedIn Profile
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-8">
                    {/* Main Column */}
                    <main className="col-span-8 space-y-10">
                        {personal_info.summary && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                                    Executive Summary
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-sm">
                                    {personal_info.summary}
                                </p>
                            </section>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2" style={{ color: primaryColor }}>
                                    Experience
                                </h2>
                                <div className="space-y-8">
                                    {work_experience.map((exp, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-lg text-gray-900">{exp.title}</h3>
                                                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {exp.startDate} - {exp.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <div className="text-sm font-semibold mb-3" style={{ color: primaryColor }}>
                                                {exp.company}
                                            </div>
                                            <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    {/* Sidebar Column */}
                    <aside className="col-span-4 space-y-10">
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                    Core Competencies
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {skills.filter(s => s.visible).map((skill, index) => (
                                        <div key={index} className="bg-gray-50 px-3 py-2 text-sm font-medium border-l-2" style={{ borderLeftColor: primaryColor }}>
                                            {skill.name}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-gray-900 leading-tight">{edu.school}</h3>
                                            <div className="text-xs text-gray-500 my-1 font-medium">
                                                {edu.startDate} - {edu.endDate || 'Present'}
                                            </div>
                                            <div className="text-sm text-gray-700">{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: primaryColor }}>
                                    Languages
                                </h2>
                                <ul className="space-y-2">
                                    {languages.map((lang, index) => (
                                        <li key={index} className="text-sm font-medium text-gray-700 border-b border-gray-100 pb-1">
                                            {lang}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};
