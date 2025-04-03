import { useState } from 'react';

export type ToastType = 'success' | 'error';

export interface ToastState {
  message: string;
  visible: boolean;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: '',
    visible: false,
    type: 'success'
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2000);
  };

  return {
    toast,
    showToast
  };
}; 