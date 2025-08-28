import React from 'react';

const FloatingDogIcon: React.FC = () => {
    return (
        <div className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12">
            <img 
                src="https://via.placeholder.com/150" 
                alt="Dog Icon" 
                className="w-12 h-12 transition-transform duration-300 transform hover:scale-110" 
                aria-label="Floating Dog Icon"
            />
        </div>
    );
};

export default FloatingDogIcon;
