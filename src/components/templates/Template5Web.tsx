import React from 'react';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template5Web: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#4F46E5' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg flex flex-col font-sans">
            {/* Header with Shape */}
            <header className="text-white p-10 clip-path-slant relative overflow-hidden" style={{ backgroundColor: primaryColor }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-16 -mt-16 opacity-50" style={{ backgroundColor: 'white' }}></div>
                <div className="relative z-10 flex items-center gap-8">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt={personal_info.fullName || 'Profile'}
                            className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
                        />
                    )}
                    <div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
                            {personal_info.fullName}
                        </h1>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Left Sidebar */}
                <aside className="w-[35%] bg-gray-100 p-8 border-r border-gray-200">
                    <section className="mb-10">
                        <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                            Contact
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                            {personal_info.email && (
                                <div className="flex items-center gap-2">
                                    <span style={{ color: primaryColor }} className="opacity-70">✉</span> {personal_info.email}
                                </div>
                            )}
                            {personal_info.phone && (
                                <div className="flex items-center gap-2">
                                    <span style={{ color: primaryColor }} className="opacity-70">📞</span> {personal_info.phone}
                                </div>
                            )}
                            {personal_info.location && (
                                <div className="flex items-center gap-2">
                                    <span style={{ color: primaryColor }} className="opacity-70">📍</span> {personal_info.location}
                                </div>
                            )}
                            {personal_info.linkedinUrl && (
                                <div className="flex items-center gap-2">
                                    <span style={{ color: primaryColor }} className="opacity-70">🔗</span>
                                    <span className="hover:underline cursor-default">
                                        Profile
                                    </span>
                                </div>
                            )}
                        </div>
                    </section>

                    {skills && skills.length > 0 && (
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-white px-3 py-1 text-sm font-semibold rounded shadow-sm border"
                                        style={{ color: primaryColor, borderColor: `${primaryColor}40` }}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {education && education.length > 0 && (
                        <section className="mb-10">
                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                Education
                            </h3>
                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: `${primaryColor}40` }}>
                                        <h4 className="font-bold text-gray-800 leading-tight">{edu.school}</h4>
                                        <div className="text-xs font-bold uppercase my-1 opacity-80" style={{ color: primaryColor }}>
                                            {edu.startDate} - {edu.endDate || 'Present'}
                                        </div>
                                        <div className="text-sm text-gray-600">{edu.degree}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {languages && languages.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold uppercase mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                                Languages
                            </h3>
                            <ul className="space-y-2">
                                {languages.map((lang, index) => (
                                    <li key={index} className="text-sm font-medium text-gray-700 flex justify-between border-b border-gray-200 pb-1">
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Main Content */}
                <main className="w-[65%] p-10 pt-12">
                    {personal_info.summary && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-4 inline-block pb-1" style={{ borderColor: `${primaryColor}20` }}>
                                Profile
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {personal_info.summary}
                            </p>
                        </section>
                    )}

                    {work_experience && work_experience.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 inline-block pb-1" style={{ borderColor: `${primaryColor}20` }}>
                                Work Experience
                            </h2>
                            <div className="space-y-10">
                                {work_experience.map((exp, index) => (
                                    <div key={index} className="group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold transition-colors" style={{ color: primaryColor }}>
                                                {exp.title}
                                            </h3>
                                            <span className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ backgroundColor: `${primaryColor}10`, color: primaryColor }}>
                                                {exp.startDate} - {exp.endDate || 'Present'}
                                            </span>
                                        </div>
                                        <div className="text-gray-500 font-semibold uppercase tracking-wide text-sm mb-3">
                                            {exp.company}
                                        </div>
                                        <ul className="text-gray-600 leading-relaxed list-disc list-inside">
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
            </div>
        </div>
    );
};
