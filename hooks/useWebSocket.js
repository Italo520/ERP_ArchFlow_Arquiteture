'use client';

import { useState, useCallback, useEffect } from 'react';
import Pusher from 'pusher-js';

// Setup Pusher instance
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY || 'app-key';
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'mt1';

let pusherInstance = null;

const getPusher = () => {
    if (!pusherInstance && typeof window !== 'undefined') {
        pusherInstance = new Pusher(pusherKey, {
            cluster: pusherCluster,
        });
    }
    return pusherInstance;
};

export function useWebSocket(userId = 'global') {
    const [notifications, setNotifications] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const pusher = getPusher();

        if (pusher) {
            pusher.connection.bind('connected', () => setIsConnected(true));
            pusher.connection.bind('disconnected', () => setIsConnected(false));
            pusher.connection.bind('error', () => setIsConnected(false));

            const channelName = `private-notifications-${userId}`;
            // For simple setup without auth endpoint right now, we can use public channel
            // In a real app this should be a private channel with authentication
            const channel = pusher.subscribe(`notifications-${userId}`);

            channel.bind('new-notification', (data) => {
                setNotifications(prev => {
                    // Prepend new notification
                    return [{ ...data, id: data.id || Date.now().toString(), read: false, timestamp: data.timestamp || new Date() }, ...prev];
                });
            });

            return () => {
                pusher.unsubscribe(`notifications-${userId}`);
                // Don't disconnect global instance to allow other hooks to use it, just unbind
                channel.unbind('new-notification');
            };
        }
    }, [userId]);

    const clearNotifications = useCallback(() => setNotifications([]), []);

    const markAsRead = useCallback((id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        // Note: Real application should also call an API endpoint to mark as read in the database
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Helper to sync initial notifications from an API if needed
    const setInitialNotifications = useCallback((initialData) => {
        setNotifications(initialData);
    }, []);

    return {
        notifications,
        isConnected,
        clearNotifications,
        markAsRead,
        unreadCount,
        setInitialNotifications
    };
}
