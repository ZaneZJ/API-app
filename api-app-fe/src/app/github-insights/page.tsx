'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Github, KeyRound, Sparkles, PencilLine, BarChart3, FolderGit2, AlertCircle } from 'lucide-react';

interface GitHubAnalysis {
  summary: string;
  coolFacts: string[];
}

interface ApiResponse {
  message: string;
  url: string;
  readme: string;
  analysis: GitHubAnalysis;
}

export default function GitHubInsightsPage() {
  const [apiKey, setApiKey] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [showErrors, setShowErrors] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    if (Object.keys(fieldErrors).length > 0) {
      setShowErrors(Object.keys(fieldErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      
      const timer = setTimeout(() => {
        setShowErrors({});
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fieldErrors]);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    if (!apiKey.trim()) {
      errors.apiKey = 'Please fill out this field';
    }
    if (!githubUrl.trim()) {
      errors.githubUrl = 'Please fill out this field';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/github-summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ githubUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch GitHub insights');
      }

      const data = await response.json() as ApiResponse;
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    setFieldErrors(prev => ({ ...prev, apiKey: '' }));
  };

  const handleGithubUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGithubUrl(e.target.value);
    setFieldErrors(prev => ({ ...prev, githubUrl: '' }));
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 border-0 shadow-none">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">GitHub Repository Insights</h1>
              <p className="text-gray-600">Analyze repositories using AI</p>
            </div>
            <Button variant="outline" className="gap-2 border-0 bg-white hover:bg-white">
              <PencilLine className="w-4 h-4" />
              New Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Analysis Form */}
        <div className="md:col-span-2">
          <Card className="border-0 shadow-sm bg-white">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Github className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Repository Analysis</h2>
                  <p className="text-gray-500">Enter repository details below</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="apiKey" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <KeyRound className="w-4 h-4" />
                      API Key
                    </label>
                    <Input
                      id="apiKey"
                      type="text"
                      value={apiKey}
                      onChange={handleApiKeyChange}
                      placeholder="Enter your API key"
                      className={`mt-1 border-gray-200 ${fieldErrors.apiKey ? 'border-pink-300 focus:border-pink-500 focus:ring-pink-500' : ''}`}
                    />
                    {fieldErrors.apiKey && showErrors.apiKey && (
                      <div className="relative">
                        <div className="absolute -top-1 left-4 transform -translate-y-full">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-1 duration-200 transition-opacity">
                            <div className="w-1 h-1 rounded-full bg-white/90 animate-pulse" />
                            {fieldErrors.apiKey}
                            <div className="absolute -bottom-1 left-2 w-2 h-2 bg-pink-500 rotate-45 rounded-sm" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="githubUrl" className="text-sm font-medium flex items-center gap-2 text-gray-700">
                      <FolderGit2 className="w-4 h-4" />
                      Repository URL
                    </label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={githubUrl}
                      onChange={handleGithubUrlChange}
                      placeholder="https://github.com/username/repository"
                      className={`mt-1 border-gray-200 ${fieldErrors.githubUrl ? 'border-pink-300 focus:border-pink-500 focus:ring-pink-500' : ''}`}
                    />
                    {fieldErrors.githubUrl && showErrors.githubUrl && (
                      <div className="relative">
                        <div className="absolute -top-1 left-4 transform -translate-y-full">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-1 duration-200 transition-opacity">
                            <div className="w-1 h-1 rounded-full bg-white/90 animate-pulse" />
                            {fieldErrors.githubUrl}
                            <div className="absolute -bottom-1 left-2 w-2 h-2 bg-pink-500 rotate-45 rounded-sm" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-400/90 to-purple-400/90 hover:from-pink-400 hover:to-purple-400 text-white border-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Repository
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-gradient-to-r from-red-50/80 to-orange-50/80 rounded-lg border border-red-100/50 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="font-medium text-red-600 mb-1">Validation Error</h4>
                      <p className="text-red-600/90 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {result && (
            <Card className="mt-6 border-0 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  Analysis Results
                </CardTitle>
                <CardDescription>
                  Insights for {result.url}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {result.analysis.summary}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Key Features</h3>
                    <ul className="space-y-2">
                      {result.analysis.coolFacts.map((fact, index) => (
                        <li 
                          key={index}
                          className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-purple-500 mt-1">•</span>
                          <span className="text-gray-600">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-100/50 pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Analysis Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 hover:border-purple-200/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-purple-700 mb-1">
                      Repositories Analyzed
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold text-purple-900">
                        {result ? '1' : '0'}
                      </div>
                      <div className="text-sm text-purple-600 mb-1">
                        Current session
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-blue-700 mb-1">
                      Features Identified
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="text-3xl font-bold text-blue-900">
                        {result ? result.analysis.coolFacts.length : '0'}
                      </div>
                      <div className="text-sm text-blue-600 mb-1">
                        From analysis
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-100/50 pb-6">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Sparkles className="w-5 h-5 text-purple-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 bg-gradient-to-r hover:bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 hover:border-purple-200/50 transition-all duration-300 group h-auto py-3"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  <PencilLine className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-purple-900">New Analysis</span>
                  <span className="text-xs text-purple-600">Start a fresh repository analysis</span>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 bg-gradient-to-r hover:bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300 group h-auto py-3"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium text-blue-900">Manage API Keys</span>
                  <span className="text-xs text-blue-600">Configure your API access</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 