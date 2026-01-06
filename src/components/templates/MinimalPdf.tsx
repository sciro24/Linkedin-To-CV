import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

// Register a font found in standard OS or standard fonts
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT_v30.woff2' }, // Example or use standard built-in
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 11,
        lineHeight: 1.5,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#111827',
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexGrow: 1,
    },
    headerRight: {
        marginLeft: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    contact: {
        fontSize: 10,
        color: '#4B5563',
        marginTop: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        marginBottom: 10,
        paddingBottom: 2,
        marginTop: 15,
    },
    sectionContent: {
        marginBottom: 5,
    },
    experienceItem: {
        marginBottom: 10,
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    expTitle: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    expDate: {
        fontSize: 10,
        color: '#6B7280',
    },
    expCompany: {
        fontSize: 11,
        fontStyle: 'italic',
        color: '#374151',
        marginBottom: 3,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    bullet: {
        width: 10,
        fontSize: 10,
    },
    bulletText: {
        flex: 1,
        fontSize: 10,
        color: '#4B5563',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    skillTag: {
        backgroundColor: '#F3F4F6',
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 4,
        fontSize: 9,
    },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
}

export const MinimalPdf: React.FC<TemplateProps> = ({ data, profileImage }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.name}>{data.profile.fullName}</Text>
                        <View style={styles.contact}>
                            <Text>{data.profile.location} • {data.profile.email} • {data.profile.phone}</Text>
                            <Text>{data.profile.linkedinUrl || ''} {data.profile.linkedinUrl && data.profile.portfolioUrl ? '•' : ''} {data.profile.portfolioUrl || ''}</Text>
                        </View>
                    </View>
                    {profileImage && (
                        <View style={styles.headerRight}>
                            <Image src={profileImage} style={styles.profileImage} />
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Profile</Text>
                    <Text style={[styles.sectionContent, { fontSize: 10, color: '#374151' }]}>{data.profile.summary}</Text>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Experience</Text>
                    {data.experience.map((exp, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{exp.title}</Text>
                                <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                            </View>
                            <Text style={styles.expCompany}>{exp.company}, {exp.location}</Text>
                            {exp.description.map((desc, i) => (
                                <View key={i} style={styles.bulletPoint}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bulletText}>{desc}</Text>
                                </View>
                            ))}
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Education</Text>
                    {data.education.map((edu, index) => (
                        <View key={index} style={styles.experienceItem}>
                            <View style={styles.expHeader}>
                                <Text style={styles.expTitle}>{edu.school}</Text>
                                <Text style={styles.expDate}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                            <Text style={[styles.expCompany, { fontStyle: 'normal' }]}>{edu.degree}, {edu.location}</Text>
                        </View>
                    ))}
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {data.skills.map((skill, index) => (
                            <View key={index} style={styles.skillTag}>
                                <Text>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
