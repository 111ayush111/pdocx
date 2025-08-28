import React from 'react';
import { Screenshot } from '../types';
import { ScreenshotCard } from './ScreenshotCard';

interface ScreenshotGridProps {
    screenshots: Screenshot[];
    onDelete: (id: string) => void;
    onRunOcr: (id: string) => Promise<void>;
    ocrLoadingId: string | null;
}

export const ScreenshotGrid: React.FC<ScreenshotGridProps> = ({ screenshots, onDelete, onRunOcr, ocrLoadingId }) => {
    if (screenshots.length === 0) {
        return (
            <div className="text-center py-16 px-4 border-2 border-dashed border-gray-300 rounded-xl bg-base-100">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Image Added</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Click "Add Image" to start building your set.
                </p>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {screenshots.map((screenshot, index) => (
                <ScreenshotCard
                    key={screenshot.id}
                    screenshot={screenshot}
                    index={index}
                    onDelete={onDelete}
                    onRunOcr={onRunOcr}
                    isOcrLoading={ocrLoadingId === screenshot.id}
                />
            ))}
        </div>
    );
};
