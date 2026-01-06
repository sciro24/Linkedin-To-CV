'use client';

import React, { useState } from 'react';
import FileDropzone from '@/components/FileDropzone';
import ResumeRenderer from '@/components/ResumeRenderer';
import { ResumeData } from '@/types/resume';
import { FileText, Loader2, Image as ImageIcon } from 'lucide-react';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);

  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<'minimal' | 'modern'>('minimal');

  const handlePdfSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleImageSelect = (selectedFile: File) => {
    setProfileImage(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setProfileImageUrl(url);
  };

  const handleGenerateValues = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

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
    } catch (err) {
      console.error(err);
      setError('Failed to process the PDF. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
    // Keep profile image if they want? Or reset? Let's reset for full clear.
    // Actually, maybe keep it. But let's simple reset.
    // URL.revokeObjectURL(profileImageUrl!); // Cleanup memory
    // setProfileImage(null);
    // setProfileImageUrl(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          LinkedIn to CV Converter
        </h1>
        {resumeData && (
          <button onClick={reset} className="text-sm text-gray-500 hover:text-red-500">
            Start Over
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* Left Sidebar: Controls & Upload */}
        <aside className={`w-full lg:w-96 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto z-10 
          ${resumeData ? 'block' : 'mx-auto max-w-2xl lg:w-full lg:max-w-none lg:border-none lg:bg-transparent lg:justify-center'}`}
        >
          {!resumeData ? (
            <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold mb-2">Create your CV in seconds</h2>
                <p className="text-gray-500">Upload your LinkedIn PDF and let AI do the magic.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">1. Upload LinkedIn PDF</label>
                  <FileDropzone
                    onFileSelect={handlePdfSelect}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    label="Drop LinkedIn PDF here"
                    selectedFile={file}
                    onClear={() => setFile(null)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">2. Profile Photo (Optional)</label>
                  <FileDropzone
                    onFileSelect={handleImageSelect}
                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                    label="Drop Profile Photo here"
                    icon={<ImageIcon className="w-8 h-8 text-gray-400" />}
                    selectedFile={profileImage}
                    onClear={() => {
                      setProfileImage(null);
                      setProfileImageUrl(undefined);
                    }}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateValues}
                disabled={!file || isAnalyzing}
                className={`w-full py-3 rounded-lg font-semibold text-white flex justify-center items-center gap-2 transition-all
                   ${!file || isAnalyzing ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'}`}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  'Generate CV'
                )}
              </button>

              {error && (
                <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                  {error}
                </div>
              )}
            </div>
          ) : (
            // Sidebar Controls when CV is generated
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Template</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setTemplateId('minimal')}
                    className={`p-4 rounded border text-left transition ${templateId === 'minimal' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="font-bold block mb-1">Minimal</span>
                    <span className="text-xs text-gray-500">Clean & Simple</span>
                  </button>
                  <button
                    onClick={() => setTemplateId('modern')}
                    className={`p-4 rounded border text-left transition ${templateId === 'modern' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <span className="font-bold block mb-1">Modern</span>
                    <span className="text-xs text-gray-500">Visual & Bold</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold">Files</h3>
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className="text-sm truncate flex-1">{file?.name}</span>
                </div>
                {profileImage && (
                  <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded">
                    <ImageIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm truncate flex-1">{profileImage.name}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Right Area: Preview */}
        {resumeData && (
          <div className="flex-1 bg-gray-100 relative h-full">
            <ResumeRenderer
              data={resumeData}
              templateId={templateId}
              profileImage={profileImageUrl}
            />
          </div>
        )}
      </main>
    </div>
  );
}
