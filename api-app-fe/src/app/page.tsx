'use client';

import { CodeBracketIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function Home() {
  const { data: session } = useSession();

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
        
        {/* Radial gradient overlay with right transparency */}
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

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="max-w-5xl mx-auto w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-block animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-3 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-purple-100">
                <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-1.5 rounded-lg">
                  <CodeBracketIcon className="w-5 h-5 text-white animate-pulse" />
                </div>
                <span className="text-xs font-medium text-gray-500 tracking-wider">POWERED BY AI</span>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">API</span>
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"> App</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your all-in-one platform for API development, testing, and documentation.
              <span className="block mt-1.5 text-purple-500 font-medium">Build smarter, deploy faster.</span>
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            {/* Decorative line */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-100/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-rose-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <SparklesIcon className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">AI-Powered Features</h3>
              <p className="text-gray-600 leading-relaxed text-base">Transform your development workflow with AI-assisted code analysis, documentation generation, and content summarization.</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-rose-100 hover:border-rose-200 transition-all duration-300 group hover:shadow-xl hover:shadow-rose-100/20">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BoltIcon className="w-7 h-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Powerful Tools</h3>
              <p className="text-gray-600 leading-relaxed text-base">Access a suite of developer tools including API playground, key management, and real-time testing environment.</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            {session ? (
              <>
                <a
                  href="/dashboard"
                  className="group px-8 py-4 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/30"
                >
                  Go to Dashboard
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                <button
                  onClick={() => signOut()}
                  className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 font-medium text-lg hover:scale-105 hover:shadow-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                className="group px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-lg"
              >
                <FcGoogle className="w-6 h-6" />
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
