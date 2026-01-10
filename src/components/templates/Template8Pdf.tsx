import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Using Roboto (already registered in previous templates, or we can use Helvetica)
// Let's use Helvetica for simplicity and clean tech look, or Roboto if available.
// Since I can't guarantee previous register calls persist across file boundaries in this context (they might, but safe to assume I should use standard or re-register if I really needed custom).
// I'll use standard Helvetica for "Tech Minimalist" as it is very clean.

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template8Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#0f172a' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontFamily: 'Helvetica',
            backgroundColor: '#FFFFFF',
            color: '#1e293b', // slate-800
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            gap: 20,
        },
        profileImage: {
            width: 60,
            height: 60,
            borderRadius: 6,
            backgroundColor: '#f1f5f9',
            objectFit: 'cover',
        },
        headerContent: {
            flex: 1,
        },
        fullName: {
            fontSize: 22,
            fontWeight: 'bold', // Helvetica-Bold
            color: '#0f172a', // slate-900
            marginBottom: 5,
        },
        metaRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
        },
        metaItem: {
            fontSize: 9,
            color: '#64748b', // slate-500
        },
        grid: {
            flexDirection: 'row',
            gap: 30,
        },
        mainCol: {
            width: '65%',
        },
        sideCol: {
            width: '35%',
        },
        sectionLabel: {
            fontSize: 8,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#94a3b8', // slate-400
            marginBottom: 10,
            letterSpacing: 1,
        },
        summary: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#334155',
            marginBottom: 20,
        },
        experienceItem: {
            marginBottom: 15,
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: '#f1f5f9',
        },
        expHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2,
        },
        position: {
            fontSize: 10,
            fontWeight: 'bold', // Helvetica-Bold
            color: '#0f172a',
        },
        date: {
            fontSize: 8,
            color: '#94a3b8',
            fontFamily: 'Helvetica', // "mono" feel
        },
        company: {
            fontSize: 8,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: primaryColor,
            marginBottom: 4,
            letterSpacing: 0.5,
        },
        description: {
            fontSize: 9,
            lineHeight: 1.4,
            color: '#475569',
        },
        bulletPoint: {
            flexDirection: 'row',
            marginBottom: 2,
        },
        bullet: {
            width: 3,
            marginRight: 5,
            marginTop: 4,
        },
        skillBadge: {
            backgroundColor: '#f1f5f9',
            padding: '3 6',
            borderRadius: 2,
            fontSize: 8,
            color: '#334155',
            marginRight: 4,
            marginBottom: 4,
        },
        skillsWrap: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        eduItem: {
            marginBottom: 12,
        },
        school: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#0f172a',
        },
        eduDate: {
            fontSize: 8,
            color: '#64748b',
            marginBottom: 1,
        },
        degree: {
            fontSize: 9,
            color: '#334155',
        },
        langRow: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
        },
        langDot: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: primaryColor,
            marginRight: 6,
        },
        langText: {
            fontSize: 9,
            color: '#334155',
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    {profileImage && (
                        <Image src={profileImage} style={styles.profileImage} />
                    )}
                    <View style={styles.headerContent}>
                        <Text style={styles.fullName}>{personal_info.fullName}</Text>
                        <View style={styles.metaRow}>
                            {personal_info.email && <Text style={styles.metaItem}>{personal_info.email}</Text>}
                            {personal_info.phone && <Text style={styles.metaItem}>{personal_info.phone}</Text>}
                            {personal_info.location && <Text style={styles.metaItem}>{personal_info.location}</Text>}
                            {personal_info.linkedinUrl && <Text style={{ ...styles.metaItem, color: primaryColor, fontWeight: 'bold' }}>IN</Text>}
                        </View>
                    </View>
                </View>

                <View style={styles.grid}>
                    <View style={styles.mainCol}>
                        {personal_info.summary && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sectionLabel}>About</Text>
                                <Text style={styles.summary}>{personal_info.summary}</Text>
                            </View>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <View>
                                <Text style={styles.sectionLabel}>Work Experience</Text>
                                {work_experience.map((exp, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <View style={styles.expHeader}>
                                            <Text style={styles.position}>{exp.title}</Text>
                                            <Text style={styles.date}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
                                        </View>
                                        <Text style={styles.company}>{exp.company}</Text>
                                        {exp.description.map((desc, i) => (
                                            <View key={i} style={styles.bulletPoint}>
                                                <Text style={styles.bullet}>•</Text>
                                                <Text style={{ flex: 1, ...styles.description }}>{desc}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.sideCol}>
                        {skills && skills.length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sectionLabel}>Tech Stack</Text>
                                <View style={styles.skillsWrap}>
                                    {skills.filter(s => s.visible).map((skill, index) => (
                                        <Text key={index} style={styles.skillBadge}>{skill.name}</Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {education && education.length > 0 && (
                            <View style={{ marginBottom: 20 }}>
                                <Text style={styles.sectionLabel}>Education</Text>
                                {education.map((edu, index) => (
                                    <View key={index} style={styles.eduItem}>
                                        <Text style={styles.school}>{edu.school}</Text>
                                        <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
                                        <Text style={styles.degree}>{edu.degree}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {languages && languages.length > 0 && (
                            <View>
                                <Text style={styles.sectionLabel}>Languages</Text>
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <View key={index} style={styles.langRow}>
                                        <View style={styles.langDot} />
                                        <Text style={styles.langText}>{lang.name}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
