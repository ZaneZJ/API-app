'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateApiKey } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';
import { ToastNotification } from '@/components/ToastNotification';
import { useToast } from '@/hooks/useToast';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast, showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isValid = await validateApiKey(apiKey);
      if (isValid) {
        localStorage.setItem('apiKey', apiKey);
        showToast('API key validated successfully!', 'success');
        router.push('/protected');
      } else {
        showToast('Invalid API key. Please try again.', 'error');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while validating the API key.';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ToastNotification toast={toast} />
      
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md transform transition-all">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-rose-100 via-purple-100 to-blue-100 p-8">
              <div className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-3 rounded-xl mb-6 transform transition-transform hover:scale-110">
                  <CodeBracketIcon className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                  API Playground
                </h1>
                <p className="mt-2 text-gray-600 text-center">
                  Enter your API key to access the playground
                </p>
              </div>
            </div>

            {/* Form section */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                    API Key
                  </label>
                  <div className="relative group">
                    {/* Animated gradient border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-400 rounded-lg opacity-30 group-hover:opacity-100 transition duration-500"></div>
                    <input
                      id="apiKey"
                      name="apiKey"
                      type="text"
                      required
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="relative w-full px-4 py-3 bg-white border-2 border-transparent rounded-lg focus:ring-0 outline-none transition-all duration-200"
                      placeholder="Enter your API key"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full group"
                  >
                    {/* Button gradient background with hover effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-300 to-purple-400 rounded-lg opacity-30 group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative px-4 py-3 bg-gradient-to-r from-rose-300 to-purple-400 rounded-lg transition-all duration-200 transform group-hover:scale-[0.99] group-active:scale-95">
                      <span className="flex justify-center items-center text-white font-medium">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Validating...
                          </>
                        ) : (
                          'Submit'
                        )}
                      </span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 