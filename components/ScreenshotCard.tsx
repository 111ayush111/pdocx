
import React from 'react';
import { Screenshot } from '../types';

interface ScreenshotCardProps {
    screenshot: Screenshot;
    index: number;
    onDelete: (id: string) => void;
    onRunOcr: (id: string) => Promise<void>;
    isOcrLoading: boolean;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({ screenshot, index, onDelete, onRunOcr, isOcrLoading }) => {
    return (
        <div className="bg-base-100 rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-primary">
            <div className="relative">
                <img src={screenshot.imageDataUrl} alt={`Screenshot ${index + 1}`} className="w-full h-40 object-cover" />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">{index + 1}</span>
                <button onClick={() => onDelete(screenshot.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <div className="h-24 overflow-y-auto bg-gray-50 p-2 rounded-md border text-sm text-gray-600 mb-3">
                    {screenshot.ocrText ? (
                        <p className="whitespace-pre-wrap">{screenshot.ocrText}</p>
                    ) : (
                        <p className="text-gray-400 italic">Run OCR to extract text...</p>
                    )}
                </div>
                <button
                    onClick={() => onRunOcr(screenshot.id)}
                    disabled={isOcrLoading}
                    className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-blue-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:bg-gray-400 disabled:cursor-wait transition-colors"
                >
                    {isOcrLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : 'Run OCR with Gemini'}
                </button>
            </div>
        </div>
    );
};
