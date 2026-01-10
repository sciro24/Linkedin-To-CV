import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register standard fonts or use defaults. For Modern Executive, Helvetica is good.
// It's built-in as 'Helvetica'.

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template7Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#2d3748' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Helvetica',
            paddingBottom: 40,
        },
        topBorder: {
            height: 15,
            backgroundColor: primaryColor,
            marginBottom: 30,
        },
        container: {
            paddingHorizontal: 40,
        },
        header: {
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            paddingBottom: 20,
            marginBottom: 20,
        },
        fullName: {
            fontSize: 28,
            fontWeight: 'bold', // Helvetica-Bold
            textTransform: 'uppercase',
            marginBottom: 5,
            color: '#111827',
        },
        contactRow: {
            flexDirection: 'row',
            gap: 15,
            marginBottom: 2,
        },
        contactItem: {
            fontSize: 10,
            color: '#4B5563',
        },
        mainLayout: {
            flexDirection: 'row',
            gap: 30,
        },
        mainCol: {
            width: '65%',
        },
        sideCol: {
            width: '35%',
        },
        sectionTitle: {
            fontSize: 10,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: 10,
            color: primaryColor,
            letterSpacing: 1,
        },
        summary: {
            fontSize: 10,
            lineHeight: 1.5,
            color: '#374151',
            marginBottom: 20,
            textAlign: 'justify',
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
            fontWeight: 'bold',
            color: '#111827',
        },
        date: {
            fontSize: 9,
            backgroundColor: '#F3F4F6',
            padding: '2 4',
            borderRadius: 2,
            color: '#6B7280',
        },
        company: {
            fontSize: 10,
            fontWeight: 'bold',
            color: primaryColor,
            marginBottom: 4,
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
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#4B5563',
        },
        skillItem: {
            fontSize: 10,
            backgroundColor: '#F9FAFB',
            padding: '4 6',
            marginBottom: 4,
            borderLeftWidth: 2,
            borderLeftColor: primaryColor,
            color: '#374151',
        },
        eduItem: {
            marginBottom: 15,
        },
        school: {
            fontSize: 11,
            fontWeight: 'bold',
            color: '#111827',
        },
        eduDate: {
            fontSize: 9,
            color: '#6B7280',
            marginBottom: 2,
        },
        degree: {
            fontSize: 10,
            color: '#374151',
        },
        langItem: {
            fontSize: 10,
            color: '#374151',
            borderBottomWidth: 1,
            borderBottomColor: '#F3F4F6',
            paddingBottom: 2,
            marginBottom: 4,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.topBorder} />

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.fullName}>{personal_info.fullName}</Text>
                        <View style={styles.contactRow}>
                            {personal_info.email && <Text style={styles.contactItem}>{personal_info.email}</Text>}
                            {personal_info.phone && <Text style={styles.contactItem}>{personal_info.phone}</Text>}
                        </View>
                        <View style={styles.contactRow}>
                            {personal_info.location && <Text style={styles.contactItem}>{personal_info.location}</Text>}
                            {personal_info.linkedinUrl && <Text style={{ ...styles.contactItem, color: primaryColor }}>LinkedIn Profile</Text>}
                        </View>
                    </View>

                    <View style={styles.mainLayout}>
                        <View style={styles.mainCol}>
                            {personal_info.summary && (
                                <View>
                                    <Text style={styles.sectionTitle}>Executive Summary</Text>
                                    <Text style={styles.summary}>{personal_info.summary}</Text>
                                </View>
                            )}

                            {work_experience && work_experience.length > 0 && (
                                <View>
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
                                    <Text style={styles.sectionTitle}>Core Competencies</Text>
                                    {skills.filter(s => s.visible).map((skill, index) => (
                                        <Text key={index} style={styles.skillItem}>{skill.name}</Text>
                                    ))}
                                </View>
                            )}

                            {education && education.length > 0 && (
                                <View style={{ marginBottom: 20 }}>
                                    <Text style={styles.sectionTitle}>Education</Text>
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
                                    <Text style={styles.sectionTitle}>Languages</Text>
                                    {languages.filter(l => l.visible).map((lang, index) => (
                                        <Text key={index} style={styles.langItem}>{lang.name}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
