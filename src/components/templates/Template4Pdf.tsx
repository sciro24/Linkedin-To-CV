import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';
import { Language } from '../../utils/translations';

// Register fonts
Font.register({
    family: 'Montserrat',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/montserrat_latin@1.44.2/files/montserrat-latin-300.ttf', fontWeight: 300 },
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/montserrat_latin@1.44.2/files/montserrat-latin-400.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/montserrat_latin@1.44.2/files/montserrat-latin-600.ttf', fontWeight: 600 },
        { src: 'https://cdn.jsdelivr.net/npm/@openfonts/montserrat_latin@1.44.2/files/montserrat-latin-700.ttf', fontWeight: 700 }, // Bold
    ],
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
    language: Language;
    primaryColor?: string;
}

export const Template4Pdf: React.FC<TemplateProps> = ({ data, profileImage, language, primaryColor = '#000000' }) => {
    const { personal_info, work_experience, education, skills, languages } = data;

    const styles = StyleSheet.create({
        page: {
            padding: 40,
            backgroundColor: '#FFFFFF',
            fontFamily: 'Montserrat',
            color: '#000000',
        },
        header: {
            marginBottom: 40,
            borderBottomWidth: 1,
            borderBottomColor: primaryColor,
            paddingBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        headerLeft: {
            flex: 1,
        },
        fullName: {
            fontSize: 30,
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: 4,
            marginBottom: 10,
            color: primaryColor,
        },
        contactInfo: {
            fontSize: 9,
            fontFamily: 'Montserrat',
            color: '#6B7280', // Gray 500
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15,
        },
        profileImage: {
            width: 80,
            height: 80,
            marginLeft: 20,
            filter: 'grayscale(100%)',
        },
        content: {
            flexDirection: 'row',
            gap: 40,
        },
        leftColumn: {
            width: '65%',
        },
        rightColumn: {
            width: '35%',
        },
        section: {
            marginBottom: 30,
        },
        sectionTitle: {
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 15,
            color: primaryColor,
        },
        summary: {
            fontSize: 9,
            lineHeight: 1.6,
            color: '#374151',
            textAlign: 'justify',
        },
        experienceItem: {
            marginBottom: 20,
            paddingLeft: 10,
            borderLeftWidth: 1,
            borderLeftColor: '#E5E7EB',
        },
        expPosition: {
            fontSize: 11,
            fontWeight: 700,
            color: primaryColor,
            marginBottom: 2,
        },
        expMeta: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
        },
        expCompany: {
            fontSize: 9,
            fontWeight: 600,
            color: '#374151',
        },
        expDate: {
            fontSize: 8,
            color: '#6B7280', // Gray 500
        },
        description: {
            fontSize: 9,
            lineHeight: 1.5,
            color: '#4B5563', // Gray 600
        },
        eduItem: {
            marginBottom: 15,
        },
        eduDate: {
            fontSize: 8,
            color: '#6B7280',
            marginBottom: 2,
        },
        eduSchool: {
            fontSize: 10,
            fontWeight: 700,
            color: primaryColor,
        },
        eduDegree: {
            fontSize: 9,
            color: '#374151',
        },
        skillItem: {
            fontSize: 9,
            color: '#374151',
            borderBottomWidth: 0.5,
            borderBottomColor: '#F3F4F6',
            paddingBottom: 4,
            marginBottom: 6,
        },
        langBadge: {
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            fontSize: 8,
            padding: '4 8',
            borderRadius: 10,
            alignSelf: 'flex-start',
            marginBottom: 5,
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
                    <View style={styles.headerLeft}>
                        <Text style={styles.fullName}>{personal_info.fullName}</Text>
                        <View style={styles.contactInfo}>
                            {personal_info.email && <Text>{personal_info.email}</Text>}
                            {personal_info.phone && <Text>{personal_info.phone}</Text>}
                            {personal_info.location && <Text>{personal_info.location}</Text>}
                            {personal_info.linkedinUrl && (
                                <Text>LinkedIn Profile</Text>
                            )}
                        </View>
                    </View>
                    {profileImage && (
                        <Image src={profileImage} style={styles.profileImage} />
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.leftColumn}>
                        {personal_info.summary && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>About Me</Text>
                                <Text style={styles.summary}>{personal_info.summary}</Text>
                            </View>
                        )}

                        {work_experience && work_experience.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Experience</Text>
                                {work_experience.map((exp, index) => (
                                    <View key={index} style={styles.experienceItem}>
                                        <Text style={styles.expPosition}>{exp.title}</Text>
                                        <View style={styles.expMeta}>
                                            <Text style={styles.expCompany}>{exp.company}</Text>
                                            <Text style={styles.expDate}>{exp.startDate} - {exp.endDate || 'Present'}</Text>
                                        </View>
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

                    <View style={styles.rightColumn}>
                        {education && education.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Education</Text>
                                {education.map((edu, index) => (
                                    <View key={index} style={styles.eduItem}>
                                        <Text style={styles.eduDate}>{edu.startDate} - {edu.endDate || 'Present'}</Text>
                                        <Text style={styles.eduSchool}>{edu.school}</Text>
                                        <Text style={styles.eduDegree}>{edu.degree}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {skills && skills.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Expertise</Text>
                                {skills.filter(s => s.visible).map((skill, index) => (
                                    <Text key={index} style={styles.skillItem}>{skill.name}</Text>
                                ))}
                            </View>
                        )}

                        {languages && languages.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Languages</Text>
                                {languages.filter(l => l.visible).map((lang, index) => (
                                    <Text key={index} style={styles.langBadge}>{lang.name}</Text>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
