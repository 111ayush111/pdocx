
import React, { useRef } from 'react';

interface ControlPanelProps {
    setName: string;
    onSetNameChange: (name: string) => void;
    onAddScreenshot: (file: File) => void;
    onNewSet: () => void;
    onExportPdf: () => void;
    onExportDocx: () => void;
    screenshotCount: number;
    isExportDisabled: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    setName,
    onSetNameChange,
    onAddScreenshot,
    onNewSet,
    onExportPdf,
    onExportDocx,
    screenshotCount,
    isExportDisabled
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onAddScreenshot(event.target.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="bg-base-100 p-4 rounded-xl shadow-lg mb-8 sticky top-4 z-10 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-1">
                     <label htmlFor="setName" className="block text-sm font-medium text-gray-700 mb-1">Set Name</label>
                    <input
                        id="setName"
                        type="text"
                        value={setName}
                        onChange={(e) => onSetNameChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="e.g., Project-Alpha-Flow"
                    />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-2 justify-start md:justify-end items-center">
                    <button onClick={onNewSet} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                        New Set
                    </button>
                    
                    <button onClick={triggerFileInput} className="px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-blue-600 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-colors">
                        Add Screenshot ({screenshotCount})
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />

                    <button onClick={onExportPdf} disabled={isExportDisabled} className="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-blue-800 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        Export PDF
                    </button>

                     <button onClick={onExportDocx} disabled={isExportDisabled} className="px-4 py-2 text-sm font-medium text-white bg-secondary hover:bg-blue-800 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        Export DOCX
                    </button>
                </div>
            </div>
        </div>
    );
};
