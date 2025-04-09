'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { signOut } from 'next-auth/react';

// 5 minutes in milliseconds
const SESSION_TIMEOUT = 5 * 60 * 1000;
// Warning shows 1 minute before timeout
const WARNING_TIMEOUT = SESSION_TIMEOUT - 60 * 1000;

export const useSessionTimeout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = useCallback(() => {
    console.log('Resetting timeout...');
    // Clear existing timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }

    // Set new warning timeout
    warningTimeoutRef.current = setTimeout(() => {
      console.log('Warning timeout triggered');
      setShowWarning(true);
    }, WARNING_TIMEOUT);

    // Set new session timeout
    timeoutRef.current = setTimeout(() => {
      console.log('Session timeout triggered');
      signOut({ callbackUrl: '/' });
    }, SESSION_TIMEOUT);
  }, []);

  const handleUserActivity = useCallback(() => {
    if (!showWarning) {
      console.log('User activity detected, resetting timeout');
      resetTimeout();
    }
  }, [showWarning, resetTimeout]);

  useEffect(() => {
    console.log('Setting up session timeout listeners');
    // Initial setup
    resetTimeout();

    // Add event listeners
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Cleanup
    return () => {
      console.log('Cleaning up session timeout listeners');
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
    };
  }, [resetTimeout, handleUserActivity]);

  const extendSession = useCallback(() => {
    console.log('Extending session...');
    setShowWarning(false);
    resetTimeout();
  }, [resetTimeout]);

  const dismissWarning = useCallback(() => {
    console.log('Dismissing warning...');
    setShowWarning(false);
  }, []);

  return {
    showWarning,
    extendSession,
    dismissWarning
  };
}; 