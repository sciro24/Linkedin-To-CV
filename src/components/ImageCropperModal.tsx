'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import getCroppedImg from '@/utils/canvasUtils';

interface ImageCropperModalProps {
    imageSrc: string;
    onCancel: () => void;
    onCropComplete: (croppedBlob: Blob) => void;
}

export const ImageCropperModal: React.FC<ImageCropperModalProps> = ({ imageSrc, onCancel, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleSave = async () => {
        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
            if (croppedImage) {
                onCropComplete(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col h-[600px] md:h-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white text-gray-900">
                    <h3 className="font-bold text-lg">Edit Photo</h3>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-900">
                        <X size={20} />
                    </button>
                </div>

                {/* Cropper Area */}
                <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={setZoom}
                        cropShape="round"
                        showGrid={false}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 space-y-6">
                    {/* Zoom Control */}
                    <div className="flex items-center gap-4">
                        <ZoomOut size={16} className="text-gray-400" />
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-900"
                        />
                        <ZoomIn size={16} className="text-gray-400" />
                    </div>

                    {/* Rotate (optional but nice) */}
                    {/* 
           <div className="flex justify-center">
             <button onClick={() => setRotation(r => r + 90)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
               <RotateCw size={16} /> Rotate
             </button>
           </div>
           */}

                    {/* Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-lg shadow-sm flex items-center gap-2 transition-all hover:scale-105"
                        >
                            <Check size={16} />
                            Save Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
