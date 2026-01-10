import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template1Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#1E293B' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-lg font-sans text-sm">
            <aside className="w-[30%] text-white p-6 flex flex-col gap-6" style={{ backgroundColor: primaryColor }}>
                <div className="text-center">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <section>
                        <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                            Contact
                        </h3>
                        <div className="space-y-3 text-sm text-white/90">
                            {personal_info.email && (
                                <div className="break-all flex items-start gap-2">
                                    <Mail size={12} className="mt-1 flex-shrink-0" />
                                    <span>{personal_info.email}</span>
                                </div>
                            )}
                            {personal_info.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={12} className="flex-shrink-0" />
                                    <span>{personal_info.phone}</span>
                                </div>
                            )}
                            {personal_info.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={12} className="flex-shrink-0" />
                                    <span>{personal_info.location}</span>
                                </div>
                            )}
                            {personal_info.linkedinUrl && (
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Linkedin size={12} className="flex-shrink-0" />
                                        <span className="text-xs opacity-70">LinkedIn Profile</span>
                                    </div>
                                    <span className="block break-all text-xs opacity-90">
                                        {personal_info.linkedinUrl.replace(/^https?:\/\//, '')}
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-white/10 text-white px-2 py-1 rounded text-xs"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h3 className="uppercase tracking-widest text-white/70 text-xs font-bold mb-3 border-b border-white/20 pb-1">
                                Languages
                            </h3>
                            <ul className="space-y-1 text-white/90">
                                {languages.map((lang, index) => (
                                    <li key={index}>• {lang}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>
            </aside>

            <main className="flex-1 p-8 text-slate-800">
                <header className="mb-8 border-b-2 border-slate-100 pb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color: primaryColor }}>
                        {personal_info.fullName}
                    </h1>
                    {personal_info.summary && (
                        <p className="mt-4 text-slate-600 leading-relaxed">
                            {personal_info.summary}
                        </p>
                    )}
                </header>

                <div className="space-y-8">
                    {work_experience && work_experience.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider" style={{ color: primaryColor }}>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {work_experience.map((exp, index) => (
                                    <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-400"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg text-slate-900">{exp.title}</h3>
                                            <span className="text-sm text-slate-500 font-medium whitespace-nowrap ml-4">
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <div className="font-medium mb-2" style={{ color: primaryColor }}>{exp.company}</div>
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

                    {education && education.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 uppercase tracking-wider" style={{ color: primaryColor }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-bold text-lg text-slate-900">{edu.school}</h3>
                                            <span className="text-sm text-slate-500 font-medium">
                                                {edu.startDate} - {edu.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <div className="text-slate-700">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};
