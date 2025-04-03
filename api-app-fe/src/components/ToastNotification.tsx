import { ToastState } from '@/hooks/useToast';

interface ToastNotificationProps {
  toast: ToastState;
}

export const ToastNotification = ({ toast }: ToastNotificationProps) => {
  if (!toast.visible) return null;

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        toast.visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
    >
      <div className={`${
        toast.type === 'success' 
          ? 'bg-gradient-to-r from-rose-300 to-purple-400' 
          : 'bg-gradient-to-r from-red-400 to-red-600'
      } text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-sm`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {toast.type === 'success' ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          )}
        </svg>
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}; 