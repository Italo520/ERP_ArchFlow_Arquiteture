'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

export function useWebSocket() {
    const [notifications, setNotifications] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const clientRef = useRef(null);

    const connect = useCallback(() => {
        const token = Cookies.get('token');
        if (!token) {
            console.log('WebSocket: No token found, skipping connection');
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

        const client = new Client({
            webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => {
                console.log('STOMP Debug:', str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('WebSocket connected!');
                setIsConnected(true);

                // Subscribe to user-specific notifications
                client.subscribe('/user/queue/notifications', (message) => {
                    try {
                        const notification = JSON.parse(message.body);
                        console.log('Received notification:', notification);

                        setNotifications((prev) => [notification, ...prev].slice(0, 50)); // Keep last 50

                        // Show browser notification if permitted
                        if (typeof window !== 'undefined' && Notification.permission === 'granted') {
                            new Notification(notification.title || 'Nova Notificação', {
                                body: notification.message,
                                icon: '/favicon.ico',
                            });
                        }
                    } catch (error) {
                        console.error('Error parsing notification:', error);
                    }
                });

                // Subscribe to general topic
                client.subscribe('/topic/notifications', (message) => {
                    try {
                        const notification = JSON.parse(message.body);
                        console.log('Received topic notification:', notification);
                        setNotifications((prev) => [notification, ...prev].slice(0, 50));
                    } catch (error) {
                        console.error('Error parsing topic notification:', error);
                    }
                });
            },
            onStompError: (frame) => {
                console.error('STOMP error:', frame);
                setIsConnected(false);
            },
            onWebSocketClose: () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
            },
            onDisconnect: () => {
                console.log('WebSocket disconnected');
                setIsConnected(false);
            },
        });

        clientRef.current = client;
        client.activate();
    }, []);

    const disconnect = useCallback(() => {
        if (clientRef.current) {
            clientRef.current.deactivate();
            clientRef.current = null;
            setIsConnected(false);
        }
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    const markAsRead = useCallback((notificationId) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === notificationId ? { ...notif, read: true } : notif
            )
        );
    }, []);

    useEffect(() => {
        // Request notification permission
        if (typeof window !== 'undefined' && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    return {
        notifications,
        isConnected,
        clearNotifications,
        markAsRead,
        unreadCount: notifications.filter((n) => !n.read).length,
    };
}
