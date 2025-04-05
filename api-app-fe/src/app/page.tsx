'use client';

import { CodeBracketIcon, BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useSession, signIn, signOut } from 'next-auth/react';

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
        
        {/* Additional dynamic gradients */}
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-move-diagonal" />
        <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/30 to-rose-200/30 rounded-full blur-3xl animate-move-diagonal-reverse" />
        
        {/* Animated dots */}
        <div className="absolute inset-0">
          {/* Original dots */}
          <div className="absolute h-2 w-2 bg-purple-400/30 rounded-full top-1/4 left-1/4 animate-ping-slow" />
          <div className="absolute h-2 w-2 bg-rose-400/30 rounded-full top-3/4 right-1/4 animate-ping-slow delay-300" />
          <div className="absolute h-2 w-2 bg-blue-400/30 rounded-full bottom-1/4 left-1/3 animate-ping-slow delay-700" />
          <div className="absolute h-2 w-2 bg-indigo-400/30 rounded-full top-1/3 right-1/3 animate-ping-slow delay-500" />
          <div className="absolute h-2 w-2 bg-amber-400/30 rounded-full bottom-1/3 left-1/4 animate-ping-slow delay-1000" />
          
          {/* New floating dots */}
          <div className="absolute h-3 w-3 bg-gradient-to-r from-purple-400/40 to-rose-400/40 rounded-full top-1/5 right-1/5 animate-float-dot" />
          <div className="absolute h-3 w-3 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full top-2/5 left-1/5 animate-float-dot delay-200" />
          <div className="absolute h-3 w-3 bg-gradient-to-r from-amber-400/40 to-orange-400/40 rounded-full bottom-1/5 right-2/5 animate-float-dot delay-400" />
          <div className="absolute h-3 w-3 bg-gradient-to-r from-indigo-400/40 to-violet-400/40 rounded-full bottom-2/5 left-2/5 animate-float-dot delay-600" />
          
          {/* New moving dots */}
          <div className="absolute h-2 w-2 bg-purple-400/20 rounded-full top-1/6 left-1/6 animate-move-dot-1" />
          <div className="absolute h-2 w-2 bg-rose-400/20 rounded-full top-2/6 right-1/6 animate-move-dot-2" />
          <div className="absolute h-2 w-2 bg-blue-400/20 rounded-full bottom-1/6 left-2/6 animate-move-dot-3" />
          <div className="absolute h-2 w-2 bg-amber-400/20 rounded-full bottom-2/6 right-2/6 animate-move-dot-4" />
          
          {/* New pulsing dots */}
          <div className="absolute h-1.5 w-1.5 bg-gradient-to-r from-purple-400/30 to-rose-400/30 rounded-full top-1/3 left-1/3 animate-pulse-dot" />
          <div className="absolute h-1.5 w-1.5 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full top-2/3 right-1/3 animate-pulse-dot delay-300" />
          <div className="absolute h-1.5 w-1.5 bg-gradient-to-r from-amber-400/30 to-orange-400/30 rounded-full bottom-1/3 left-2/3 animate-pulse-dot delay-600" />
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
        @keyframes move-diagonal {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, 30px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes move-diagonal-reverse {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, -30px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
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
        .animate-move-diagonal {
          animation: move-diagonal 20s ease-in-out infinite;
        }
        .animate-move-diagonal-reverse {
          animation: move-diagonal-reverse 20s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 4s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        @keyframes float-dot {
          0% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -10px) scale(1.1); }
          50% { transform: translate(0, -20px) scale(1); }
          75% { transform: translate(-10px, -10px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes move-dot-1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(50px, 30px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes move-dot-2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-40px, 20px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes move-dot-3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(30px, -40px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes move-dot-4 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-50px, -30px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes pulse-dot {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        
        .animate-float-dot {
          animation: float-dot 8s ease-in-out infinite;
        }
        
        .animate-move-dot-1 {
          animation: move-dot-1 12s ease-in-out infinite;
        }
        
        .animate-move-dot-2 {
          animation: move-dot-2 15s ease-in-out infinite;
        }
        
        .animate-move-dot-3 {
          animation: move-dot-3 10s ease-in-out infinite;
        }
        
        .animate-move-dot-4 {
          animation: move-dot-4 14s ease-in-out infinite;
        }
        
        .animate-pulse-dot {
          animation: pulse-dot 4s ease-in-out infinite;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-400 {
          animation-delay: 400ms;
        }
        
        .delay-600 {
          animation-delay: 600ms;
        }
        @keyframes flow-1 {
          0% { transform: translateX(0) translateY(0); opacity: 0.3; }
          40% { transform: translateX(-15px) translateY(10px); opacity: 0.3; }
          45% { transform: translateX(-30px) translateY(20px); opacity: 1; }
          50% { transform: translateX(-30px) translateY(20px); opacity: 0.7; }
          55% { transform: translateX(-15px) translateY(10px); opacity: 0.5; }
          100% { transform: translateX(0) translateY(0); opacity: 0.3; }
        }
        
        @keyframes flow-2 {
          0% { transform: translateX(0) translateY(0); opacity: 0.3; }
          40% { transform: translateX(15px) translateY(-10px); opacity: 0.3; }
          45% { transform: translateX(30px) translateY(-20px); opacity: 1; }
          50% { transform: translateX(30px) translateY(-20px); opacity: 0.7; }
          55% { transform: translateX(15px) translateY(-10px); opacity: 0.5; }
          100% { transform: translateX(0) translateY(0); opacity: 0.3; }
        }
        
        .animate-flow-1 {
          animation: flow-1 15s ease-in-out infinite;
        }
        
        .animate-flow-2 {
          animation: flow-2 18s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 py-4 px-8 flex items-center justify-between bg-white/70 backdrop-blur-sm border-b border-purple-100">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-1.5 rounded-lg">
              <CodeBracketIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                API App
              </span>
              <span className="text-xs text-gray-500 tracking-wider">
                AI POWERED
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <a
                  href="/dashboard"
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm border border-purple-100 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Dashboard
                </a>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-lg"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => signIn()}
                  className="px-6 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300"
                >
                  Log In
                </button>
                <button
                  onClick={() => signIn('google')}
                  className="px-6 py-2.5 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 hover:shadow-xl hover:shadow-purple-200/30 hover:scale-105"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>
        </nav>

          {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center p-8 lg:p-12 pt-24">
          <div className="max-w-5xl mx-auto w-full space-y-8 text-center">
            <div className="inline-block animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-3 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-purple-100">
                <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-1.5 rounded-lg">
                  <CodeBracketIcon className="w-5 h-5 text-white animate-pulse" />
                </div>
                <span className="text-xs font-medium text-gray-500 tracking-wider">POWERED BY AI</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Your all-in-one platform for API
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                documentation and management
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Transform your API development workflow with AI-powered documentation and management.
              <span className="block mt-1.5 text-purple-500 font-medium">Build smarter, deploy faster.</span>
            </p>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="group px-8 py-4 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/30"
              >
                Try It Now
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-lg">
                <CodeBracketIcon className="w-6 h-6" />
                Connect API
              </button>
            </div>
          </div>
        </div>

        {/* Multi-wave separator for Hero to Supercharge section */}
        <div className="relative h-40 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path 
              d="M0,0 
                C180,20 360,80 540,70
                C720,60 900,20 1080,40
                C1260,60 1350,30 1440,20
                L1440,160 L0,160 Z" 
              fill="#F9FAFB"
            />
            <path 
              d="M0,40
                C180,60 360,120 540,110
                C720,100 900,60 1080,80
                C1260,100 1350,70 1440,60
                L1440,160 L0,160 Z" 
              fill="#F9FAFB"
              fillOpacity="0.8"
            />
          </svg>
          </div>

        {/* Supercharge Section */}
        <div className="w-full py-24 relative bg-gray-50">
          {/* Fluid Lines Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg className="absolute w-full h-full opacity-30" viewBox="0 0 800 400">
              <path
                className="animate-flow-1"
                d="M-200,160 C100,80 300,400 500,200 C700,0 900,100 1000,120"
                fill="none"
                stroke="url(#gradient-1)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <path
                className="animate-flow-2"
                d="M-200,240 C100,160 300,480 500,280 C700,80 900,180 1000,200"
                fill="none"
                stroke="url(#gradient-2)"
                strokeWidth="2"
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#EC4899" stopOpacity="0.2">
                    <animate
                      attributeName="stop-opacity"
                      values="0.2;1;0.6;0.4;0.2"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.3">
                    <animate
                      attributeName="stop-opacity"
                      values="0.3;1;0.7;0.5;0.3"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.2">
                    <animate
                      attributeName="stop-opacity"
                      values="0.2;1;0.6;0.4;0.2"
                      dur="12s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
                <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2">
                    <animate
                      attributeName="stop-opacity"
                      values="0.2;1;0.6;0.4;0.2"
                      dur="12s"
                      begin="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#A855F7" stopOpacity="0.3">
                    <animate
                      attributeName="stop-opacity"
                      values="0.3;1;0.7;0.5;0.3"
                      dur="12s"
                      begin="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2">
                    <animate
                      attributeName="stop-opacity"
                      values="0.2;1;0.6;0.4;0.2"
                      dur="12s"
                      begin="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Content */}
          <div className="max-w-5xl mx-auto px-8 lg:px-12 text-center space-y-8 relative">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Supercharge
              </span>
              {' '}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Your API Experience
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Powerful AI tools to help you understand, document, and manage your APIs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <div className="bg-white p-6 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300 group hover:shadow-xl hover:shadow-purple-100/20">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-rose-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-rose-500 bg-clip-text text-transparent">Repository Analysis</h3>
                <p className="text-gray-600 leading-relaxed">Get deep insights into code structure, dependencies, and patterns with AI-powered analysis.</p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-rose-100 hover:border-rose-200 transition-all duration-300 group hover:shadow-xl hover:shadow-rose-100/20">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BoltIcon className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">Smart Documentation</h3>
                <p className="text-gray-600 leading-relaxed">Automatically generate comprehensive documentation and READMEs that actually make sense.</p>
            </div>

              <div className="bg-white p-6 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-100/20 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CodeBracketIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Code Insights</h3>
                <p className="text-gray-600 leading-relaxed">Understand complex codebases quickly with AI-generated summaries and explanations.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-wave separator for Supercharge to Pricing section */}
        <div className="relative h-40 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <path 
              d="M0,160
                C180,140 360,80 540,90
                C720,100 900,140 1080,120
                C1260,100 1350,130 1440,140
                L1440,0 L0,0 Z" 
              fill="#F9FAFB"
            />
            <path 
              d="M0,120
                C180,100 360,40 540,50
                C720,60 900,100 1080,80
                C1260,60 1350,90 1440,100
                L1440,0 L0,0 Z" 
              fill="#F9FAFB"
              fillOpacity="0.8"
            />
          </svg>
        </div>

        {/* Pricing Section */}
        <div className="w-full py-24 px-8 lg:px-12 overflow-x-auto">
          <div className="max-w-7xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                Simple, Transparent
              </span>
              {' '}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your needs. No hidden fees or surprises.
            </p>

            <div className="flex gap-6 mt-12 min-w-max px-4">
              {/* Free Plan */}
              <div className="w-[280px] bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-purple-200 transition-all duration-300 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">Free</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">Perfect for exploring and personal projects</p>
                
                <ul className="mt-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    5 repos/month
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Core docs
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Public repos
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    Advanced code insights
                  </li>
                </ul>

                <button className="mt-8 w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-xl transition-all duration-300 font-medium">
                  Get Started
                </button>
              </div>

              {/* Pro Plan */}
              <div className="w-[280px] bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-purple-200 transition-all duration-300 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$12</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">For individual developers and creators</p>
                
                <ul className="mt-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    50 repos/month
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Pro templates
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Private repos
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Code insights
                  </li>
                </ul>

                <button className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300">
                  Subscribe
                </button>
              </div>

              {/* Team Plan */}
              <div className="w-[280px] bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-purple-200 hover:border-purple-300 transition-all duration-300 flex flex-col relative scale-105 shadow-xl shadow-purple-100/20">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-rose-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                  POPULAR
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Team</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-gray-600">For teams and small businesses</p>
                
                <ul className="mt-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    200 repos/month
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    All templates
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    5 team seats
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Full analytics
                  </li>
                </ul>

                <button className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300">
                  Subscribe
                </button>
              </div>

              {/* Enterprise Plan */}
              <div className="w-[280px] bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-purple-200 transition-all duration-300 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">Custom</span>
                </div>
                <p className="mt-4 text-gray-600">For large organizations and agencies</p>
                
                <ul className="mt-8 space-y-4 flex-1">
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited repos
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Custom branding
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Unlimited seats
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    24/7 support
                  </li>
                </ul>

                <button className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300">
                  Contact Sales
              </button>
              </div>
            </div>

            <p className="mt-12 text-sm text-purple-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </div>

      {/* New CTA Section */}
      <div className="w-full py-24 relative bg-gray-50">
        <div className="max-w-5xl mx-auto px-8 lg:px-12 text-center space-y-8 relative">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
              Transform Your Codebase
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              with Intelligent Analysis
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Unlock the full potential of your repositories with AI-powered insights and documentation.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="group px-8 py-4 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/30 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              Get Started Free
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-8 py-4 bg-white/70 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white transition-all duration-300 font-medium text-lg flex items-center gap-3 hover:scale-105 hover:shadow-lg group">
              <span className="group-hover:text-purple-600 transition-colors">View Demo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Repositories Analyzed */}
            <div className="group relative bg-white p-8 rounded-2xl border border-purple-100 hover:border-purple-200 transition-all duration-500 hover:shadow-xl hover:shadow-purple-100/20">
              <div className="relative space-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-500 to-rose-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                  100+
                </div>
                <div className="text-gray-600 font-medium">
                  Repositories Analyzed
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-rose-400 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              </div>
            </div>

            {/* Lines of Code */}
            <div className="group relative bg-white p-8 rounded-2xl border border-rose-100 hover:border-rose-200 transition-all duration-500 hover:shadow-xl hover:shadow-rose-100/20">
              <div className="relative space-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                  50k+
                </div>
                <div className="text-gray-600 font-medium">
                  Lines of Code Processed
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              </div>
            </div>

            {/* READMEs Generated */}
            <div className="group relative bg-white p-8 rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/20">
              <div className="relative space-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                  200+
                </div>
                <div className="text-gray-600 font-medium">
                  READMEs Generated
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              </div>
            </div>

            {/* Customer Satisfaction */}
            <div className="group relative bg-white p-8 rounded-2xl border border-indigo-100 hover:border-indigo-200 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/20">
              <div className="relative space-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
                  98%
                </div>
                <div className="text-gray-600 font-medium">
                  Customer Satisfaction
                </div>
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-50" />
          
          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent opacity-50" />
          
          {/* Side gradient lines */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent opacity-50" />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-purple-200 to-transparent opacity-50" />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-white border-t border-gray-100">
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Logo and Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-rose-300 to-purple-400 p-1 rounded-lg">
                <CodeBracketIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
                API App
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-900">Product</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="#features" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Features</a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Pricing</a>
              </li>
              <li>
                <a href="/api" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">API</a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-900">Resources</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="/documentation" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Documentation</a>
              </li>
              <li>
                <a href="/guides" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Guides</a>
              </li>
              <li>
                <a href="/blog" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-gray-900">Company</h3>
            <ul className="space-y-1.5">
              <li>
                <a href="/about" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">About</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Contact</a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 text-xs transition-colors">Privacy</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[100rem] mx-auto px-4 md:px-8 mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-600">
              © 2025 API App. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="/terms" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
              <a href="/privacy" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/cookies" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
