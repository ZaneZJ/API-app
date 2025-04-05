import { PlusIcon, BeakerIcon, RocketLaunchIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface CreateKeyModalProps {
  isOpen: boolean;
  name: string;
  type: 'production' | 'development';
  limit: number;
  nameError: string;
  isCreating?: boolean;
  onClose: () => void;
  onNameChange: (name: string) => void;
  onTypeChange: (type: 'production' | 'development') => void;
  onLimitChange: (limit: number) => void;
  onCreate: () => void;
}

export const CreateKeyModal = ({
  isOpen,
  name,
  type,
  limit,
  nameError,
  isCreating = false,
  onClose,
  onNameChange,
  onTypeChange,
  onLimitChange,
  onCreate
}: CreateKeyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out scale-100 opacity-100 animate-modalSlideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-center gap-3">
            <div className="p-2 bg-gradient-to-r from-rose-300 to-purple-400 rounded-xl">
              <PlusIcon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-purple-500 bg-clip-text text-transparent">
              Create New API Key
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <div className="relative">
              <div className="absolute -inset-[2px] bg-gradient-to-r from-rose-300 to-purple-400 rounded-[22px] opacity-40"></div>
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Enter key name"
                className={`relative w-full px-4 py-2.5 bg-white border-2 border-transparent rounded-[20px] focus:ring-0 outline-none transition-all duration-200 ${
                  nameError ? 'border-red-300' : ''
                }`}
              />
            </div>
            {nameError && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {nameError}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Environment</label>
            <div className="flex gap-4">
              <button
                onClick={() => onTypeChange('development')}
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 group ${
                  type === 'development'
                    ? 'border-purple-400 bg-purple-50 shadow-lg shadow-purple-100'
                    : 'border-gray-200 bg-gray-50 hover:border-purple-200 hover:bg-purple-50/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    type === 'development'
                      ? 'bg-gradient-to-r from-purple-400 to-purple-500 rotate-0 scale-110'
                      : 'bg-gray-200 group-hover:scale-105 group-hover:rotate-6'
                  }`}>
                    <BeakerIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`font-medium transition-colors duration-300 ${
                      type === 'development' ? 'text-purple-700' : 'text-gray-600'
                    }`}>Development</div>
                    <div className="text-xs text-gray-500 mt-0.5">Testing & Debug</div>
                    <div className={`text-[11px] mt-1.5 px-2 py-0.5 rounded-full inline-block transition-colors duration-300 ${
                      type === 'development' 
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      100 requests/minute
                    </div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => onTypeChange('production')}
                className={`flex-1 px-4 py-3 rounded-2xl border-2 transition-all duration-300 group ${
                  type === 'production'
                    ? 'border-rose-400 bg-rose-50 shadow-lg shadow-rose-100'
                    : 'border-gray-200 bg-gray-50 hover:border-rose-200 hover:bg-rose-50/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    type === 'production'
                      ? 'bg-gradient-to-r from-rose-400 to-rose-500 rotate-0 scale-110'
                      : 'bg-gray-200 group-hover:scale-105 group-hover:rotate-6'
                  }`}>
                    <RocketLaunchIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-center">
                    <div className={`font-medium transition-colors duration-300 ${
                      type === 'production' ? 'text-rose-700' : 'text-gray-600'
                    }`}>Production</div>
                    <div className="text-xs text-gray-500 mt-0.5">Live & Stable</div>
                    <div className={`text-[11px] mt-1.5 px-2 py-0.5 rounded-full inline-block transition-colors duration-300 ${
                      type === 'production' 
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      1,000 requests/minute
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Usage Limit</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              placeholder="Enter usage limit"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isCreating}
            className={`px-6 py-2 border-2 border-gray-200 rounded-xl text-gray-600 font-medium transition-all duration-200 ${
              isCreating
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:scale-105 active:scale-95'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={isCreating}
            className={`px-6 py-2 bg-gradient-to-r from-rose-400 to-purple-500 text-white rounded-xl transition-all duration-200 font-medium shadow-md flex items-center gap-2 ${
              isCreating
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:from-rose-500 hover:to-purple-600 hover:scale-105 active:scale-95 hover:shadow-lg'
            }`}
          >
            {isCreating ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}
            {isCreating ? 'Creating...' : 'Create Key'}
          </button>
        </div>
      </div>
    </div>
  );
}; 