import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register fonts
Font.register({
    family: 'Oswald',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/oswald@4.5.0/files/oswald-latin-300-normal.woff' },
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/oswald@4.5.0/files/oswald-latin-400-normal.woff', fontWeight: 400 },
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/oswald@4.5.0/files/oswald-latin-700-normal.woff', fontWeight: 700 }, // Bold
    ],
});

Font.register({
    family: 'Lato',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato@4.5.0/files/lato-latin-400-normal.woff' },
        { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato@4.5.0/files/lato-latin-700-normal.woff', fontWeight: 700 },
    ],
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template5Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#4F46E5' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Lato',
        },
        header: {
            backgroundColor: primaryColor,
            padding: 40,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20,
        },
        headerContent: {
            flex: 1,
        },
        fullName: {
            fontFamily: 'Oswald',
            fontSize: 32,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#FFFFFF',
            marginBottom: 5,
        },
        profileImage: {
            width: 90,
            height: 90,
            borderRadius: 45,
            borderWidth: 3,
            borderColor: '#FFFFFF',
            objectFit: 'cover',
        },
        contentContainer: {
            flexDirection: 'row',
            flex: 1,
        },
        sidebar: {
            width: '35%',
            backgroundColor: '#F3F4F6', // Gray 100
            padding: 30,
            borderRightWidth: 1,
            borderRightColor: '#E5E7EB',
        },
        main: {
            width: '65%',
            padding: 30,
        },
        sidebarSection: {
            marginBottom: 25,
        },
        sidebarTitle: {
            fontFamily: 'Oswald',
            fontSize: 12,
            fontWeight: 700,
            color: primaryColor,
            textTransform: 'uppercase',
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
        },
        contactItem: {
            fontSize: 9,
            color: '#374151',
            marginBottom: 6,
        },
        skillBadge: {
            backgroundColor: '#FFFFFF',
            padding: '4 8',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#E0E7FF',
            marginBottom: 6,
            alignSelf: 'flex-start',
            fontSize: 9,
            color: primaryColor,
            fontWeight: 700,
        },
        skillsContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
        },
        sectionTitle: {
            fontFamily: 'Oswald',
            fontSize: 16,
            fontWeight: 700,
            color: '#1F2937',
            marginBottom: 15,
            borderBottomWidth: 3,
            borderBottomColor: '#E0E7FF', // Using a generic light color or we can try to use primaryColor with opacity if we could
            alignSelf: 'flex-start',
            paddingBottom: 2,
        },
        summary: {
            fontSize: 10,
            lineHeight: 1.6,
            color: '#4B5563',
            marginBottom: 25,
        },
        experienceItem: {
            marginBottom: 20,
        },
        expHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 2,
        },
        position: {
            fontFamily: 'Oswald',
            fontSize: 12,
            fontWeight: 700,
            color: primaryColor,
        },
        dateBadge: {
            backgroundColor: '#EEF2FF',
            color: primaryColor,
            fontSize: 8,
            padding: '2 6',
            borderRadius: 10,
            fontWeight: 700,
        },
        company: {
            fontSize: 9,
            textTransform: 'uppercase',
            color: '#6B7280',
            fontWeight: 700,
            letterSpacing: 0.5,
            marginBottom: 6,
        },
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#4B5563',
        },
        eduItem: {
            marginBottom: 15,
            paddingLeft: 10,
            borderLeftWidth: 2,
            borderLeftColor: '#C7D2FE',
        },
        eduSchool: {
            fontSize: 10,
            fontWeight: 700,
            color: '#1F2937',
        },
        eduDate: {
            fontSize: 8,
            fontWeight: 700,
            color: primaryColor,
            marginBottom: 2,
        },
        eduDegree: {
            fontSize: 9,
            color: '#4B5563',
        },
        langItem: {
            fontSize: 9,
            color: '#374151',
            fontWeight: 700,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
            paddingBottom: 4,
            marginBottom: 4,
        },
        bulletPoint: {
            flexDirection: 'row',
            marginBottom: 2,
        },
        bullet: {
            width: 3,
            height: 3,
            backgroundColor: '#4B5563',
            borderRadius: 1.5,
            marginRight: 5,
            marginTop: 4,
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
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.sidebar}>
                        <View style={styles.sidebarSection}>
                            <Text style={styles.sidebarTitle}>Contact</Text>
                            {personal_info.email && <Text style={styles.contactItem}>{personal_info.email}</Text>}
                            {personal_info.phone && <Text style={styles.contactItem}>{personal_info.phone}</Text>}
                            {personal_info.location && <Text style={styles.contactItem}>{personal_info.location}</Text>}
                            {personal_info.linkedinUrl && <Text style={styles.contactItem}>Link to Profile</Text>}
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

                        {languages && languages.length > 0 && (
                            <View style={styles.sidebarSection}>
                                <Text style={styles.sidebarTitle}>Languages</Text>
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <Text key={index} style={styles.langItem}>{lang.name}</Text>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.main}>
                        {personal_info.summary && (
                            <View style={styles.sidebarSection}>
                                <Text style={styles.sectionTitle}>Profile</Text>
                                <Text style={styles.summary}>{personal_info.summary}</Text>
                            </View>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <View style={styles.sidebarSection}>
                                <Text style={styles.sectionTitle}>Work Experience</Text>
                                {work_experience.map((exp, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <View style={styles.expHeader}>
                                            <Text style={styles.position}>{exp.title}</Text>
                                            <Text style={styles.dateBadge}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
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
                </View>
            </Page>
        </Document>
    );
};
