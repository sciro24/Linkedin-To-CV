export type Language = 'Italiano' | 'English' | 'Español' | 'Français' | 'Deutsch';

export const dictionary: Record<Language, {
    contact: string;
    summary: string;
    experience: string;
    education: string;
    certifications: string;
    skills: string;
    languages: string;
    downloadPdf: string;
    generatedWith: string;
}> = {
    'Italiano': {
        contact: 'Contatti',
        summary: 'Profilo',
        experience: 'Esperienza Lavorativa',
        education: 'Formazione',
        certifications: 'Certificazioni',
        skills: 'Competenze',
        languages: 'Lingue',
        downloadPdf: 'Scarica PDF',
        generatedWith: 'Generato con LinkedIn to CV',
    },
    'English': {
        contact: 'Contact',
        summary: 'Profile',
        experience: 'Work Experience',
        education: 'Education',
        certifications: 'Certifications',
        skills: 'Skills',
        languages: 'Languages',
        downloadPdf: 'Download PDF',
        generatedWith: 'Generated with LinkedIn to CV',
    },
    'Español': {
        contact: 'Contacto',
        summary: 'Perfil',
        experience: 'Experiencia Laboral',
        education: 'Educación',
        certifications: 'Certificaciones',
        skills: 'Habilidades',
        languages: 'Idiomas',
        downloadPdf: 'Descargar PDF',
        generatedWith: 'Generado con LinkedIn to CV',
    },
    'Français': {
        contact: 'Contact',
        summary: 'Profil',
        experience: 'Expérience Professionnelle',
        education: 'Formation',
        certifications: 'Certifications',
        skills: 'Compétences',
        languages: 'Langues',
        downloadPdf: 'Télécharger PDF',
        generatedWith: 'Généré avec LinkedIn to CV',
    },
    'Deutsch': {
        contact: 'Kontakt',
        summary: 'Profil',
        experience: 'Berufserfahrung',
        education: 'Ausbildung',
        certifications: 'Zertifizierungen',
        skills: 'Fähigkeiten',
        languages: 'Sprachen',
        downloadPdf: 'PDF Herunterladen',
        generatedWith: 'Erstellt mit LinkedIn to CV',
    }
};

export const siteTranslations: Record<Language, {
    nav: {
        features: string;
        templates: string;
        github: string;
    };
    hero: {
        languageLabel: string;
        titleStart: string;
        titleHighlight: string;
        subtitle: string;
        uploadTitle: string;
        uploadDesc: string;
        uploadButton: string;
        noSignup: string;
    };
    features: {
        aiTitle: string;
        aiDesc: string;
        templatesTitle: string;
        templatesDesc: string;
        smartTitle: string;
        smartDesc: string;
    };
    templates: {
        title: string;
        subtitle: string;
        preview: string;
        t1Style: string;
        t2Style: string;
        t3Style: string;
        t4Style: string;
    };
    editor: {
        badge: string;
        backToHome: string;
        exportPdf: string;
        sourceFile: string;
        changePdf: string;
        cvLanguage: string;
        profilePhoto: string;
        changePhoto: string;
        uploadPhoto: string;
        template: string;
        editContent: string;
        analyzing: string;
        analyzingSub: string;
        loading: string;
        error: string;
    };
    footer: {
        rights: string;
    }
}> = {
    'Italiano': {
        nav: {
            features: 'Funzionalità',
            templates: 'Modelli',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Lingua Sito e CV:',
            titleStart: 'Trasforma il tuo Profilo LinkedIn in un',
            titleHighlight: 'CV Professionale',
            subtitle: 'Smetti di lottare con la formattazione. Carica il tuo PDF di LinkedIn e lascia che la nostra IA crei un curriculum stupendo e ottimizzato ATS in pochi secondi.',
            uploadTitle: 'Carica PDF LinkedIn',
            uploadDesc: 'Trascina o Clicca per Scegliere',
            uploadButton: 'Genera Curriculum',
            noSignup: 'Nessuna registrazione • Gratis • Privacy garantita'
        },
        features: {
            aiTitle: 'Estrazione IA',
            aiDesc: "Usiamo l'IA Google Gemini per analizzare intelligentemente le descrizioni del lavoro e ottimizzarle per chiarezza e impatto.",
            templatesTitle: 'Template Professionali',
            templatesDesc: 'Scegli tra 4 modelli raffinati e creati da designer che gestiscono automaticamente interruzioni di pagina e layout.',
            smartTitle: 'Ottimizzazione Smart',
            smartDesc: 'Classifica automaticamente le competenze, traduce i contenuti e formatta l\'esperienza usando il metodo STAR.'
        },
        templates: {
            title: 'Design Stupendi',
            subtitle: 'Scegli tra una varietà di layout professionali',
            preview: 'Anteprima',
            t1Style: 'Sidebar Scura a Sinistra',
            t2Style: 'Sidebar Blu a Destra',
            t3Style: 'Header e Sidebar Blu',
            t4Style: 'Header Nero e Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Torna alla Home',
            exportPdf: 'Esporta PDF',
            sourceFile: 'File Sorgente',
            changePdf: 'Cambia PDF',
            cvLanguage: 'Lingua CV',
            profilePhoto: 'Foto Profilo',
            changePhoto: 'Cambia Foto',
            uploadPhoto: 'Carica Foto',
            template: 'Modello',
            editContent: 'Modifica Contenuti',
            analyzing: 'Analisi Profilo...',
            analyzingSub: 'L\'IA Gemini sta creando il tuo nuovo CV',
            loading: 'Caricamento...',
            error: 'Ops! Qualcosa è andato storto. Riprova.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Progetto Open Source.'
        }
    },
    'English': {
        nav: {
            features: 'Features',
            templates: 'Templates',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Site & CV Language:',
            titleStart: 'Turn your LinkedIn Profile into a',
            titleHighlight: 'Professional CV',
            subtitle: 'Stop fighting with formatting. Upload your LinkedIn PDF and let our AI create a stunning, ATS-optimized resume in seconds.',
            uploadTitle: 'Upload LinkedIn PDF',
            uploadDesc: 'Drag & Drop or Click to Browse',
            uploadButton: 'Generate Resume',
            noSignup: 'No sign-up required • Free to use • Privacy focused'
        },
        features: {
            aiTitle: 'AI-Powered Extraction',
            aiDesc: 'We use Google\'s Gemini AI to intelligently analyze job descriptions and optimize them for clarity and impact.',
            templatesTitle: 'Professional Templates',
            templatesDesc: 'Choose from 4 polished, designer-crafted templates that automatically handle page breaks and layout perfectly.',
            smartTitle: 'Smart Optimization',
            smartDesc: 'Automatically ranks skills, translates content, and formats experience using the STAR method for maximum ATS visibility.'
        },
        templates: {
            title: 'Stunning Designs',
            subtitle: 'Choose from a variety of professional layouts',
            preview: 'Preview',
            t1Style: 'Dark Sidebar Left',
            t2Style: 'Navy Sidebar Right',
            t3Style: 'Blue Header & Sidebar',
            t4Style: 'Black Header & Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Back to Home',
            exportPdf: 'Export PDF',
            sourceFile: 'Source File',
            changePdf: 'Change PDF',
            cvLanguage: 'CV Language',
            profilePhoto: 'Profile Photo',
            changePhoto: 'Change Photo',
            uploadPhoto: 'Upload Photo',
            template: 'Template',
            editContent: 'Edit Content',
            analyzing: 'Analyzing Profile...',
            analyzingSub: 'Gemini AI is crafting your new CV',
            loading: 'Loading...',
            error: 'Failed to process the PDF. Please try again.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Open Source Project.'
        }
    },
    'Español': {
        nav: {
            features: 'Características',
            templates: 'Plantillas',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Idioma Sitio y CV:',
            titleStart: 'Transforma tu Perfil de LinkedIn en un',
            titleHighlight: 'CV Profesional',
            subtitle: 'Deja de luchar con el formato. Sube tu PDF de LinkedIn y deja que nuestra IA cree un currículum impresionante y optimizado para ATS en segundos.',
            uploadTitle: 'Subir PDF de LinkedIn',
            uploadDesc: 'Arrastra y suelta o haz clic para buscar',
            uploadButton: 'Generar Currículum',
            noSignup: 'Sin registro • Gratis • Privacidad garantizada'
        },
        features: {
            aiTitle: 'Extracción por IA',
            aiDesc: 'Usamos la IA Google Gemini para analizar inteligentemente las descripciones de trabajo y optimizarlas para claridad e impacto.',
            templatesTitle: 'Plantillas Profesionales',
            templatesDesc: 'Elige entre 4 plantillas pulidas y diseñadas profesionalmente que manejan automáticamente los saltos de página y el diseño.',
            smartTitle: 'Optimización Inteligente',
            smartDesc: 'Clasifica automáticamente habilidades, traduce contenido y formatea la experiencia usando el método STAR.'
        },
        templates: {
            title: 'Diseños Impresionantes',
            subtitle: 'Elige entre una variedad de diseños profesionales',
            preview: 'Vista Previa',
            t1Style: 'Barra Lateral Oscura Izquierda',
            t2Style: 'Barra Lateral Azul Derecha',
            t3Style: 'Encabezado y Barra Azul',
            t4Style: 'Encabezado Negro y Cronología'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Volver al Inicio',
            exportPdf: 'Exportar PDF',
            sourceFile: 'Archivo Fuente',
            changePdf: 'Cambiar PDF',
            cvLanguage: 'Idioma del CV',
            profilePhoto: 'Foto de Perfil',
            changePhoto: 'Cambiar Foto',
            uploadPhoto: 'Subir Foto',
            template: 'Plantilla',
            editContent: 'Editar Contenido',
            analyzing: 'Analizando Perfil...',
            analyzingSub: 'La IA Gemini está creando tu nuevo CV',
            loading: 'Cargando...',
            error: 'Error al procesar el PDF. Inténtalo de nuevo.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Proyecto de Código Abierto.'
        }
    },
    'Français': {
        nav: {
            features: 'Fonctionnalités',
            templates: 'Modèles',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Langue Site et CV:',
            titleStart: 'Transformez votre profil LinkedIn en un',
            titleHighlight: 'CV Professionnel',
            subtitle: 'Arrêtez de vous battre avec le formatage. Téléchargez votre PDF LinkedIn et laissez notre IA créer un CV époustouflant et optimisé ATS en quelques secondes.',
            uploadTitle: 'Télécharger PDF LinkedIn',
            uploadDesc: 'Glisser-déposer ou cliquer pour parcourir',
            uploadButton: 'Générer CV',
            noSignup: 'Pas d\'inscription • Gratuit • Confidentialité'
        },
        features: {
            aiTitle: 'Extraction par IA',
            aiDesc: 'Nous utilisons l\'IA Google Gemini pour analyser intelligemment les descriptions de poste et les optimiser.',
            templatesTitle: 'Modèles Professionnels',
            templatesDesc: 'Choisissez parmi 4 modèles soignés qui gèrent automatiquement les sauts de page et la mise en page.',
            smartTitle: 'Optimisation Intelligente',
            smartDesc: 'Classe automatiquement les compétences, traduit le contenu et formate l\'expérience avec la méthode STAR.'
        },
        templates: {
            title: 'Designs Époustouflants',
            subtitle: 'Choisissez parmi une variété de mises en page professionnelles',
            preview: 'Aperçu',
            t1Style: 'Barre Latérale Foncée Gauche',
            t2Style: 'Barre Latérale Bleue Droite',
            t3Style: 'En-tête et Barre Bleus',
            t4Style: 'En-tête Noir et Chronologie'
        },
        editor: {
            badge: 'ÉDITEUR',
            backToHome: 'Retour à l\'Accueil',
            exportPdf: 'Exporter PDF',
            sourceFile: 'Fichier Source',
            changePdf: 'Changer PDF',
            cvLanguage: 'Langue du CV',
            profilePhoto: 'Photo de Profil',
            changePhoto: 'Changer Photo',
            uploadPhoto: 'Télécharger Photo',
            template: 'Modèle',
            editContent: 'Modifier Contenu',
            analyzing: 'Analyse du Profil...',
            analyzingSub: 'L\'IA Gemini crée votre nouveau CV',
            loading: 'Chargement...',
            error: 'Échec du traitement du PDF. Réessayez.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Projet Open Source.'
        }
    },
    'Deutsch': {
        nav: {
            features: 'Funktionen',
            templates: 'Vorlagen',
            github: 'GitHub'
        },
        hero: {
            languageLabel: 'Sprache:',
            titleStart: 'Verwandeln Sie Ihr LinkedIn-Profil in einen',
            titleHighlight: 'Professionellen CV',
            subtitle: 'Schluss mit Formatierungskämpfen. Laden Sie Ihr LinkedIn-PDF hoch und lassen Sie unsere KI in Sekunden einen atemberaubenden Lebenslauf erstellen.',
            uploadTitle: 'LinkedIn PDF Hochladen',
            uploadDesc: 'Drag & Drop oder Klicken zum Durchsuchen',
            uploadButton: 'Lebenslauf Erstellen',
            noSignup: 'Keine Anmeldung • Kostenlos • Datenschutz'
        },
        features: {
            aiTitle: 'KI-Extraktion',
            aiDesc: 'Wir nutzen Google Gemini AI, um Jobbeschreibungen intelligent zu analysieren und für Klarheit zu optimieren.',
            templatesTitle: 'Profi-Vorlagen',
            templatesDesc: 'Wählen Sie aus 4 polierten Vorlagen, die Seitenumbrüche und Layout automatisch perfekt handhaben.',
            smartTitle: 'Smarte Optimierung',
            smartDesc: 'Ordnet Fähigkeiten automatisch, übersetzt Inhalte und formatiert Erfahrungen mit der STAR-Methode.'
        },
        templates: {
            title: 'Tolle Designs',
            subtitle: 'Wählen Sie aus verschiedenen professionellen Layouts',
            preview: 'Vorschau',
            t1Style: 'Dunkle Seitenleiste Links',
            t2Style: 'Blaue Seitenleiste Rechts',
            t3Style: 'Blauer Header & Leiste',
            t4Style: 'Schwarzer Header & Timeline'
        },
        editor: {
            badge: 'EDITOR',
            backToHome: 'Zurück zur Startseite',
            exportPdf: 'PDF Exportieren',
            sourceFile: 'Quelldatei',
            changePdf: 'PDF Ändern',
            cvLanguage: 'CV Sprache',
            profilePhoto: 'Profilfoto',
            changePhoto: 'Foto Ändern',
            uploadPhoto: 'Foto Hochladen',
            template: 'Vorlage',
            editContent: 'Inhalt Bearbeiten',
            analyzing: 'Profil wird analysiert...',
            analyzingSub: 'Gemini AI erstellt Ihren neuen CV',
            loading: 'Laden...',
            error: 'Fehler beim Verarbeiten. Bitte erneut versuchen.'
        },
        footer: {
            rights: '© 2026 CVArchitect. Open Source Projekt.'
        }
    }
};
