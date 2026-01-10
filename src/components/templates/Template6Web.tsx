import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template6Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#000000' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg p-16 font-serif text-slate-900">
            {/* Header */}
            <header className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: primaryColor }}>
                <h1 className="text-4xl font-bold uppercase tracking-wide mb-3" style={{ color: primaryColor }}>
                    {personal_info.fullName}
                </h1>
                <div className="flex flex-wrapjustify-center gap-4 text-sm text-slate-700">
                    {personal_info.location && <span>{personal_info.location}</span>}
                    {personal_info.location && (personal_info.email || personal_info.phone) && <span>|</span>}
                    {personal_info.email && <span>{personal_info.email}</span>}
                    {personal_info.email && personal_info.phone && <span>|</span>}
                    {personal_info.phone && <span>{personal_info.phone}</span>}
                    {personal_info.phone && personal_info.linkedinUrl && <span>|</span>}
                    {personal_info.linkedinUrl && (
                        <span className="hover:underline cursor-default">
                            LinkedIn
                        </span>
                    )}
                </div>
            </header>

            <main className="space-y-6">
                {personal_info.summary && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: '#e2e8f0' }}>
                            Professional Summary
                        </h2>
                        <p className="text-sm leading-relaxed text-justify">
                            {personal_info.summary}
                        </p>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: '#e2e8f0' }}>
                            Skills
                        </h2>
                        <div className="text-sm leading-relaxed">
                            {skills.filter(s => s.visible).map(s => s.name).join(' • ')}
                        </div>
                    </section>
                )}

                {work_experience && work_experience.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: primaryColor, borderColor: '#e2e8f0' }}>
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {work_experience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{exp.title}</h3>
                                        <span className="text-sm font-medium text-slate-600">
                                            {exp.startDate} – {exp.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold italic mb-2" style={{ color: primaryColor }}>
                                        {exp.company}
                                    </div>
                                    <ul className="list-disc list-outside ml-4 text-sm leading-relaxed space-y-1">
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {education && education.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-1" style={{ color: primaryColor, borderColor: '#e2e8f0' }}>
                            Education
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-base">{edu.school}</h3>
                                        <span className="text-sm font-medium text-slate-600">
                                            {edu.startDate} – {edu.endDate || 'Present'}
                                        </span>
                                    </div>
                                    <div className="text-sm">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {languages && languages.length > 0 && (
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-widest mb-2 border-b pb-1" style={{ color: primaryColor, borderColor: '#e2e8f0' }}>
                            Languages
                        </h2>
                        <div className="text-sm">
                            {languages.join(' • ')}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};
