import { EyeIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ApiKey } from '@/lib/supabase';

interface ApiKeyRowProps {
  apiKey: ApiKey;
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
}

export const ApiKeyRow = ({
  apiKey,
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
  onEditNameChange
}: ApiKeyRowProps) => {
  const isVisible = showKey.includes(apiKey.id);
  
  return (
    <tr className="border-b">
      <td className="py-3 px-4">
        {editingKey?.id === apiKey.id ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={editName}
              onChange={(e) => onEditNameChange(e.target.value)}
              className={`px-2 py-1 border rounded-md focus:ring-2 focus:ring-purple-300 focus:border-purple-300 outline-none ${
                nameError ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            <button
              onClick={onEdit}
              className="px-3 py-1.5 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium flex items-center gap-1 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 text-sm font-medium text-gray-700 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
          </div>
        ) : (
          <span className="font-medium">{apiKey.name}</span>
        )}
        {editingKey?.id === apiKey.id && nameError && (
          <p className="mt-1 text-sm text-red-500">{nameError}</p>
        )}
      </td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded text-sm font-medium ${
          apiKey.type === 'production' 
            ? 'bg-purple-100 text-purple-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {apiKey.type === 'production' ? 'PROD' : 'DEV'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {apiKey.usage.toLocaleString()}
            </span>
            <span className="text-gray-500">
              / {apiKey.usage_limit.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all ${
                (apiKey.usage / apiKey.usage_limit) > 0.9 
                  ? 'bg-red-500' 
                  : (apiKey.usage / apiKey.usage_limit) > 0.7 
                    ? 'bg-yellow-500' 
                    : 'bg-purple-500'
              }`}
              style={{ 
                width: `${Math.min((apiKey.usage / apiKey.usage_limit) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      </td>
      <td className="py-3 px-4 min-w-[300px]">
        <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono w-full inline-block">
          {isVisible ? apiKey.key : '••••••••••••••••'}
        </code>
      </td>
      <td className="py-3 px-4">
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onShowKey(apiKey.id)}
            className={`p-1.5 transition-all hover:scale-110 hover:bg-gray-100 rounded-full ${
              isVisible ? 'text-purple-500 hover:text-purple-700' : 'text-gray-500 hover:text-gray-700'
            }`}
            title={isVisible ? "Hide" : "View"}
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onCopyKey(apiKey.key)}
            className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
            title="Copy"
          >
            <ClipboardIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onStartEditing(apiKey)}
            className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
            title="Edit"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(apiKey.id)}
            className="p-1.5 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:bg-red-50 rounded-full"
            title="Delete"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}; 