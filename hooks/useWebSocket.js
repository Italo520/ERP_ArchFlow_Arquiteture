'use client';

import { useState, useCallback } from 'react';

// Legacy dependencies removed: @stomp/stompjs, sockjs-client
// This hook is now a stub until Supabase Realtime or another solution is implemented.

export function useWebSocket() {
    const [notifications, setNotifications] = useState([]);

    // Stub functions to maintain interface compatibility
    const connect = useCallback(() => { }, []);
    const disconnect = useCallback(() => { }, []);
    const clearNotifications = useCallback(() => setNotifications([]), []);
    const markAsRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, []);

    return {
        notifications,
        isConnected: false,
        clearNotifications,
        markAsRead,
        unreadCount: 0,
    };
}
