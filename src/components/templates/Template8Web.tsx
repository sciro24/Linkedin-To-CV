import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template8Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#0f172a' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans text-slate-800">
            <div className="p-10">
                {/* Compact Header */}
                <header className="flex items-center gap-8 mb-12">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-24 h-24 rounded-lg object-cover bg-slate-100"
                        />
                    )}
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-slate-900">
                            {personal_info.fullName}
                        </h1>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                            {personal_info.email && (
                                <span className="flex items-center gap-1.5">
                                    <span style={{ color: primaryColor }}>@</span> {personal_info.email}
                                </span>
                            )}
                            {personal_info.phone && (
                                <span>{personal_info.phone}</span>
                            )}
                            {personal_info.location && (
                                <span>{personal_info.location}</span>
                            )}
                            {personal_info.linkedinUrl && (
                                <span style={{ color: primaryColor }} className="cursor-default font-bold">
                                    in
                                </span>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-10">
                    {/* Left/Main Column */}
                    <div className="col-span-8 space-y-12">
                        {personal_info.summary && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                    About
                                </h2>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {personal_info.summary}
                                </p>
                            </section>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
                                    Work Experience
                                </h2>
                                <div className="space-y-8">
                                    {work_experience.map((exp, index) => (
                                        <div key={index} className="relative pl-6 border-l-2 border-slate-100">
                                            <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: primaryColor }}></div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h3 className="font-bold text-slate-900">{exp.title}</h3>
                                                <span className="text-xs font-mono text-slate-400">
                                                    {exp.startDate} — {exp.endDate || 'Present'}
                                                </span>
                                            </div>
                                            <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: primaryColor }}>
                                                {exp.company}
                                            </div>
                                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right/Side Column */}
                    <div className="col-span-4 space-y-12">
                        {skills && skills.length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                    Tech Stack
                                </h2>
                                <div className="flex flex-wrap gap-1.5">
                                    {skills.filter(s => s.visible).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 text-slate-700"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {education && education.length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                    Education
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <div key={index}>
                                            <h3 className="font-bold text-slate-900 text-sm">{edu.school}</h3>
                                            <div className="text-xs text-slate-500 mb-1">
                                                {edu.startDate} - {edu.endDate || 'Present'}
                                            </div>
                                            <div className="text-xs text-slate-700 font-medium">{edu.degree}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {languages && languages.length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                    Languages
                                </h2>
                                <div className="flex flex-col gap-2">
                                    {languages.map((lang, index) => (
                                        <div key={index} className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                            {lang}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
