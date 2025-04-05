import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ApiKey } from '@/lib/supabase';
import { ApiKeyRow } from './ApiKeyRow';
import { ApiKeysTableSkeleton } from './ApiKeysTableSkeleton';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  showKey: string[];
  editingKey: { id: string; name: string } | null;
  editName: string;
  nameError: string;
  onShowKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onStartEditing: (key: ApiKey) => void;
  onEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  onEditNameChange: (name: string) => void;
  onCreateClick: () => void;
  isLoading?: boolean;
  isCreating?: boolean;
}

export const ApiKeysTable = ({
  apiKeys,
  showKey,
  editingKey,
  editName,
  nameError,
  onShowKey,
  onCopyKey,
  onStartEditing,
  onEdit,
  onCancelEdit,
  onDelete,
  onEditNameChange,
  onCreateClick,
  isLoading = false,
  isCreating = false
}: ApiKeysTableProps) => {
  if (isLoading) {
    return <ApiKeysTableSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">API Keys</h2>
          <button
            onClick={onCreateClick}
            disabled={isCreating}
            className={`px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 text-white rounded-lg transition-all flex items-center gap-2 shadow-md ${
              isCreating 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:from-rose-400 hover:to-purple-500 hover:scale-105 active:scale-95 hover:shadow-lg'
            }`}
          >
            {isCreating ? (
              <ArrowPathIcon className="w-5 h-5 animate-spin" />
            ) : (
              <PlusIcon className="w-5 h-5" />
            )}
            {isCreating ? 'Creating...' : 'New Key'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {apiKeys.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
              <PlusIcon className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No API Keys Yet</h3>
            <p className="text-gray-500 text-center max-w-md mb-6">
              Create your first API key to start integrating with our services. 
              You can create both development and production keys.
            </p>
            <button
              onClick={onCreateClick}
              disabled={isCreating}
              className={`px-6 py-3 bg-gradient-to-r from-rose-300 to-purple-400 text-white rounded-lg transition-all flex items-center gap-2 shadow-md ${
                isCreating 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:from-rose-400 hover:to-purple-500 hover:scale-105 active:scale-95 hover:shadow-lg'
              }`}
            >
              {isCreating ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
              {isCreating ? 'Creating...' : 'Create Your First API Key'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[8%]" />
                <col className="w-[15%]" />
                <col className="w-[42%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">TYPE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">USAGE</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">KEY</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((apiKey) => (
                  <ApiKeyRow
                    key={apiKey.id}
                    apiKey={apiKey}
                    showKey={showKey}
                    editingKey={editingKey}
                    editName={editName}
                    nameError={nameError}
                    onShowKey={onShowKey}
                    onCopyKey={onCopyKey}
                    onStartEditing={onStartEditing}
                    onEdit={onEdit}
                    onCancelEdit={onCancelEdit}
                    onDelete={onDelete}
                    onEditNameChange={onEditNameChange}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}; 