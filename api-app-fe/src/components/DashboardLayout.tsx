'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSessionTimeout } from '@/hooks/useSessionTimeout';
import { SessionTimeoutWarning } from '@/components/SessionTimeoutWarning';
import { HomeIcon, UserIcon, BeakerIcon, DocumentTextIcon, CodeBracketIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface DashboardLayoutProps {
  children: ReactNode;
  isModalOpen?: boolean;
}

export default function DashboardLayout({ children, isModalOpen = false }: DashboardLayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { showWarning, extendSession, dismissWarning } = useSessionTimeout();

  // Load sidebar state
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState !== null) {
      setIsCollapsed(savedSidebarState === 'true');
    }
  }, []);

  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isCollapsed.toString());
  }, [isCollapsed]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    }
  }, [status, router]);

  // Render loading state or nothing while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside 
          className={`${
            isCollapsed ? 'w-20' : 'w-64'
          } bg-white border-r border-gray-200 flex flex-col relative group transition-all duration-300 ease-in-out`}
        >
          {/* Toggle Button */}
          {!isModalOpen && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-100 transition-colors z-50"
            >
              {isCollapsed ? (
                <ChevronRightIcon className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronLeftIcon className="w-4 h-4 text-gray-500" />
              )}
            </button>
          )}

          {/* Logo */}
          <div className={`p-6 transition-all duration-300 ${isCollapsed ? 'flex justify-center' : 'ml-5'}`}>
            <Link href="/" className="group flex items-center">
              <div className="flex items-center">
                <div className={`bg-gradient-to-r from-rose-300 to-purple-400 p-2 rounded-xl transition-all duration-500 ${isCollapsed ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}>
                  <CodeBracketIcon className="w-6 h-6 text-white transition-transform duration-500" />
                </div>
                {!isCollapsed && (
                  <div className="ml-3 transition-all duration-300 transform origin-left">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent animate-fadeIn">
                      API App
                    </h1>
                    <div className="text-xs text-gray-500 tracking-wider animate-slideIn">
                      DASHBOARD
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </div>

          {/* User Section */}
          <div className={`px-3 mb-6 transition-all duration-300`}>
            <Link 
              href="/protected/personal"
              className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${isCollapsed ? 'justify-center w-full' : 'ml-5 w-[calc(100%-20px)]'}`}
            >
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-gray-600" />
              </div>
              {!isCollapsed && <span className="truncate">Personal</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 transition-all duration-300">
            <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : 'ml-5'}`}>
              {[
                { href: '/dashboard', icon: HomeIcon, text: 'Overview' },
                { href: '/account', icon: UserIcon, text: 'My Account' },
                { href: '/assistant', icon: BeakerIcon, text: 'Research Assistant' },
                { href: '/reports', icon: DocumentTextIcon, text: 'Research Reports' },
                { href: '/playground', icon: CodeBracketIcon, text: 'API Playground' },
                { href: '/docs', icon: BookOpenIcon, text: 'Documentation' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors group relative ${
                    isCollapsed ? 'justify-center w-full' : ''
                  }`}
                >
                  <item.icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  {!isCollapsed && <span>{item.text}</span>}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-purple-100 text-purple-600 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.text}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile - simplified */}
          <div className={`p-4 mt-auto border-t border-gray-200 transition-all duration-300`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-6 h-6 text-gray-500" />
                </div>
              )}
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <div className="text-sm font-medium text-gray-700 truncate">
                    {session?.user?.name || 'User'}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {session?.user?.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar with Logout */}
          <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200">
            <div className="flex justify-end px-8 py-4">
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md group"
              >
                <span className="text-sm font-medium">Sign Out</span>
                <ArrowRightOnRectangleIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="p-8 lg:p-12">
            <div className={`max-w-5xl mx-auto w-full space-y-8 transition-all duration-300`}>
              {children}
            </div>
          </div>
        </div>
      </div>
      <SessionTimeoutWarning
        show={showWarning}
        onExtendSession={extendSession}
        onClose={dismissWarning}
      />
    </>
  );
} 