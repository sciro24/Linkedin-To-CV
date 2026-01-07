'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import ResumeRenderer from '@/components/ResumeRenderer';
import { ResumeData } from '@/types/resume';
import { FileText, Image as ImageIcon, Sparkles, Check, Download, Edit3, Linkedin, Star, Cpu, Layout, RefreshCw, FileCheck, Globe, Component } from 'lucide-react';
import { SkeletonLoader } from '@/components/SkeletonLoader';
import { templates } from '@/components/TemplateRegistry';
import { SectionEditor } from '@/components/SectionEditor';
import { Language, siteTranslations } from '@/utils/translations';
import { ImageCropperModal } from '@/components/ImageCropperModal';

const LANGUAGES: Language[] = ['Italiano', 'English', 'Español', 'Français', 'Deutsch'];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);

  // Cropper State
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [templateId, setTemplateId] = useState<string>('template1');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('Italiano');

  // Translations wrapper
  const t = siteTranslations[selectedLanguage];

  // New State for "Landing View" vs "Editor View"
  const isEditorMode = !!resumeData || isAnalyzing;

  const handlePdfSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
    // Auto-start generation if on landing page
    if (!isEditorMode) {
      handleGenerateValues(undefined, selectedFile);
    }
  };

  const handleImageSelect = (selectedFile: File) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setTempImageSrc(reader.result?.toString() || null);
        setIsCropperOpen(true);
      });
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCropComplete = (croppedBlob: Blob) => {
    // Convert Blob to File
    const croppedFile = new File([croppedBlob], "profile_photo.jpg", { type: "image/jpeg" });
    setProfileImage(croppedFile);

    // Create URL for preview
    const url = URL.createObjectURL(croppedBlob);
    setProfileImageUrl(url);

    // Close modal
    setIsCropperOpen(false);
    setTempImageSrc(null);
  };

  const handleGenerateValues = async (languageOverride?: Language, fileOverride?: File) => {
    const fileToUse = fileOverride || file;
    if (!fileToUse) return;

    setIsAnalyzing(true);
    setError(null);
    setResumeData(null);

    const formData = new FormData();
    formData.append('file', fileToUse);
    formData.append('language', languageOverride || selectedLanguage);

    try {
      const response = await fetch('/api/parse-cv', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }

      const data: ResumeData = await response.json();
      setResumeData(data);
      if (fileOverride) setFile(fileOverride);
    } catch (err) {
      console.error(err);
      setError(t.editor.error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
    setIsAnalyzing(false);
  };

  const Logo = () => (
    <div className="flex items-center gap-2">
      <div className="bg-gray-900 text-white p-2 rounded-lg shadow-md">
        <Component size={20} strokeWidth={2.5} />
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        CV<span className="text-gray-500">Architect</span>
      </span>
    </div>
  );

  // Landing Page View
  if (!isEditorMode) {
    return (
      <div className="min-h-screen font-sans bg-[#FAFAFA] text-gray-900 relative">

        {/* Cropper Modal */}
        {isCropperOpen && tempImageSrc && (
          <ImageCropperModal
            imageSrc={tempImageSrc}
            onCancel={() => { setIsCropperOpen(false); setTempImageSrc(null); }}
            onCropComplete={handleCropComplete}
          />
        )}

        {/* Technical Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#E5E7EB 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
                {t.nav.features}
              </a>
              <a href="#templates" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
                {t.nav.templates}
              </a>
              <a href="https://github.com/sciro24/Linkedin-To-CV" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-opacity hover:opacity-70">
                <Star size={16} className="text-gray-900 fill-gray-900" />
                <span className="text-sm font-semibold text-gray-900">{t.nav.github}</span>
              </a>
            </div>
          </div>
        </nav>

        <section className="pt-32 pb-24 px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">

            <div className="inline-flex items-center gap-2 p-1.5 pr-4 rounded-md bg-white border border-gray-200 shadow-sm mb-10 animate-fade-in-up">
              <div className="bg-gray-100 text-gray-600 p-1 rounded-sm">
                <Globe size={14} />
              </div>
              <span className="text-xs font-semibold text-gray-500 mr-2 ml-1 uppercase tracking-wider">{t.hero.languageLabel}</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="bg-transparent text-sm font-bold text-gray-900 focus:outline-none cursor-pointer hover:text-gray-600 transition-colors"
                title="Select Language"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tighter mb-8 leading-none">
              {t.hero.titleStart} <br /> <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              {t.hero.subtitle}
            </p>

            <div className="bg-white p-2 rounded-xl shadow-xl shadow-gray-200/50 max-w-lg mx-auto border border-gray-100">
              <div className="border border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50/50 hover:border-gray-400 transition-all cursor-pointer group relative bg-gray-50/30">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    if (e.target.files?.[0]) handlePdfSelect(e.target.files[0]);
                  }}
                  accept=".pdf"
                />
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm group-hover:scale-105 transition-transform text-[#0077b5]">
                    <Linkedin size={36} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{t.hero.uploadTitle}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t.hero.uploadDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-400 font-mono uppercase tracking-widest flex items-center justify-center gap-2">
              <Check size={12} className="text-green-500" />
              {t.hero.noSignup}
            </p>
          </div>
        </section>

        <section id="features" className="py-24 border-y border-gray-200 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: <Cpu size={24} />,
                  title: t.features.aiTitle,
                  desc: t.features.aiDesc,
                },
                {
                  icon: <Layout size={24} />,
                  title: t.features.templatesTitle,
                  desc: t.features.templatesDesc,
                },
                {
                  icon: <RefreshCw size={24} />,
                  title: t.features.smartTitle,
                  desc: t.features.smartDesc,
                }
              ].map((f, i) => (
                <div key={i} className="group">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-6 text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="templates" className="py-24 px-6 relative z-10 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.templates.title}</h2>
                <p className="text-gray-500 max-w-md">{t.templates.subtitle}</p>
              </div>
              <div className="text-sm font-mono text-gray-400">01 — 04</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Template 1 Mini-Preview */}
              <div className="group relative bg-white border border-gray-200 transition-all hover:border-gray-400 hover:shadow-lg aspect-[1/1.4]">
                <div className="absolute inset-0 flex pointer-events-none p-4">
                  <div className="w-full h-full border border-gray-100 flex shadow-sm">
                    <div className="w-[30%] bg-[#333] h-full flex flex-col gap-1 p-1 pt-3 items-center">
                      <div className="w-4 h-4 rounded-full bg-white/20 mb-1"></div>
                      <div className="w-full h-0.5 bg-white/20"></div>
                      <div className="w-full h-0.5 bg-white/20"></div>
                    </div>
                    <div className="flex-1 p-2 pt-3 flex flex-col gap-2">
                      <div className="w-1/2 h-1.5 bg-gray-200 mb-1"></div>
                      <div className="w-full h-8 bg-gray-50 border border-gray-100"></div>
                      <div className="w-full h-8 bg-gray-50 border border-gray-100"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">{templates[0].name}</h3>
                </div>
              </div>

              {/* Template 2 Mini-Preview */}
              <div className="group relative bg-white border border-gray-200 transition-all hover:border-gray-400 hover:shadow-lg aspect-[1/1.4]">
                <div className="absolute inset-0 flex pointer-events-none p-4">
                  <div className="w-full h-full border border-gray-100 flex shadow-sm">
                    <div className="flex-1 p-2 pt-3 flex flex-col gap-2">
                      <div className="w-1/2 h-1.5 bg-gray-200 mb-1"></div>
                      <div className="w-full h-8 bg-gray-50 border border-gray-100"></div>
                      <div className="w-full h-8 bg-gray-50 border border-gray-100"></div>
                    </div>
                    <div className="w-[35%] bg-[#1a2b3c] h-full flex flex-col gap-1 p-1 pt-3 items-center">
                      <div className="w-5 h-5 rounded-full bg-white/20 mb-1 border border-white/50"></div>
                      <div className="w-full h-0.5 bg-white/20"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">{templates[1].name}</h3>
                </div>
              </div>

              {/* Template 3 Mini-Preview */}
              <div className="group relative bg-white border border-gray-200 transition-all hover:border-gray-400 hover:shadow-lg aspect-[1/1.4]">
                <div className="absolute inset-0 flex pointer-events-none p-4">
                  <div className="w-full h-full border border-gray-100 flex flex-col shadow-sm">
                    <div className="h-[20%] bg-[#B8D4E8] w-full"></div>
                    <div className="flex-1 flex">
                      <div className="w-[30%] bg-[#C5D9E6] h-full"></div>
                      <div className="flex-1 bg-white"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">{templates[2].name}</h3>
                </div>
              </div>

              {/* Template 4 Mini-Preview */}
              <div className="group relative bg-white border border-gray-200 transition-all hover:border-gray-400 hover:shadow-lg aspect-[1/1.4]">
                <div className="absolute inset-0 flex pointer-events-none p-4">
                  <div className="w-full h-full border border-gray-100 flex shadow-sm">
                    <div className="w-[35%] bg-gray-100 h-full"></div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-[25%] bg-[#1F2937] w-full"></div>
                      <div className="flex-1 bg-white"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wide">{templates[3].name}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-12 px-6 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo />
            <p className="text-xs text-gray-400 font-mono">{t.footer.rights}</p>
          </div>
        </footer>
      </div>
    );
  }

  // --- EDITOR VIEW (Clean & Technical) ---
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 h-screen overflow-hidden">

      {/* Cropper Modal for Editor View */}
      {isCropperOpen && tempImageSrc && (
        <ImageCropperModal
          imageSrc={tempImageSrc}
          onCancel={() => { setIsCropperOpen(false); setTempImageSrc(null); }}
          onCropComplete={handleCropComplete}
        />
      )}

      {/* Editor Header */}
      <header className="bg-white border-b border-gray-200 py-0 px-6 flex justify-between items-center z-30 shadow-none flex-shrink-0 h-14">
        <div className="flex items-center gap-4 cursor-pointer" onClick={reset}>
          <div className="bg-gray-900 text-white p-1 rounded">
            <Component size={16} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">
            CV<span className="text-gray-500">Architect</span>
          </span>
          <span className="text-[10px] text-gray-400 px-2 py-0.5 rounded-full border border-gray-200 font-mono">{t.editor.badge}</span>
        </div>

        <div className="flex items-center gap-3">
          {resumeData && !isAnalyzing && (
            <button
              onClick={reset}
              className="px-4 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {t.editor.backToHome}
            </button>
          )}
          {resumeData && (
            <button className="hidden sm:flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-gray-800 transition-colors shadow-sm">
              <Download size={14} />
              <span>{t.editor.exportPdf}</span>
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#FAFAFA]">
        {/* Left Sidebar: Controls */}
        <aside className="w-full lg:w-[350px] bg-white border-r border-gray-200 flex flex-col z-20 h-full">
          <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
            {/* Upload / Re-upload Section */}
            <div className="mb-8">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                {t.editor.sourceFile}
              </h3>
              {file ? (
                <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-center justify-between group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-white border border-gray-200 p-2 rounded text-gray-600 flex-shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">{file.name}</p>
                      <p className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 p-1">
                    <RefreshCw size={14} />
                  </button>
                </div>
              ) : (
                <FileDropzone
                  onFileSelect={handlePdfSelect}
                  accept={{ 'application/pdf': ['.pdf'] }}
                  label={t.editor.changePdf}
                  selectedFile={file}
                />
              )}

              {/* Language Config */}
              <div className="mt-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{t.editor.cvLanguage}</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    const newLang = e.target.value as Language;
                    setSelectedLanguage(newLang);
                    if (file && resumeData && !isAnalyzing) {
                      requestAnimationFrame(() => handleGenerateValues(newLang));
                    }
                  }}
                  className="w-full p-2 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-gray-900 bg-white font-medium text-gray-700 outline-none"
                  disabled={isAnalyzing}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Photo */}
              <div className="mt-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{t.editor.profilePhoto}</label>
                <div className="flex items-center gap-3">
                  {profileImageUrl ? (
                    <div className="relative group">
                      <img src={profileImageUrl} className="w-10 h-10 rounded object-cover border border-gray-200 shadow-sm" />
                      <button
                        onClick={() => { setProfileImage(null); setProfileImageUrl(undefined); }}
                        className="absolute -top-1 -right-1 bg-gray-900 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer" onClick={() => document.getElementById('photo-upload')?.click()}>
                      <ImageIcon size={14} />
                    </div>
                  )}
                  <div className="flex-1">
                    <input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) handleImageSelect(e.target.files[0]) }} />
                    <button onClick={() => document.getElementById('photo-upload')?.click()} className="text-[10px] border border-gray-200 px-2 py-1 rounded hover:bg-gray-50 text-gray-600 font-medium">
                      {profileImageUrl ? t.editor.changePhoto : t.editor.uploadPhoto}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Template Selector */}
            <div className="mb-8 border-t border-gray-100 pt-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                {t.editor.template}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {templates.map((tmpl, index) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setTemplateId(tmpl.id)}
                    className={`relative p-1.5 rounded border text-left transition-all
                                  ${templateId === tmpl.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span className="font-bold text-[10px] block leading-tight">{tmpl.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Editor */}
            {resumeData && (
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  {t.editor.editContent}
                </h3>
                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                  <SectionEditor data={resumeData} onUpdate={(newData) => setResumeData(newData)} />
                </div>

                {/* Generate Button if analyzing */}
                {(isAnalyzing || !resumeData) && (
                  <div className="mt-4">
                    <SkeletonLoader />
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded text-xs border border-red-100 font-medium">
                {error}
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Preview */}
        <div className="flex-1 bg-[#F5F5F7] relative h-full overflow-hidden flex flex-col p-4">
          {/* Grid Background in Preview Area for technical feel */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{
            backgroundImage: 'radial-gradient(#C5C7CB 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>

          <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.08)] h-full overflow-hidden w-full max-w-[210mm] mx-auto z-10">
            {isAnalyzing ? (
              <div className="h-full w-full flex flex-col items-center justify-center bg-white p-10">
                <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{t.editor.analyzing}</h3>
                <p className="text-xs text-gray-500 mt-2 font-mono">{t.editor.analyzingSub}</p>
              </div>
            ) : resumeData ? (
              <ResumeRenderer
                data={resumeData}
                templateId={templateId}
                profileImage={profileImageUrl}
                language={selectedLanguage as any}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-300 font-mono text-xs uppercase tracking-widest">
                {t.editor.loading}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
