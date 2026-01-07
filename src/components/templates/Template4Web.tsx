import React from 'react';
import { ResumeData } from '@/types/resume';
import { Language, dictionary } from '@/utils/translations';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
}

export const Template4Web: React.FC<TemplateProps> = ({ data, profileImage, language }) => {
    const t = dictionary[language];

    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] shadow-lg font-sans relative">
            {/* Header with Name - Black Background on Right */}
            <header className="flex items-center">
                <div className="w-[40%] bg-white p-10 flex items-center justify-center relative z-10">
                    {profileImage && (
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                    )}
                </div>
                <div className="flex-1 bg-[#1F2937] text-white px-10 py-8 -ml-8">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">
                        {data.personal_info.fullName}
                    </h1>
                    <p className="text-sm text-gray-300 tracking-wide">Marketing Manager</p>
                </div>
            </header>

            <div className="flex">
                {/* Left Sidebar - Light Gray */}
                <aside className="w-[40%] bg-[#F3F4F6] p-8">
                    {/* About Me */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">About Me</h3>
                        <p className="text-xs text-gray-600 leading-relaxed text-justify">
                            {data.personal_info.summary}
                        </p>
                    </div>

                    {/* Education */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Education</h3>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="text-xs font-bold text-gray-800">{edu.degree}</p>
                                    <p className="text-xs text-gray-600">{edu.school}</p>
                                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Skills with Progress Bars */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Skills</h3>
                        <div className="space-y-3">
                            {data.skills.filter(s => s.visible).map((skill, i) => (
                                <div key={i}>
                                    <p className="text-xs text-gray-700 mb-1">{skill.name}</p>
                                    <div className="w-full bg-gray-300 h-1.5 rounded-full">
                                        <div className="bg-gray-800 h-full rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Language */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Language</h3>
                        <ul className="space-y-2 text-xs text-gray-700">
                            {data.languages.map((lang, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-10">
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4 mb-8 text-xs">
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-600" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="text-gray-600" />
                            <span className="break-all">{data.personal_info.portfolioUrl || 'www.reallygreatsite.com'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-600" />
                            <span className="break-all">{data.personal_info.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-600" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    </div>

                    {/* Experience */}
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Experience</h2>
                        <div className="space-y-5">
                            {data.work_experience.map((exp, i) => (
                                <div key={i} className="relative pl-6 border-l-2 border-gray-300">
                                    <div className="absolute -left-2 top-1 w-3 h-3 bg-gray-400 rounded-full"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-gray-900 text-sm">{exp.title}</h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{exp.company} | {exp.location}</p>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {exp.description.join(' ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications */}
                    {data.certifications && data.certifications.filter(c => c.visible).length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Certifications</h2>
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
