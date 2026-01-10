import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Using standard fonts (Times New Roman equivalent available in React-PDF as Times-Roman)
// Actually React-PDF supports Helvetica, Times-Roman, Courier by default.
// Let's use Times-Roman for that classic ATS look.

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template6Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#000000' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            padding: 50,
            fontFamily: 'Times-Roman',
            fontSize: 11,
            lineHeight: 1.4,
            color: '#000000',
        },
        header: {
            textAlign: 'center',
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: primaryColor,
            paddingBottom: 15,
        },
        fullName: {
            fontSize: 24,
            fontFamily: 'Times-Bold',
            textTransform: 'uppercase',
            marginBottom: 8,
            color: primaryColor,
        },
        contactRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 5,
            fontSize: 10,
        },
        contactItem: {
            // Just text
        },
        separator: {
            marginHorizontal: 5,
        },
        section: {
            marginBottom: 15,
        },
        sectionTitle: {
            fontSize: 11,
            fontFamily: 'Times-Bold',
            textTransform: 'uppercase',
            marginBottom: 8,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB', // Light gray divider
            paddingBottom: 2,
            color: primaryColor,
            letterSpacing: 1,
        },
        summary: {
            textAlign: 'justify',
            marginBottom: 10,
        },
        skillsText: {
            lineHeight: 1.5,
        },
        experienceItem: {
            marginBottom: 12,
        },
        expHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2,
        },
        position: {
            fontFamily: 'Times-Bold',
            fontSize: 12,
        },
        company: {
            fontFamily: 'Times-Italic',
            color: primaryColor,
            marginBottom: 3,
            fontSize: 11,
        },
        date: {
            fontSize: 10,
            color: '#333333',
        },
        bulletPoint: {
            flexDirection: 'row',
            marginLeft: 15,
            marginBottom: 2,
        },
        bullet: {
            width: 3,
            marginRight: 5,
        },
        eduItem: {
            marginBottom: 10,
        },
        eduHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
        },
        school: {
            fontFamily: 'Times-Bold',
        },
        degree: {
            fontSize: 11,
        },
    });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.fullName}>{personal_info.fullName}</Text>
                    <View style={styles.contactRow}>
                        {personal_info.location && <Text>{personal_info.location}</Text>}
                        {personal_info.location && (personal_info.email || personal_info.phone) && <Text style={styles.separator}>|</Text>}
                        {personal_info.email && <Text>{personal_info.email}</Text>}
                        {personal_info.email && personal_info.phone && <Text style={styles.separator}>|</Text>}
                        {personal_info.phone && <Text>{personal_info.phone}</Text>}
                        {personal_info.phone && personal_info.linkedinUrl && <Text style={styles.separator}>|</Text>}
                        {personal_info.linkedinUrl && <Text>LinkedIn Profile</Text>}
                    </View>
                </View>

                {personal_info.summary && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Summary</Text>
                        <Text style={styles.summary}>{personal_info.summary}</Text>
                    </View>
                )}

                {skills && skills.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Skills</Text>
                        <Text style={styles.skillsText}>
                            {skills.filter(s => s.visible).map(s => s.name).join(' • ')}
                        </Text>
                    </View>
                )}

                {work_experience && work_experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {work_experience.map((exp, index) => (
                            <View key={index} style={styles.experienceItem}>
                                <View style={styles.expHeader}>
                                    <Text style={styles.position}>{exp.title}</Text>
                                    <Text style={styles.date}>{exp.startDate} – {exp.endDate || 'Present'}</Text>
                                </View>
                                <Text style={styles.company}>{exp.company}</Text>
                                {exp.description.map((desc, i) => (
                                    <View key={i} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={{ flex: 1 }}>{desc}</Text>
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
                            <View key={index} style={styles.eduItem}>
                                <View style={styles.eduHeader}>
                                    <Text style={styles.school}>{edu.school}</Text>
                                    <Text style={styles.date}>{edu.startDate} – {edu.endDate || 'Present'}</Text>
                                </View>
                                <Text style={styles.degree}>{edu.degree}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {languages && languages.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Languages</Text>
                        <Text>
                            {languages.join(' • ')}
                        </Text>
                    </View>
                )}
            </Page>
        </Document>
    );
};
