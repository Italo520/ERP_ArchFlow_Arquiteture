import { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import NotificationService from '../../services/notification.service';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const loadNotifications = async () => {
        try {
            const data = await NotificationService.getNotifications();
            setNotifications(data);
        } catch (error) {
            console.error('Failed to load notifications', error);
        }
    };

    const loadUnreadCount = async () => {
        try {
            const count = await NotificationService.getUnreadCount();
            setUnreadCount(count);
        } catch (error) {
            console.error('Failed to load unread count', error);
        }
    };

    // Carrega notificações iniciais
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadNotifications();
        loadUnreadCount();

        // Fechar dropdown ao clicar fora
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // WebSocket Handler - Temporarily disabled due to legacy backend removal
    // useWebSocket('/user/queue/notifications', handleNewNotification);
    const { notifications: wsNotifications } = useWebSocket();

    // Sync WS notifications if necessary, but for now just relying on REST or empty.
    useEffect(() => {
        if (wsNotifications.length > 0) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setNotifications(prev => [...prev, ...wsNotifications]);
        }
    }, [wsNotifications]);

    const handleMarkAsRead = async (notification) => {
        if (!notification.read) {
            try {
                await NotificationService.markAsRead(notification.id);
                setNotifications(notifications.map(n =>
                    n.id === notification.id ? { ...n, read: true } : n
                ));
                setUnreadCount((prev) => Math.max(0, prev - 1));
            } catch (error) {
                console.error('Failed to mark as read', error);
            }
        }

        // Navegação básica se tiver recurso associado
        if (notification.resourceType === 'TASK' && notification.resourceId) {
            // Lógica para abrir tarefa (pode navegar para projeto e abrir modal)
            // Por enquanto, apenas logar ou navegar
            console.log('Navigate to resource', notification);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                title="Notificações"
            >
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-900">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl bg-white dark:bg-neutral-800 shadow-xl ring-1 ring-black/5 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-gray-100 dark:border-neutral-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notificações</h3>
                        {unreadCount > 0 && (
                            <button
                                className="text-xs text-primary hover:underline"
                                onClick={() => {
                                    notifications.forEach(n => !n.read && handleMarkAsRead(n));
                                }}
                            >
                                Marcar todas como lidas
                            </button>
                        )}
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-neutral-700">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                Nenhuma notificação.
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => handleMarkAsRead(notification)}
                                    className={`
                                        p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700
                                        ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
                                    `}
                                >
                                    <div className="flex gap-3">
                                        <div className={`
                                            mt-1 h-2 w-2 flex-shrink-0 rounded-full
                                            ${!notification.read ? 'bg-primary' : 'bg-transparent'}
                                        `} />
                                        <div className="flex-1 space-y-1">
                                            <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
