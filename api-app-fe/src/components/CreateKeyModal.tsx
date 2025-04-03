import { PlusIcon } from '@heroicons/react/24/outline';

interface CreateKeyModalProps {
  isOpen: boolean;
  name: string;
  type: 'production' | 'development';
  limit: number;
  nameError: string;
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
  onClose,
  onNameChange,
  onTypeChange,
  onLimitChange,
  onCreate
}: CreateKeyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Name"
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                nameError ? 'border-red-500' : ''
              }`}
            />
            {nameError && (
              <p className="mt-1 text-sm text-red-500">{nameError}</p>
            )}
          </div>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value as 'production' | 'development')}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="production">Production</option>
            <option value="development">Development</option>
          </select>
          <input
            type="number"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            placeholder="Usage Limit"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onCreate}
              className="px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              Create Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 