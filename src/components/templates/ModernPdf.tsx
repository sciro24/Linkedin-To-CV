import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ResumeData } from '@/types/resume';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    sidebar: {
        width: '33%',
        backgroundColor: '#0F172A', // Slate 900
        color: 'white',
        padding: 20,
        height: '100%',
    },
    main: {
        width: '67%',
        padding: 30,
        height: '100%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#334155',
        alignSelf: 'center',
        marginBottom: 15,
    },
    sidebarName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 5,
    },
    sidebarLocation: {
        fontSize: 10,
        textAlign: 'center',
        color: '#94A3B8', // Slate 400
        marginBottom: 20,
    },
    sidebarSection: {
        marginBottom: 20,
    },
    sidebarTitle: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#94A3B8',
        borderBottomWidth: 1,
        borderBottomColor: '#334155',
        paddingBottom: 5,
        marginBottom: 10,
        letterSpacing: 2,
    },
    sidebarText: {
        fontSize: 10,
        color: '#CBD5E1', // Slate 300
        marginBottom: 3,
    },
    sidebarLink: {
        fontSize: 9,
        color: '#60A5FA', // Blue 400
        marginBottom: 3,
    },
    skillTag: {
        backgroundColor: '#1E293B', // Slate 800
        color: '#E2E8F0', // Slate 200
        padding: 4,
        marginBottom: 4,
        borderRadius: 3,
        fontSize: 9,
        alignSelf: 'flex-start',
    },
    mainSection: {
        marginBottom: 20,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        borderBottomWidth: 2,
        borderBottomColor: '#3B82F6', // Blue 500
        paddingBottom: 2,
        marginBottom: 10,
        alignSelf: 'flex-start', // Mimic inline-block behavior
    },
    summaryText: {
        fontSize: 10,
        color: '#475569', // Slate 600
        lineHeight: 1.4,
    },
    expItem: {
        marginBottom: 12,
        borderLeftWidth: 2,
        borderLeftColor: '#E2E8F0',
        paddingLeft: 15,
        marginLeft: 5,
        position: 'relative'
    },
    expDot: {
        position: 'absolute',
        left: -20, // Adjust relative to padding
        top: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
    },
    expTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    expCompanyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 4,
    },
    expCompany: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#2563EB', // Blue 600
    },
    expDate: {
        fontSize: 10,
        color: '#64748B', // Slate 500
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
        fontSize: 9,
        color: '#475569',
    },
});

interface TemplateProps {
    data: ResumeData;
    profileImage?: string;
}

export const ModernPdf: React.FC<TemplateProps> = ({ data, profileImage }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.sidebar}>
                    <View>
                        {profileImage && (
                            <Image src={profileImage} style={styles.profileImage} />
                        )}
                        <Text style={styles.sidebarName}>{data.profile.fullName}</Text>
                        <Text style={styles.sidebarLocation}>{data.profile.location}</Text>
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Contact</Text>
                        <Text style={styles.sidebarText}>{data.profile.email}</Text>
                        <Text style={styles.sidebarText}>{data.profile.phone}</Text>
                        <Text style={styles.sidebarLink}>{data.profile.linkedinUrl}</Text>
                        <Text style={styles.sidebarLink}>{data.profile.portfolioUrl}</Text>
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Skills</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                            {data.skills.map((skill, index) => (
                                <Text key={index} style={styles.skillTag}>{skill}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.sidebarSection}>
                        <Text style={styles.sidebarTitle}>Education</Text>
                        {data.education.map((edu, index) => (
                            <View key={index} style={{ marginBottom: 8 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>{edu.school}</Text>
                                <Text style={styles.sidebarText}>{edu.degree}</Text>
                                <Text style={{ color: '#64748B', fontSize: 9 }}>{edu.startDate} - {edu.endDate}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.main}>
                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Profile</Text>
                        <Text style={styles.summaryText}>{data.profile.summary}</Text>
                    </View>

                    <View style={styles.mainSection}>
                        <Text style={styles.mainTitle}>Experience</Text>
                        {data.experience.map((exp, index) => (
                            <View key={index} style={styles.expItem}>
                                {/* Dot simulation is hard in pure PDF without absolute positioning tricks or SVGs, simplifying */}
                                <Text style={styles.expTitle}>{exp.title}</Text>
                                <View style={styles.expCompanyRow}>
                                    <Text style={styles.expCompany}>{exp.company}</Text>
                                    <Text style={styles.expDate}>{exp.startDate} - {exp.endDate}</Text>
                                </View>
                                {exp.description.map((desc, i) => (
                                    <View key={i} style={styles.bulletPoint}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.bulletText}>{desc}</Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};
