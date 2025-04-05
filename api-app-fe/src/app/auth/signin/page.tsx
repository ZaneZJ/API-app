'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  // If loading, you might want to show a loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Only show the sign-in page if not authenticated
  if (status === 'unauthenticated') {
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
          @keyframes slide-up {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes text-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes text-focus {
            0% { letter-spacing: -0.5em; filter: blur(12px); opacity: 0; }
            100% { letter-spacing: normal; filter: blur(0); opacity: 1; }
          }
          @keyframes text-reveal {
            0% { transform: translateY(100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
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
          .animate-slide-up {
            animation: slide-up 0.5s ease-out forwards;
          }
          .animate-text-focus {
            animation: text-focus 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          }
          .animate-text-reveal {
            animation: text-reveal 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
          }
          .delay-200 {
            animation-delay: 200ms;
          }
          .delay-300 {
            animation-delay: 300ms;
          }
          .delay-400 {
            animation-delay: 400ms;
          }
          .delay-500 {
            animation-delay: 500ms;
          }
          .delay-600 {
            animation-delay: 600ms;
          }
          .delay-700 {
            animation-delay: 700ms;
          }
          .delay-1000 {
            animation-delay: 1000ms;
          }
        `}</style>

        <div className="relative min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md w-full">
            <div className="text-center space-y-8">
              {/* Logo Icon */}
              <div className="inline-block animate-slide-up opacity-0" style={{ animationDelay: '0ms' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-rose-300 to-purple-400 p-4 rounded-full transform transition-transform hover:scale-110 duration-300">
                    <CodeBracketIcon className="w-12 h-12 text-white animate-float" />
                  </div>
                </div>
              </div>
              
              {/* Title and Subtitle */}
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <h2 className="text-5xl font-bold animate-text-focus opacity-0" style={{ animationDelay: '200ms' }}>
                    <span className="bg-[length:200%_auto] animate-[text-shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-rose-400 via-purple-500 to-rose-400 bg-clip-text text-transparent">
                      Welcome Back
                    </span>
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-3xl font-semibold animate-text-reveal opacity-0" style={{ animationDelay: '400ms' }}>
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                      Sign in to continue
                    </span>
                  </h3>
                </div>
                <div className="overflow-hidden">
                  <p className="text-gray-600 text-lg animate-text-reveal opacity-0 leading-relaxed" style={{ animationDelay: '600ms' }}>
                    Access your personal workspace and continue where you left off
                  </p>
                </div>
              </div>

              {/* Sign in Button */}
              <div className="pt-6 animate-slide-up opacity-0" style={{ animationDelay: '800ms' }}>
                <button
                  onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                  className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  {/* Button Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-purple-400/0 to-blue-400/0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                  
                  {/* Button Content */}
                  <FcGoogle className="w-6 h-6" />
                  <span className="text-gray-700 font-medium text-lg">Sign in with Google</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
} 