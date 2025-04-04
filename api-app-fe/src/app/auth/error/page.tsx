'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-purple-200/50 via-rose-200/50 to-transparent blur-3xl animate-move-slow" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-t from-rose-200/50 via-purple-200/50 to-transparent blur-3xl animate-move-slow-reverse" />
        
        {/* Accent gradients */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-orange-200/40 to-yellow-200/40 rounded-full blur-3xl animate-float" />
        
        {/* Animated dots */}
        <div className="absolute inset-0">
          <div className="absolute h-2 w-2 bg-purple-400/30 rounded-full top-1/4 left-1/4 animate-ping-slow" />
          <div className="absolute h-2 w-2 bg-rose-400/30 rounded-full top-3/4 right-1/4 animate-ping-slow delay-300" />
          <div className="absolute h-2 w-2 bg-blue-400/30 rounded-full bottom-1/4 left-1/3 animate-ping-slow delay-700" />
        </div>

        {/* Grid pattern with gradient overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDEwMywgMjIsIDE5NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/50 to-transparent" />
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes pulse-slow {
          0% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
          100% { opacity: 0.3; transform: scale(1); }
        }
        @keyframes move-slow {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes move-slow-reverse {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(2); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        .animate-move-slow {
          animation: move-slow 15s ease-in-out infinite;
        }
        .animate-move-slow-reverse {
          animation: move-slow-reverse 15s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 4s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>

      <div className="relative min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-rose-300 to-purple-400 p-4 rounded-full">
                  <ExclamationTriangleIcon className="w-12 h-12 text-white animate-bounce" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                  Authentication Error
                </span>
              </h2>
              <p className="text-gray-600 text-lg">
                {error || 'An error occurred during authentication'}
              </p>
            </div>

            <div className="pt-4">
              <a
                href="/auth/signin"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-xl hover:shadow-purple-200/30 group"
              >
                Try Again
                <span className="group-hover:translate-x-1 transition-transform ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-rose-300 to-purple-400 p-4 rounded-full">
              <div className="w-12 h-12 animate-spin border-4 border-white border-t-transparent rounded-full" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
            Loading...
          </h2>
        </div>
      </main>
    }>
      <ErrorContent />
    </Suspense>
  );
} 