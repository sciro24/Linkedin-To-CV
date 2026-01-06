'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image as ImageIcon, X } from 'lucide-react';

interface FileDropzoneProps {
    onFileSelect: (file: File) => void;
    accept: Record<string, string[]>;
    label: string;
    icon?: React.ReactNode;
    selectedFile?: File | null;
    onClear?: () => void;
}

export default function FileDropzone({ onFileSelect, accept, label, icon, selectedFile, onClear }: FileDropzoneProps) {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple: false
    });

    if (selectedFile) {
        return (
            <div className="flex items-center justify-between p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                    {icon || <FileText className="w-6 h-6 text-green-600" />}
                    <div>
                        <p className="text-sm font-medium text-green-900">{selectedFile.name}</p>
                        <p className="text-xs text-green-700">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                </div>
                {onClear && (
                    <button onClick={(e) => { e.stopPropagation(); onClear(); }} className="p-1 hover:bg-green-100 rounded-full">
                        <X className="w-4 h-4 text-green-700" />
                    </button>
                )}
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
                {icon || <Upload className="w-8 h-8 text-gray-400" />}
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-xs text-gray-500">Drag & drop or click to select</p>
            </div>
        </div>
    );
}
