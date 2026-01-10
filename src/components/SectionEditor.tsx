'use client';

import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { ResumeData, WorkExperience, Education, Skill, Certification } from '@/types/resume';

interface SectionEditorProps {
    data: ResumeData;
    onUpdate: (newData: ResumeData) => void;
}

// -- Generic Sortable Item for Skills/Languages --
const SortableItem = ({ id, content, visible, onToggle, onDelete }: { id: string; content: string; visible?: boolean; onToggle?: () => void; onDelete?: () => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: visible === false ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className={`flex items-center gap-3 bg-white p-3 rounded-md border ${visible === false ? 'border-gray-100 bg-gray-50' : 'border-gray-200'} shadow-sm mb-2 group`}>
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0">
                <GripVertical size={16} />
            </div>
            <div className={`flex-1 text-sm ${visible === false && 'line-through text-gray-400'}`}>{content}</div>

            <div className="flex items-center gap-1">
                {onToggle && (
                    <button onClick={onToggle} className="text-gray-400 hover:text-blue-500 p-1 transition-colors">
                        {visible !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                )}
                {onDelete && (
                    <button onClick={onDelete} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

// -- Accordion Section Wrapper --
const AccordionSection = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">{title}</span>
                {isOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
            </button>
            {isOpen && <div className="p-4 bg-white">{children}</div>}
        </div>
    );
};

// -- Text Input Helper --
const InputGroup = ({ label, value, onChange, placeholder, type = 'text', textarea = false }: any) => (
    <div className="mb-3">
        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</label>
        {textarea ? (
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-gray-900 outline-none resize-none bg-gray-50 focus:bg-white transition-colors"
            />
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full p-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-gray-900 outline-none bg-gray-50 focus:bg-white transition-colors"
            />
        )}
    </div>
);

export const SectionEditor: React.FC<SectionEditorProps> = ({ data, onUpdate }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [newSkillName, setNewSkillName] = useState('');
    const [newCertName, setNewCertName] = useState('');
    const [newLanguageName, setNewLanguageName] = useState('');

    // -- Personal Info --
    const updatePersonalInfo = (field: string, value: string) => {
        onUpdate({
            ...data,
            personal_info: { ...data.personal_info, [field]: value }
        });
    };

    // -- Work Experience --
    const updateExperience = (index: number, field: keyof WorkExperience, value: any) => {
        const newExp = [...(data.work_experience || [])];
        if (field === 'description' && typeof value === 'string') {
            // Split by newline if it's coming from textarea
            newExp[index] = { ...newExp[index], description: value.split('\n').filter(line => line.trim()) };
        } else {
            newExp[index] = { ...newExp[index], [field]: value };
        }
        onUpdate({ ...data, work_experience: newExp });
    };

    const addExperience = () => {
        const newExp: WorkExperience = {
            company: 'New Company',
            title: 'Job Title',
            location: '',
            startDate: '2024',
            endDate: '',
            description: ['Description...']
        };
        onUpdate({ ...data, work_experience: [newExp, ...(data.work_experience || [])] });
    };

    const removeExperience = (index: number) => {
        const newExp = [...(data.work_experience || [])];
        newExp.splice(index, 1);
        onUpdate({ ...data, work_experience: newExp });
    };

    // -- Education --
    const updateEducation = (index: number, field: keyof Education, value: string) => {
        const newEdu = [...(data.education || [])];
        newEdu[index] = { ...newEdu[index], [field]: value };
        onUpdate({ ...data, education: newEdu });
    };

    const addEducation = () => {
        const newEdu: Education = {
            school: 'New School',
            degree: 'Degree',
            location: '',
            startDate: '2024',
            endDate: ''
        };
        onUpdate({ ...data, education: [newEdu, ...(data.education || [])] });
    };

    const removeEducation = (index: number) => {
        const newEdu = [...(data.education || [])];
        newEdu.splice(index, 1);
        onUpdate({ ...data, education: newEdu });
    };

    // -- Skills Ops --
    const handleDragEndSkills = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.skills.findIndex(s => s.name === active.id);
            const newIndex = data.skills.findIndex(s => s.name === over.id);
            onUpdate({ ...data, skills: arrayMove(data.skills, oldIndex, newIndex) });
        }
    };

    const toggleSkill = (skillName: string) => {
        const newSkills = data.skills.map(s => s.name === skillName ? { ...s, visible: !s.visible } : s);
        onUpdate({ ...data, skills: newSkills });
    };

    const removeSkill = (skillName: string) => {
        const newSkills = data.skills.filter(s => s.name !== skillName);
        onUpdate({ ...data, skills: newSkills });
    };

    const addSkill = () => {
        if (!newSkillName.trim()) return;
        const newSkill: Skill = { name: newSkillName, visible: true };
        onUpdate({ ...data, skills: [...data.skills, newSkill] });
        setNewSkillName('');
    }

    // -- Certifications Ops --
    const handleDragEndCerts = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.certifications.findIndex(s => s.name === active.id);
            const newIndex = data.certifications.findIndex(s => s.name === over.id);
            onUpdate({ ...data, certifications: arrayMove(data.certifications, oldIndex, newIndex) });
        }
    }

    const toggleCert = (certName: string) => {
        const newCerts = data.certifications.map(c => c.name === certName ? { ...c, visible: !c.visible } : c);
        onUpdate({ ...data, certifications: newCerts });
    };

    const removeCert = (certName: string) => {
        const newCerts = data.certifications.filter(c => c.name !== certName);
        onUpdate({ ...data, certifications: newCerts });
    };

    const addCert = () => {
        if (!newCertName.trim()) return;
        const newCert: Certification = { name: newCertName, visible: true };
        onUpdate({ ...data, certifications: [...data.certifications, newCert] });
        setNewCertName('');
    }

    // -- Languages Ops --
    const handleDragEndLanguages = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = data.languages.findIndex(l => l.name === active.id);
            const newIndex = data.languages.findIndex(l => l.name === over.id);
            onUpdate({ ...data, languages: arrayMove(data.languages, oldIndex, newIndex) });
        }
    };

    const toggleLanguage = (langName: string) => {
        const newLangs = data.languages.map(l => l.name === langName ? { ...l, visible: !l.visible } : l);
        onUpdate({ ...data, languages: newLangs });
    };

    const removeLanguage = (langName: string) => {
        const newLangs = data.languages.filter(l => l.name !== langName);
        onUpdate({ ...data, languages: newLangs });
    };

    const addLanguage = () => {
        if (!newLanguageName.trim()) return;
        const newLang = { name: newLanguageName, visible: true };
        onUpdate({ ...data, languages: [...data.languages, newLang] });
        setNewLanguageName('');
    }


    return (
        <div className="flex flex-col h-full bg-white">
            <AccordionSection title="Personal Info" defaultOpen={true}>
                <InputGroup label="Full Name" value={data.personal_info.fullName} onChange={(v: string) => updatePersonalInfo('fullName', v)} />
                <InputGroup label="Email" value={data.personal_info.email} onChange={(v: string) => updatePersonalInfo('email', v)} />
                <InputGroup label="Phone" value={data.personal_info.phone} onChange={(v: string) => updatePersonalInfo('phone', v)} />
                <InputGroup label="Location" value={data.personal_info.location} onChange={(v: string) => updatePersonalInfo('location', v)} />
                <InputGroup label="LinkedIn (Text only, no link)" value={data.personal_info.linkedinUrl} onChange={(v: string) => updatePersonalInfo('linkedinUrl', v)} />
                <InputGroup label="Summary" value={data.personal_info.summary} onChange={(v: string) => updatePersonalInfo('summary', v)} textarea />
            </AccordionSection>

            <AccordionSection title="Work Experience">
                <div className="space-y-6">
                    {data.work_experience?.map((exp, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded p-4 relative group">
                            <button
                                onClick={() => removeExperience(index)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                            <InputGroup label="Company" value={exp.company} onChange={(v: string) => updateExperience(index, 'company', v)} />
                            <InputGroup label="Title" value={exp.title} onChange={(v: string) => updateExperience(index, 'title', v)} />
                            <div className="grid grid-cols-2 gap-2">
                                <InputGroup label="Start Date" value={exp.startDate} onChange={(v: string) => updateExperience(index, 'startDate', v)} />
                                <InputGroup label="End Date" value={exp.endDate} onChange={(v: string) => updateExperience(index, 'endDate', v)} />
                            </div>
                            <InputGroup
                                label="Description (One bullet per line)"
                                value={exp.description.join('\n')}
                                onChange={(v: string) => updateExperience(index, 'description', v)}
                                textarea
                            />
                        </div>
                    ))}
                    <button
                        onClick={addExperience}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus size={14} /> Add Role
                    </button>
                </div>
            </AccordionSection>

            <AccordionSection title="Education">
                <div className="space-y-4">
                    {data.education?.map((edu, index) => (
                        <div key={index} className="bg-gray-50 border border-gray-200 rounded p-4 relative">
                            <button
                                onClick={() => removeEducation(index)}
                                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                            <InputGroup label="School" value={edu.school} onChange={(v: string) => updateEducation(index, 'school', v)} />
                            <InputGroup label="Degree" value={edu.degree} onChange={(v: string) => updateEducation(index, 'degree', v)} />
                            <div className="grid grid-cols-2 gap-2">
                                <InputGroup label="Start Date" value={edu.startDate} onChange={(v: string) => updateEducation(index, 'startDate', v)} />
                                <InputGroup label="End Date" value={edu.endDate} onChange={(v: string) => updateEducation(index, 'endDate', v)} />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addEducation}
                        className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold uppercase rounded flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus size={14} /> Add Education
                    </button>
                </div>
            </AccordionSection>

            <AccordionSection title="Skills & Languages">
                <div className="space-y-6">
                    <div>
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Skills</h4>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={newSkillName}
                                onChange={(e) => setNewSkillName(e.target.value)}
                                placeholder="Add skill..."
                                className="flex-1 p-2 text-sm border border-gray-200 rounded"
                            />
                            <button onClick={addSkill} className="bg-gray-900 text-white p-2 rounded hover:bg-gray-800"><Plus size={16} /></button>
                        </div>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndSkills}>
                            <SortableContext items={data.skills.map(s => s.name)} strategy={verticalListSortingStrategy}>
                                {data.skills.map((skill) => (
                                    <SortableItem
                                        key={skill.name}
                                        id={skill.name}
                                        content={skill.name}
                                        visible={skill.visible}
                                        onToggle={() => toggleSkill(skill.name)}
                                        onDelete={() => removeSkill(skill.name)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Certifications</h4>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={newCertName}
                                onChange={(e) => setNewCertName(e.target.value)}
                                placeholder="Add certification..."
                                className="flex-1 p-2 text-sm border border-gray-200 rounded"
                            />
                            <button onClick={addCert} className="bg-gray-900 text-white p-2 rounded hover:bg-gray-800"><Plus size={16} /></button>
                        </div>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndCerts}>
                            <SortableContext items={data.certifications.map(c => c.name)} strategy={verticalListSortingStrategy}>
                                {data.certifications.map((cert) => (
                                    <SortableItem
                                        key={cert.name}
                                        id={cert.name}
                                        content={cert.name}
                                        visible={cert.visible}
                                        onToggle={() => toggleCert(cert.name)}
                                        onDelete={() => removeCert(cert.name)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Languages</h4>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={newLanguageName}
                                onChange={(e) => setNewLanguageName(e.target.value)}
                                placeholder="Add language..."
                                className="flex-1 p-2 text-sm border border-gray-200 rounded"
                            />
                            <button onClick={addLanguage} className="bg-gray-900 text-white p-2 rounded hover:bg-gray-800"><Plus size={16} /></button>
                        </div>
                        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndLanguages}>
                            <SortableContext items={data.languages.map(l => l.name)} strategy={verticalListSortingStrategy}>
                                {data.languages.map((lang) => (
                                    <SortableItem
                                        key={lang.name}
                                        id={lang.name}
                                        content={lang.name}
                                        visible={lang.visible}
                                        onToggle={() => toggleLanguage(lang.name)}
                                        onDelete={() => removeLanguage(lang.name)}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                </div>
            </AccordionSection>
        </div>
    );
};
