import { useState } from 'react';
import { ApiKey } from '@/lib/types';
import { EyeIcon, ClipboardIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ApiKeyListProps {
  apiKeys: ApiKey[];
  isLoading: boolean;
  onCopy: (text: string) => void;
  onDelete: (id: string) => Promise<void>;
  onUpdateName: (id: string, name: string) => Promise<void>;
}

export function ApiKeyList({ apiKeys, isLoading, onCopy, onDelete, onUpdateName }: ApiKeyListProps) {
  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null);
  const [editName, setEditName] = useState('');
  const [showKey, setShowKey] = useState<string | null>(null);

  const handleEdit = async () => {
    if (!editingKey || !editName.trim()) return;
    await onUpdateName(editingKey.id, editName.trim());
    setEditingKey(null);
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading API keys...</div>;
  }

  if (apiKeys.length === 0) {
    return <div className="text-gray-500">No API keys found</div>;
  }

  return (
    <div className="space-y-4">
      {apiKeys.map((key) => (
        <div key={key.id} className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              {editingKey?.id === key.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <button
                    onClick={handleEdit}
                    className="text-green-600 hover:text-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingKey(null)}
                    className="text-gray-500 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h3 className="font-medium">{key.name}</h3>
              )}
              <div className="flex items-center gap-2">
                <div className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {showKey === key.id ? key.key : '••••••••••••••••'}
                </div>
                <button
                  onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                  className="p-1 hover:text-gray-700"
                >
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCopy(key.key)}
                  className="p-1 hover:text-gray-700"
                >
                  <ClipboardIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingKey({ id: key.id, name: key.name });
                  setEditName(key.name);
                }}
                className="p-1 hover:text-gray-700"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(key.id)}
                className="p-1 text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>Type: {key.type}</span>
            <span>Usage: {key.usage}/{key.usage_limit}</span>
            <span>Last used: {key.last_used}</span>
          </div>
        </div>
      ))}
    </div>
  );
} 