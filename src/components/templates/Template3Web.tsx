import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, MapPin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template3Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans">
            {/* Header with Photo and Name */}
            <header className="bg-[#B8D4E8] px-10 py-8 flex items-center gap-6">
                {profileImage && (
                    <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                )}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 uppercase tracking-wide mb-1">
                        {data.personal_info.fullName}
                    </h1>
                    <p className="text-lg text-gray-700">Sales Representative</p>
                </div>
            </header>

            <div className="flex">
                {/* Left Sidebar */}
                <aside className="w-[35%] bg-[#C5D9E6] p-8">
                    {/* Contact */}
                    <div className="mb-8 space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-600" />
                            <span className="text-xs text-gray-700">{data.personal_info.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-600" />
                            <span className="text-xs text-gray-700 break-all">{data.personal_info.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-600" />
                            <span className="text-xs text-gray-700">{data.personal_info.location}</span>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="mb-8">
                        <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">Education</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="text-sm font-bold text-gray-800">{edu.degree}</p>
                                    <p className="text-xs text-gray-700">{edu.school}</p>
                                    <p className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                        <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">Skills</h3>
                        <ul className="space-y-2 text-xs text-gray-700">
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    {skill.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Language */}
                    <div>
                        <h3 className="text-base font-bold text-gray-800 mb-4 uppercase tracking-wide">Language</h3>
                        <ul className="space-y-2 text-xs text-gray-700">
                            {data.languages.map((lang, i) => (
                                <li key={i}>{lang}</li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    {/* About Me */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-300">About Me</h2>
                        <p className="text-xs text-gray-600 leading-relaxed text-justify">
                            {data.personal_info.summary}
                        </p>
                    </section>

                    {/* Work Experience */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">Work Experience</h2>
                        <div className="space-y-5">
                            {data.work_experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm">{exp.startDate} - {exp.endDate}</h3>
                                    </div>
                                    <p className="text-sm font-bold text-gray-800 mb-1">{exp.title}</p>
                                    <p className="text-xs text-gray-600 italic mb-2">{exp.company}</p>
                                    <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                                        {exp.description.map((desc, idx) => (
                                            <li key={idx}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications */}
                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">Certifications</h2>
                            <ul className="space-y-2 text-xs text-gray-600">
                                {data.certifications.filter(c => c.visible).map((cert, i) => (
                                    <li key={i}>• {cert.name}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};
