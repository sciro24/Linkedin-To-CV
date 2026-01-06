import React, { useRef } from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
}

export const ModernWeb: React.FC<TemplateProps> = ({ data, profileImage }) => {
    return (
        <div className="max-w-[210mm] mx-auto bg-white min-h-[297mm] flex shadow-sm font-sans">
            {/* Sidebar */}
            <aside className="w-1/3 bg-slate-900 text-white p-6 flex flex-col">
                <div className="flex flex-col items-center mb-8">
                    {profileImage && (
                        <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-slate-700 mb-4" />
                    )}
                    <h1 className="text-2xl font-bold text-center leading-tight">{data.profile.fullName}</h1>
                    <p className="text-slate-400 text-sm mt-2 text-center">{data.profile.location}</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 mb-3">Contact</h3>
                        <div className="space-y-2 text-sm text-slate-300 break-words">
                            <p>{data.profile.email}</p>
                            <p>{data.profile.phone}</p>
                            {data.profile.linkedinUrl && <a href={data.profile.linkedinUrl} className="block text-blue-400 hover:text-blue-300 truncate">LinkedIn</a>}
                            {data.profile.portfolioUrl && <a href={data.profile.portfolioUrl} className="block text-blue-400 hover:text-blue-300 truncate">Portfolio</a>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, index) => (
                                <span key={index} className="bg-slate-800 text-slate-200 text-xs px-2 py-1 rounded">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-slate-400 border-b border-slate-700 pb-2 mb-3">Education</h3>
                        <div className="space-y-4 text-sm">
                            {data.education.map((edu, index) => (
                                <div key={index}>
                                    <p className="font-bold text-white">{edu.school}</p>
                                    <p className="text-slate-400">{edu.degree}</p>
                                    <p className="text-slate-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 inline-block pb-1">Profile</h2>
                    <p className="text-slate-600 leading-relaxed text-sm">
                        {data.profile.summary}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-blue-500 inline-block pb-1">Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="relative pl-6 border-l-2 border-slate-200">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white"></div>
                                <div className="mb-1">
                                    <h3 className="text-lg font-bold text-slate-800">{exp.title}</h3>
                                    <div className="flex justify-between text-sm text-slate-500 mt-1">
                                        <span className="font-medium text-blue-600">{exp.company}</span>
                                        <span>{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                </div>
                                <ul className="mt-2 list-disc list-inside text-sm text-slate-600 space-y-1">
                                    {exp.description.map((desc, i) => (
                                        <li key={i}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};
