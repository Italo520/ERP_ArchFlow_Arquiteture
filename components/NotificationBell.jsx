'use client';

import React, { useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

const NotificationBell = () => {
    const { notifications, isConnected, unreadCount, markAsRead, clearNotifications } = useWebSocket();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Bell Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center rounded-full size-10 hover:bg-surface-dark text-white transition-colors relative"
            >
                <span className="material-symbols-outlined">notifications</span>

                {/* Unread Count Badge */}
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 size-4 bg-primary rounded-full border border-background-dark flex items-center justify-center text-[10px] font-bold text-background-dark">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}

                {/* Connection Status Indicator */}
                <span
                    className={`absolute bottom-1.5 right-1.5 size-2 rounded-full border border-background-dark ${isConnected ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                    title={isConnected ? 'Conectado' : 'Desconectado'}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Notification Panel */}
                    <div className="absolute right-0 top-12 z-50 w-80 bg-surface-dark border border-border-dark rounded-xl shadow-xl max-h-96 overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-border-dark">
                            <h3 className="text-white font-bold text-sm">
                                Notificações {unreadCount > 0 && `(${unreadCount})`}
                            </h3>
                            {notifications.length > 0 && (
                                <button
                                    onClick={clearNotifications}
                                    className="text-xs text-text-secondary hover:text-primary transition-colors"
                                >
                                    Limpar tudo
                                </button>
                            )}
                        </div>

                        {/* Notifications List */}
                        <div className="overflow-y-auto flex-1">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-text-secondary">
                                    <span className="material-symbols-outlined text-4xl mb-2 block opacity-50">
                                        notifications_off
                                    </span>
                                    <p className="text-sm">Nenhuma notificação</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-border-dark">
                                    {notifications.map((notification, index) => (
                                        <div
                                            key={notification.id || index}
                                            onClick={() => !notification.read && markAsRead(notification.id)}
                                            className={`p-4 hover:bg-surface-highlight transition-colors cursor-pointer ${!notification.read ? 'bg-surface-highlight/50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-green-500/20 text-green-500' :
                                                        notification.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                                                            notification.type === 'error' ? 'bg-red-500/20 text-red-500' :
                                                                'bg-primary/20 text-primary'
                                                    }`}>
                                                    <span className="material-symbols-outlined text-lg">
                                                        {notification.icon || 'info'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white text-sm font-medium mb-1">
                                                        {notification.title || 'Notificação'}
                                                    </p>
                                                    <p className="text-text-secondary text-xs line-clamp-2">
                                                        {notification.message}
                                                    </p>
                                                    {notification.timestamp && (
                                                        <p className="text-text-secondary text-xs mt-1">
                                                            {new Date(notification.timestamp).toLocaleString('pt-BR')}
                                                        </p>
                                                    )}
                                                </div>
                                                {!notification.read && (
                                                    <div className="size-2 bg-primary rounded-full mt-2" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;
