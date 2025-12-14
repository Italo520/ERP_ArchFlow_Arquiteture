

import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useState, useCallback } from 'react';

// Environment variable for API URL or default
const WS_URL = 'http://localhost:8080/ws';

export const useWebSocket = (topic, onMessage) => {
    const [client, setClient] = useState(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            // Using SockJS fallback
            webSocketFactory: () => new SockJS(WS_URL),
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);

                if (topic && onMessage) {
                    stompClient.subscribe(topic, (message) => {
                        try {
                            const body = JSON.parse(message.body);
                            onMessage(body);
                        } catch (e) {
                            console.error('Error parsing WS message', e);
                        }
                    });
                }
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, [topic]);

    // Function to publish messages if needed
    const publish = useCallback((destination, body) => {
        if (client && client.connected) {
            client.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    }, [client]);

    return { connected, publish };
};
