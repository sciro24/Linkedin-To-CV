import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register fonts
Font.register({
    family: 'OpenSans',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
        { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
    ],
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template1Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#1E293B' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            fontFamily: 'OpenSans',
        },
        sidebar: {
            width: '30%',
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            padding: 20,
            height: '100%',
        },
        main: {
            padding: 30,
            width: '70%',
            color: '#334155',
        },
        profileImage: {
            width: 100,
            height: 100,
            borderRadius: 50,
            alignSelf: 'center',
            marginBottom: 20,
            borderWidth: 3,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            objectFit: 'cover',
        },
        sidebarSection: {
            marginBottom: 20,
        },
        sidebarTitle: {
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            marginBottom: 10,
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.7)',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255, 255, 255, 0.2)',
            paddingBottom: 4,
        },
        contactItem: {
            marginBottom: 8,
        },
        contactLabel: {
            fontSize: 7,
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: 2,
            textTransform: 'uppercase',
        },
        contactValue: {
            fontSize: 9,
            color: 'rgba(255, 255, 255, 0.9)',
        },
        skillBadge: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '4 8',
            borderRadius: 4,
            marginBottom: 4,
            fontSize: 9,
            color: '#FFFFFF',
            alignSelf: 'flex-start',
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
        },
        header: {
            marginBottom: 20,
            borderBottomWidth: 2,
            borderBottomColor: '#F1F5F9',
            paddingBottom: 15,
        },
        fullName: {
            fontSize: 24,
            fontWeight: 700,
            textTransform: 'uppercase',
            marginBottom: 5,
            color: primaryColor,
        },
        summary: {
            marginTop: 10,
            fontSize: 10,
            lineHeight: 1.5,
            color: '#475569',
        },
        section: {
            marginBottom: 20,
        },
        sectionTitle: {
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: primaryColor,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#E2E8F0',
            paddingBottom: 4,
            letterSpacing: 1,
        },
        experienceItem: {
            marginBottom: 12,
            paddingLeft: 10,
            borderLeftWidth: 2,
            borderLeftColor: '#E2E8F0',
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
            color: '#0F172A',
        },
        date: {
            fontSize: 9,
            color: '#64748B',
            fontWeight: 600,
        },
        company: {
            fontSize: 10,
            fontWeight: 600,
            color: primaryColor,
            marginBottom: 4,
        },
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#475569',
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
                <View style={styles.sidebar}>
                    {profileImage && (
                        <Image src={profileImage} style={styles.profileImage} />
                    )}

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Contact</Text>
                        {personal_info.email && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Email</Text>
                                <Text style={styles.contactValue}>{personal_info.email}</Text>
                            </View>
                        )}
                        {personal_info.phone && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Phone</Text>
                                <Text style={styles.contactValue}>{personal_info.phone}</Text>
                            </View>
                        )}
                        {personal_info.location && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>Location</Text>
                                <Text style={styles.contactValue}>{personal_info.location}</Text>
                            </View>
                        )}
                        {personal_info.linkedinUrl && (
                            <View style={styles.contactItem}>
                                <Text style={styles.contactLabel}>LinkedIn</Text>
                                <Text style={styles.contactValue}>{personal_info.linkedinUrl.replace(/^https?:\/\//, '')}</Text>
                            </View>
                        )}
                    </View>

                    {skills && skills.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Skills</Text>
                            <View style={styles.skillsContainer}>
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <Text key={index} style={styles.skillBadge}>{skill.name}</Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {languages && languages.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Languages</Text>
                            {languages.map((lang, index) => (
                                <Text key={index} style={styles.contactValue}>• {lang}</Text>
                            ))}
                        </View>
                    )}
                </View>

                <View style={styles.main}>
                    <View style={styles.header}>
                        <Text style={styles.fullName}>{personal_info.fullName}</Text>
                        {personal_info.summary && (
                            <Text style={styles.summary}>{personal_info.summary}</Text>
                        )}
                    </View>

                    {work_experience && work_experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Experience</Text>
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

                    {education && education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {education.map((edu, index) => (
                                <View key={index} style={[styles.experienceItem, { borderLeftWidth: 0, paddingLeft: 0 }]}>
                                    <View style={styles.expHeader}>
                                        <Text style={styles.position}>{edu.school}</Text>
                                        <Text style={styles.date}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
                                    </View>
                                    <Text style={styles.company}>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
