import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { Screenshot } from './types';
import { ControlPanel } from './components/ControlPanel';
import { ScreenshotGrid } from './components/ScreenshotGrid';
import { Header } from './components/Header';
import { extractTextFromImage } from './services/geminiService';
import { useExport } from './hooks/useExport';

const App: React.FC = () => {
    const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
    const [setName, setSetName] = useState<string>('My-Screenshot-Set');
    const [globalLoading, setGlobalLoading] = useState<string | null>(null);
    const [ocrLoading, setOcrLoading] = useState<string | null>(null);

    const { generatePdf, generateDocx } = useExport();

    const handleAddScreenshot = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const newScreenshot: Screenshot = {
                id: `${file.name}-${Date.now()}`,
                file: file,
                imageDataUrl: e.target?.result as string,
                ocrText: '',
            };
            setScreenshots(prev => [...prev, newScreenshot]);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteScreenshot = useCallback((id: string) => {
        setScreenshots(prev => prev.filter(s => s.id !== id));
    }, []);

    const handleRunOcr = useCallback(async (id: string) => {
        const screenshot = screenshots.find(s => s.id === id);
        if (!screenshot) return;

        setOcrLoading(id);
        try {
            const text = await extractTextFromImage(screenshot.file);
            setScreenshots(prev => prev.map(s => s.id === id ? { ...s, ocrText: text } : s));
        } catch (error) {
            console.error("OCR failed:", error);
            alert(`Failed to extract text from the image. Please check the console for details and ensure your API key in 'services/geminiService.ts' is valid.`);
        } finally {
            setOcrLoading(null);
        }
    }, [screenshots]);
    
    const handleNewSet = () => {
        setScreenshots([]);
        const defaultName = `My-Screenshot-Set-${new Date().toISOString().slice(0,10)}`;
        const newName = prompt("Enter a name for your new set:", defaultName);
        setSetName(newName || defaultName);
    };

    const handleExportPdf = async () => {
        if (screenshots.length === 0) {
            alert("Please add screenshots before exporting.");
            return;
        }
        setGlobalLoading("Generating PDF...");
        await generatePdf(screenshots, setName);
        setGlobalLoading(null);
    };

    const handleExportDocx = async () => {
        if (screenshots.length === 0) {
            alert("Please add screenshots before exporting.");
            return;
        }
        setGlobalLoading("Generating DOCX...");
        await generateDocx(screenshots, setName);
        setGlobalLoading(null);
    };


    return (
        <div className="min-h-screen bg-neutral text-gray-800 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <ControlPanel
                    setName={setName}
                    onSetNameChange={setSetName}
                    onAddScreenshot={handleAddScreenshot}
                    onNewSet={handleNewSet}
                    onExportPdf={handleExportPdf}
                    onExportDocx={handleExportDocx}
                    screenshotCount={screenshots.length}
                    isExportDisabled={screenshots.length === 0 || !!globalLoading}
                />
                
                <ScreenshotGrid
                    screenshots={screenshots}
                    onDelete={handleDeleteScreenshot}
                    onRunOcr={handleRunOcr}
                    ocrLoadingId={ocrLoading}
                />
            </main>
            {globalLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl flex items-center space-x-4">
                        <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg font-medium">{globalLoading}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Mount the application ---
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
