
import React, { useState } from 'react';

interface ApiKeyInputProps {
    apiKey: string;
    onApiKeyChange: (key: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onApiKeyChange }) => {
    const [localApiKey, setLocalApiKey] = useState(apiKey);

    const handleSave = () => {
        onApiKeyChange(localApiKey);
        alert('API Key saved! Your key is stored in your browser for future use.');
    };
    
    return (
        <div className="bg-blue-50 border-l-4 border-accent text-primary p-4 rounded-lg shadow-md mb-8" role="alert">
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="ml-3 flex-1">
                    <p className="font-bold text-lg mb-1">Gemini API Key Required</p>
                    <p className="text-sm mb-3 text-gray-700">
                        To use the OCR feature, you need a Gemini API key. You can get a key from {' '}
                        <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-secondary">
                            Google AI Studio
                        </a>. 
                        Your key is saved locally in your browser and is not sent to any servers besides Google's.
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <input
                            type="password"
                            value={localApiKey}
                            onChange={(e) => setLocalApiKey(e.target.value)}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            placeholder="Enter your Gemini API Key"
                            aria-label="Gemini API Key Input"
                        />
                        <button 
                            onClick={handleSave}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-secondary border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            aria-label="Save API Key"
                        >
                            Save Key
                        </button>
                    </div>
                    {apiKey && (
                         <p className="text-sm mt-2 text-green-700 font-semibold">✓ API Key is set and saved.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
