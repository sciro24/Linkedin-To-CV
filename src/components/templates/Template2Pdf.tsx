import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register fonts
Font.register({
    family: 'Lora',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/lora_latin@1.44.2/files/lora-latin-400.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/lora_latin@1.44.2/files/lora-latin-700.ttf', fontWeight: 700 },
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/lora_latin@1.44.2/files/lora-latin-400italic.ttf', fontStyle: 'italic' },
    ],
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template2Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#2C3E50' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Lora',
        },
        header: {
            backgroundColor: primaryColor,
            padding: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerContent: {
            width: '75%',
        },
        fullName: {
            fontSize: 26,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#ffffff',
            letterSpacing: 2,
            marginBottom: 5,
        },
        title: {
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        contactRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 15,
            gap: 15,
        },
        contactItem: {
            fontSize: 9,
            color: 'rgba(255, 255, 255, 0.9)',
        },
        profileImageContainer: {
            width: 80,
            height: 80,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
        },
        profileImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        twoCol: {
            flexDirection: 'row',
            padding: 30,
            gap: 30,
        },
        mainCol: {
            width: '65%',
        },
        sideCol: {
            width: '35%',
        },
        section: {
            marginBottom: 25,
        },
        sectionTitle: {
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: primaryColor,
            borderBottomWidth: 1.5,
            borderBottomColor: primaryColor,
            paddingBottom: 5,
            marginBottom: 10,
            letterSpacing: 1,
        },
        summary: {
            fontSize: 10,
            lineHeight: 1.6,
            textAlign: 'justify',
            color: '#334155',
        },
        experienceItem: {
            marginBottom: 15,
        },
        expHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2,
        },
        position: {
            fontSize: 12,
            fontWeight: 700,
            color: '#1E293B',
        },
        date: {
            fontSize: 9,
            fontWeight: 700,
            color: primaryColor,
            opacity: 0.8,
        },
        company: {
            fontSize: 10,
            fontStyle: 'italic',
            color: '#64748B',
            marginBottom: 4,
        },
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#475569',
        },
        sideSection: {
            marginBottom: 25,
            padding: 10,
            backgroundColor: '#F8FAFC',
            borderRadius: 4,
        },
        sideTitle: {
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: primaryColor,
            borderBottomWidth: 1,
            borderBottomColor: primaryColor,
            paddingBottom: 3,
            marginBottom: 8,
            opacity: 0.8,
        },
        eduItem: {
            marginBottom: 10,
        },
        school: {
            fontSize: 10,
            fontWeight: 700,
            color: '#1E293B',
        },
        eduDate: {
            fontSize: 8,
            fontWeight: 700,
            color: primaryColor,
            marginBottom: 2,
            opacity: 0.8,
        },
        degree: {
            fontSize: 9,
            color: '#475569',
        },
        skillBadge: {
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            fontSize: 8,
            padding: '3 6',
            marginBottom: 4,
            marginRight: 4,
            fontWeight: 700,
            textTransform: 'uppercase',
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        langItem: {
            fontSize: 9,
            paddingBottom: 4,
            marginBottom: 4,
            borderBottomWidth: 0.5,
            borderBottomColor: '#CBD5E1',
            borderStyle: 'dotted',
            color: '#334155',
        },
        bulletPoint: {
            flexDirection: 'row',
            marginBottom: 2,
        },
        bullet: {
            width: 3,
            height: 3,
            backgroundColor: '#475569',
            borderRadius: 1.5,
            marginRight: 5,
            marginTop: 4,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <Text style={styles.fullName}>{personal_info.fullName}</Text>
                        <View style={styles.contactRow}>
                            {personal_info.email && <Text style={styles.contactItem}>Email: {personal_info.email}</Text>}
                            {personal_info.phone && <Text style={styles.contactItem}>Tel: {personal_info.phone}</Text>}
                            {personal_info.location && <Text style={styles.contactItem}>Loc: {personal_info.location}</Text>}
                            {personal_info.linkedinUrl && (
                                <Text style={styles.contactItem}>LinkedIn</Text>
                            )}
                        </View>
                    </View>
                    {profileImage && (
                        <View style={styles.profileImageContainer}>
                            <Image src={profileImage} style={styles.profileImage} />
                        </View>
                    )}
                </View>

                <View style={styles.twoCol}>
                    <View style={styles.mainCol}>
                        {personal_info.summary && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Profile</Text>
                                <Text style={styles.summary}>{personal_info.summary}</Text>
                            </View>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Professional Experience</Text>
                                {work_experience.map((exp, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <View style={styles.expHeader}>
                                            <Text style={styles.position}>{exp.title}</Text>
                                            <Text style={styles.date}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
                                        </View>
                                        <Text style={styles.company}>{exp.company}</Text>
                                        {exp.description.map((desc, i) => (
                                            <View key={i} style={styles.bulletPoint}>
                                                <View style={styles.bullet} />
                                                <Text style={styles.description}>{desc}</Text>
                                            </View>
                                        ))}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.sideCol}>
                        {education && education.length > 0 && (
                            <View style={styles.sideSection}>
                                <Text style={styles.sideTitle}>Education</Text>
                                {education.map((edu, index) => (
                                    <View key={index} style={styles.eduItem}>
                                        <Text style={styles.school}>{edu.school}</Text>
                                        <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
                                        <Text style={styles.degree}>{edu.degree}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {skills && skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Skills</Text>
                                <View style={styles.skillsContainer}>
                                    {skills.filter(s => s.visible).map((skill, index) => (
                                        <Text key={index} style={styles.skillBadge}>{skill.name}</Text>
                                    ))}
                                </View>
                            </View>
                        )}

                        {languages && languages.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Languages</Text>
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <Text key={index} style={styles.langItem}>{lang.name}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
