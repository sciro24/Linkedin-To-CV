import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template3Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#334155' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg flex font-sans">
            {/* Main Content (Left) */}
            <main className="w-[65%] p-8 pr-12 text-slate-800">
                <header className="mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-2" style={{ color: primaryColor }}>
                        {personal_info.fullName}
                    </h1>
                    {personal_info.summary && (
                        <div className="mt-6 border-l-4 pl-4 italic text-slate-600" style={{ borderColor: `${primaryColor}60` }}>
                            <p>{personal_info.summary}</p>
                        </div>
                    )}
                </header>

                <div className="space-y-10">
                    {work_experience && work_experience.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: primaryColor }}>
                                <span className="w-8 h-1 block" style={{ backgroundColor: primaryColor }}></span>
                                Experience
                            </h2>
                            <div className="space-y-8">
                                {work_experience.map((exp, index) => (
                                    <div key={index} className="group">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg text-slate-900">
                                                {exp.title}
                                            </h3>
                                        </div>
                                        <div className="text-[#64748B] text-sm font-medium mb-2 uppercase tracking-wide">
                                            {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                                        </div>
                                        <ul className="list-disc list-inside text-slate-600 leading-relaxed text-sm">
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
            </main>

            {/* Sidebar (Right) */}
            <aside className="w-[35%] bg-[#F1F5F9] p-8 border-l border-slate-200 flex flex-col gap-10">
                <div className="text-center">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-md border-4 border-white"
                        />
                    )}
                </div>

                <section>
                    <h3 className="text-sm font-bold text-[#475569] uppercase tracking-widest mb-4 border-b border-slate-300 pb-2">
                        Contact Info
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600">
                        {personal_info.email && (
                            <div>
                                <span className="block font-bold text-slate-800 text-xs mb-1">Email</span>
                                {personal_info.email}
                            </div>
                        )}
                        {personal_info.phone && (
                            <div>
                                <span className="block font-bold text-slate-800 text-xs mb-1">Phone</span>
                                {personal_info.phone}
                            </div>
                        )}
                        {personal_info.location && (
                            <div>
                                <span className="block font-bold text-slate-800 text-xs mb-1">Location</span>
                                {personal_info.location}
                            </div>
                        )}
                        {personal_info.linkedinUrl && (
                            <div>
                                <span className="block font-bold text-slate-800 text-xs mb-1">LinkedIn</span>
                                <span className="text-blue-600">
                                    Profile URL
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                {education && education.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold text-[#475569] uppercase tracking-widest mb-4 border-b border-slate-300 pb-2">
                            Education
                        </h3>
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="font-bold text-slate-800 leading-tight">{edu.school}</h4>
                                    <div className="text-xs text-slate-500 font-medium my-1">
                                        {edu.startDate} - {edu.endDate || 'Present'}
                                    </div>
                                    <div className="text-sm text-slate-600 italic">{edu.degree}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && skills.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold text-[#475569] uppercase tracking-widest mb-4 border-b border-slate-300 pb-2">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.filter(s => s.visible).map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-slate-600 px-2 py-0.5 text-xs font-medium border-b border-slate-200"
                                >
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {languages && languages.length > 0 && (
                    <section>
                        <h3 className="text-sm font-bold text-[#475569] uppercase tracking-widest mb-4 border-b border-slate-300 pb-2">
                            Languages
                        </h3>
                        <ul className="space-y-2">
                            {languages.map((lang, index) => (
                                <li key={index} className="text-sm text-slate-700 font-medium">
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </aside>
        </div>
    );
};
