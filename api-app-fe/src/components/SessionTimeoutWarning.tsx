'use client';

import { useState, useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface SessionTimeoutWarningProps {
  show: boolean;
  onExtendSession: () => void;
  onClose: () => void;
}

export const SessionTimeoutWarning = ({ show, onExtendSession, onClose }: SessionTimeoutWarningProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log('Warning visibility changed:', show);
    setIsVisible(show);
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative">
        {/* Shiny outline */}
        <div className="absolute -inset-[2px] bg-gradient-to-r from-rose-400 via-purple-500 to-rose-400 rounded-[24px] opacity-70 blur-sm animate-pulse"></div>
        <div className="absolute -inset-[1px] bg-gradient-to-r from-rose-400 via-purple-500 to-rose-400 rounded-[24px] opacity-50 blur-sm animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main content */}
        <div 
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-modalSlideIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 bg-gradient-to-r from-rose-300 to-purple-400 rounded-xl">
                <ExclamationTriangleIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Session Timeout Warning
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-2 text-center">
              <p className="text-gray-600">
                Your session will expire in 1 minute.
              </p>
              <p className="text-gray-600">
                Would you like to extend it?
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-center">
            <button
              onClick={() => {
                console.log('Extending session...');
                onExtendSession();
                setIsVisible(false);
              }}
              className="px-8 py-2.5 bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 font-medium shadow-md hover:shadow-lg"
            >
              Extend Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 