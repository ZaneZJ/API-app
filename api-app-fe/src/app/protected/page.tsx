'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateApiKey } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { ToastNotification } from '@/components/ToastNotification';
import { useToast } from '@/hooks/useToast';
import { BeakerIcon, CommandLineIcon, CubeTransparentIcon, EyeIcon, ClipboardIcon } from '@heroicons/react/24/outline';

export default function ProtectedPage() {
  const [isValidating, setIsValidating] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();
  const { toast, showToast } = useToast();

  useEffect(() => {
    const validateAndRedirect = async () => {
      const storedApiKey = localStorage.getItem('apiKey');
      
      if (!storedApiKey) {
        router.push('/playground');
        return;
      }

      setApiKey(storedApiKey);

      try {
        const isValid = await validateApiKey(storedApiKey);
        if (!isValid) {
          showToast('Invalid API key. Please try again.', 'error');
          localStorage.removeItem('apiKey');
          router.push('/playground');
        }
      } catch (error) {
        showToast('An error occurred while validating the API key.', 'error');
        localStorage.removeItem('apiKey');
        router.push('/playground');
      } finally {
        setIsValidating(false);
      }
    };

    validateAndRedirect();
  }, [router]);

  useEffect(() => {
    if (!isValidating && apiKey) {
      showToast('API key validated successfully!', 'success');
    }
  }, [isValidating]);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      showToast('API key copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy API key to clipboard', 'error');
    }
  };

  if (isValidating) {
    return (
      <DashboardLayout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6 p-8 bg-white rounded-2xl shadow-sm">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-rose-300 to-purple-400 p-6 rounded-full">
                <BeakerIcon className="w-12 h-12 text-white animate-bounce" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Validating API Key
              </h2>
              <p className="text-gray-600">Please wait while we verify your credentials...</p>
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-[80vh] flex flex-col">
        <ToastNotification toast={toast} />
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 p-8">
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-3 rounded-xl mb-6 transform transition-transform hover:scale-110">
                <BeakerIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Protected API Playground
              </h1>
              <p className="mt-2 text-gray-600 text-center">
                Your API key has been validated successfully!
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* API Console */}
          <div className="bg-white rounded-2xl shadow-sm p-6 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-2 rounded-lg">
                <CommandLineIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">API Console</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Test your API endpoints with our interactive console. Send requests and view responses in real-time.
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-[1.02] active:scale-98">
              Open Console
            </button>
          </div>

          {/* API Documentation */}
          <div className="bg-white rounded-2xl shadow-sm p-6 transform transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-2 rounded-lg">
                <CubeTransparentIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">API Documentation</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Explore our comprehensive API documentation with examples and best practices.
            </p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-[1.02] active:scale-98">
              View Docs
            </button>
          </div>
        </div>

        {/* API Key Info */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800">Your API Key</h3>
            <div className="flex items-center gap-4">
              <code className="flex-1 px-4 py-2 bg-gray-50 rounded-lg font-mono text-sm overflow-x-auto">
                {showApiKey ? apiKey : '••••••••••••••••'}
              </code>
              <button 
                onClick={() => setShowApiKey(!showApiKey)}
                className={`p-1.5 transition-all hover:scale-110 hover:bg-gray-100 rounded-full ${
                  showApiKey ? 'text-purple-500 hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'
                }`}
                title={showApiKey ? "Hide" : "View"}
              >
                <EyeIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={handleCopyClick}
                className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
                title="Copy"
              >
                <ClipboardIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 