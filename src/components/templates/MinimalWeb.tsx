import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
    data: ResumeData;
    profileImage?: string; // Blob URL
}

export const MinimalWeb: React.FC<TemplateProps> = ({ data, profileImage }) => {
    return (
        <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-sm min-h-[297mm] text-gray-800 font-sans">
            <header className="border-b-2 border-gray-900 pb-4 mb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-wider">{data.profile.fullName}</h1>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                        <p>{data.profile.location} • {data.profile.email} • {data.profile.phone}</p>
                        <div className="flex gap-4">
                            {data.profile.linkedinUrl && <a href={data.profile.linkedinUrl} className="text-blue-600 hover:underline">LinkedIn</a>}
                            {data.profile.portfolioUrl && <a href={data.profile.portfolioUrl} className="text-blue-600 hover:underline">Portfolio</a>}
                        </div>
                    </div>
                </div>
                {profileImage && (
                    <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                )}
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">Profile</h2>
                <p className="text-sm leading-relaxed text-gray-700">{data.profile.summary}</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">Experience</h2>
                <div className="space-y-4">
                    {data.experience.map((exp, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm italic text-gray-700">{exp.company}, {exp.location}</span>
                            </div>
                            <ul className="list-disc list-outside ml-4 text-sm text-gray-600 space-y-1">
                                {exp.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
                <div className="space-y-3">
                    {data.education.map((edu, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                <span className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</span>
                            </div>
                            <p className="text-sm text-gray-700">{edu.degree}, {edu.location}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
};
