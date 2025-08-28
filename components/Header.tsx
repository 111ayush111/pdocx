
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-primary shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <h1 className="text-2xl font-bold text-white tracking-wide">
                    Screenshot Flow Manager
                </h1>
            </div>
        </header>
    );
};
