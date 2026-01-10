import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register fonts
Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Regular.ttf' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Medium.ttf', fontWeight: 500 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Bold.ttf', fontWeight: 700 },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/Roboto-Light.ttf', fontWeight: 300 },
    ],
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template3Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#334155' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Roboto',
        },
        main: {
            width: '65%',
            padding: 30,
            paddingRight: 40,
        },
        sidebar: {
            width: '35%',
            padding: 30,
            backgroundColor: '#F1F5F9', // Keep sidebar neutral
            borderLeftWidth: 1,
            borderLeftColor: '#E2E8F0',
        },
        headerName: {
            fontSize: 28,
            fontWeight: 700,
            color: primaryColor,
            letterSpacing: -0.5,
            marginBottom: 5,
        },
        summaryBox: {
            borderLeftWidth: 3,
            borderLeftColor: '#94A3B8',
            paddingLeft: 10,
            marginBottom: 30,
        },
        summaryText: {
            fontSize: 10,
            color: '#475569',
            fontStyle: 'italic',
            lineHeight: 1.5,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: 700,
            color: primaryColor,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },
        sectionTitleBar: {
            width: 20,
            height: 3,
            backgroundColor: primaryColor,
            marginRight: 8,
        },
        experienceItem: {
            marginBottom: 20,
        },
        expPosition: {
            fontSize: 12,
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: 2,
        },
        expDetails: {
            fontSize: 9,
            color: '#64748B',
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: 0.5,
            marginBottom: 5,
        },
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#475569',
        },
        profileImage: {
            width: 120,
            height: 120,
            borderRadius: 60,
            alignSelf: 'center',
            marginBottom: 25,
            borderWidth: 3,
            borderColor: '#FFFFFF',
        },
        sidebarSection: {
            marginBottom: 25,
        },
        sidebarTitle: {
            fontSize: 10,
            fontWeight: 700,
            color: '#475569',
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            borderBottomWidth: 1,
            borderBottomColor: '#CBD5E1',
            paddingBottom: 5,
            marginBottom: 10,
        },
        contactItem: {
            marginBottom: 10,
        },
        contactLabel: {
            fontSize: 8,
            fontWeight: 700,
            color: '#1E293B',
            marginBottom: 2,
        },
        contactValue: {
            fontSize: 9,
            color: '#475569',
        },
        eduItem: {
            marginBottom: 12,
        },
        eduSchool: {
            fontSize: 10,
            fontWeight: 700,
            color: '#1E293B',
        },
        eduDate: {
            fontSize: 8,
            color: '#64748B',
            marginBottom: 2,
        },
        eduDegree: {
            fontSize: 9,
            color: '#475569',
            fontStyle: 'italic',
        },
        skillBadge: {
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#CBD5E1',
            padding: '4 8',
            borderRadius: 2,
            fontSize: 8,
            color: '#334155',
            fontWeight: 500,
            textAlign: 'center',
            flexGrow: 1,
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
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
                <View style={styles.main}>
                    <View>
                        <Text style={styles.headerName}>{personal_info.fullName}</Text>
                        {personal_info.summary && (
                            <View style={styles.summaryBox}>
                                <Text style={styles.summaryText}>{personal_info.summary}</Text>
                            </View>
                        )}
                    </View>

                    {work_experience && work_experience.length > 0 && (
                        <View>
                            <View style={styles.sectionTitle}>
                                <View style={styles.sectionTitleBar} />
                                <Text>Experience</Text>
                            </View>
                            {work_experience.map((exp, index) => (
                                <View key={index} style={styles.experienceItem}>
                                    <Text style={styles.expPosition}>{exp.title}</Text>
                                    <Text style={styles.expDetails}>
                                        {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                                    </Text>
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

                <View style={styles.sidebar}>
                    {profileImage && (
                        <Image src={profileImage} style={styles.profileImage} />
                    )}

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Contact Info</Text>
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
                                <Text style={styles.contactValue}>Link to Profile</Text>
                            </View>
                        )}
                    </View>

                    {education && education.length > 0 && (
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Education</Text>
                            {education.map((edu, index) => (
                                <View key={index} style={styles.eduItem}>
                                    <Text style={styles.eduSchool}>{edu.school}</Text>
                                    <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
                                    <Text style={styles.eduDegree}>{edu.degree}</Text>
                                </View>
                            ))}
                        </View>
                    )}

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
                            {languages.filter(l => l.visible).map((lang, index) => (
                                <Text key={index} style={styles.contactValue}>• {lang.name}</Text>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );
};
