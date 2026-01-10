import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template2Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#2C3E50' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-serif">
            {/* Header */}
            <header className="text-white p-8 flex items-center justify-between" style={{ backgroundColor: primaryColor }}>
                <div className="flex-1">
                    <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
                        {personal_info.fullName}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
                        {personal_info.email && (
                            <span className="flex items-center gap-1">
                                <Mail size={14} /> {personal_info.email}
                            </span>
                        )}
                        {personal_info.phone && (
                            <span className="flex items-center gap-1">
                                <Phone size={14} /> {personal_info.phone}
                            </span>
                        )}
                        {personal_info.location && (
                            <span className="flex items-center gap-1">
                                <MapPin size={14} /> {personal_info.location}
                            </span>
                        )}
                        {personal_info.linkedinUrl && (
                            <span className="flex items-center gap-1">
                                <Linkedin size={14} />
                                <span className="hover:text-white/100">LinkedIn Profile</span>
                            </span>
                        )}
                    </div>
                </div>
                {profileImage && (
                    <div className="ml-6">
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-32 h-32 rounded object-cover border-2 border-white/30 shadow-xl"
                        />
                    </div>
                )}
            </header>

            {/* Content */}
            <div className="p-8 grid grid-cols-12 gap-8">
                {/* Left Column */}
                <div className="col-span-8 space-y-8">
                    {personal_info.summary && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 pb-1 mb-3" style={{ color: primaryColor, borderColor: primaryColor }}>
                                Profile
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-justify">
                                {personal_info.summary}
                            </p>
                        </section>
                    )}

                    {work_experience && work_experience.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 pb-1 mb-4" style={{ color: primaryColor, borderColor: primaryColor }}>
                                Professional Experience
                            </h2>
                            <div className="space-y-6">
                                {work_experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg text-slate-800">{exp.title}</h3>
                                            <span className="text-sm font-semibold opacity-75" style={{ color: primaryColor }}>
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <div className="text-slate-600 font-medium italic mb-2">{exp.company}</div>
                                        <ul className="list-disc list-inside text-slate-700 text-sm leading-relaxed whitespace-pre-line">
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

                {/* Right Column */}
                <aside className="col-span-4 space-y-8">
                    {education && education.length > 0 && (
                        <section className="bg-slate-50 p-4 rounded-lg">
                            <h2 className="text-lg font-bold uppercase border-b-2 pb-1 mb-4" style={{ color: primaryColor, borderColor: `${primaryColor}40` }}>
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-slate-800 leading-tight">{edu.school}</h3>
                                        <div className="text-sm font-semibold my-1 opacity-75" style={{ color: primaryColor }}>
                                            {edu.startDate} - {edu.endDate || 'Present'}
                                        </div>
                                        <div className="text-sm text-slate-600">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {skills && skills.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 pb-1 mb-4" style={{ color: primaryColor, borderColor: primaryColor }}>
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-slate-700 font-bold text-xs uppercase tracking-wider bg-slate-100 px-2 py-1"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold uppercase border-b-2 pb-1 mb-4" style={{ color: primaryColor, borderColor: primaryColor }}>
                                Languages
                            </h2>
                            <ul className="space-y-2">
                                {languages.map((lang, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm text-slate-700 font-medium border-b border-dotted border-slate-300 pb-1">
                                        <span>{lang}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};
