'use client';

import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/DashboardLayout';
import { UserIcon, PencilIcon, ShieldCheckIcon, BellIcon, KeyIcon, ChartBarIcon, DocumentTextIcon, CogIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function PersonalPage() {
  const { data: session, status } = useSession();

  // Debug session data
  console.log('Session Status:', status);
  console.log('Session Data:', session);
  console.log('User Image:', session?.user?.image);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section with Gradient Background */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 p-6">
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
              <p className="mt-1 text-sm text-gray-600">Manage your account settings</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-white hover:shadow-lg">
              <PencilIcon className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center gap-6">
                {session?.user?.image ? (
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-purple-500 opacity-0 blur transition duration-300 group-hover:opacity-75"></div>
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="relative rounded-full object-cover ring-4 ring-white shadow-lg"
                      priority
                    />
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <PencilIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-purple-500 opacity-20 blur transition duration-300 group-hover:opacity-40"></div>
                    <div className="relative h-full w-full rounded-full bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center">
                      <UserIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{session?.user?.name || 'User'}</h2>
                  <p className="text-gray-500">{session?.user?.email}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-purple-500">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>Verified Account</span>
                  </div>
                </div>
              </div>

              <div className="relative mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
                    <p className="text-gray-900">{session?.user?.name || 'Not set'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="rounded-lg bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100">
                    <p className="text-gray-900">{session?.user?.email || 'Not set'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Security</h3>
                <button className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-purple-500 shadow-sm transition-all duration-300 hover:bg-gray-50 hover:text-purple-600 hover:shadow-md border border-purple-100">
                  View All
                </button>
              </div>
              <div className="relative mt-6 space-y-4">
                <div className="group/item flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2 transition-colors duration-200 group-hover/item:bg-purple-200">
                      <KeyIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Password</h4>
                      <p className="text-sm text-gray-500">Last changed 2 months ago</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200">
                    Change
                  </button>
                </div>
                <div className="group/item flex items-center justify-between rounded-lg bg-gray-50 p-4 transition-all duration-200 hover:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-100 p-2 transition-colors duration-200 group-hover/item:bg-purple-200">
                      <BellIcon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Notifications</h4>
                      <p className="text-sm text-gray-500">Manage your notification preferences</p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors duration-200">
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900">Account Stats</h3>
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-rose-50 to-purple-50 p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2 text-gray-500">
                      <ChartBarIcon className="w-4 h-4" />
                      <span className="text-sm">API Usage</span>
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
                    <p className="text-sm text-purple-500">+12% from last month</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-purple-50 to-rose-50 p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2 text-gray-500">
                      <DocumentTextIcon className="w-4 h-4" />
                      <span className="text-sm">Active Projects</span>
                    </div>
                    <p className="mt-2 text-3xl font-bold text-gray-900">5</p>
                    <p className="text-sm text-purple-500">2 new this month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                <div className="mt-6 space-y-2">
                  <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-purple-500">
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-purple-500">
                    <KeyIcon className="w-4 h-4" />
                    Change Password
                  </button>
                  <button className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-purple-500">
                    <CogIcon className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 