import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
        { path: '/projects', label: 'Projetos', icon: 'apartment' },
        { path: '/schedule', label: 'Cronograma', icon: 'calendar_month' },
        { path: '/clients', label: 'Clientes', icon: 'group' },
        { path: '/documents', label: 'Documentos', icon: 'folder' },
        { path: '/settings', label: 'Configurações', icon: 'settings' },
    ];

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
            {/* Sidebar */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-border-dark bg-background-dark flex-shrink-0">
                <div className="flex h-full flex-col p-4">
                    <div className="flex gap-3 items-center px-2 py-4 mb-6">
                        <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 bg-primary flex items-center justify-center text-background-dark">
                            <span className="material-symbols-outlined text-2xl">architecture</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-lg font-bold leading-normal">ArchManager</h1>
                            <p className="text-text-secondary text-xs font-normal">ERP Arquitetura</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2 flex-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group w-full text-left ${currentPath === item.path
                                        ? 'bg-surface-dark border border-border-dark'
                                        : 'hover:bg-surface-dark'
                                    }`}
                            >
                                <span className={`material-symbols-outlined ${currentPath === item.path ? 'text-primary filled' : 'text-text-secondary group-hover:text-white'}`}>
                                    {item.icon}
                                </span>
                                <p className={`${currentPath === item.path ? 'text-white font-bold' : 'text-text-secondary group-hover:text-white font-medium'} text-sm leading-normal`}>
                                    {item.label}
                                </p>
                            </button>
                        ))}
                    </nav>

                    <div className="pt-4 border-t border-border-dark mt-auto">
                        <button onClick={() => navigate('/login')} className="flex w-full items-center gap-3 px-3 py-3 rounded-xl hover:bg-surface-dark transition-colors text-text-secondary hover:text-red-400 group">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="text-sm font-medium">Sair</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex flex-1 flex-col h-full overflow-hidden relative">
                {/* Mobile Header / Top Bar */}
                <header className="flex items-center justify-between border-b border-border-dark px-6 py-4 bg-background-dark z-20 shrink-0">
                    <div className="flex items-center gap-4 text-white lg:hidden">
                        <button className="text-white p-1">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <h2 className="text-lg font-bold">ArchManager</h2>
                    </div>

                    <div className="hidden lg:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors">search</span>
                            <input
                                type="text"
                                placeholder="Pesquisar projetos, clientes, faturas..."
                                className="w-full bg-surface-dark border-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex gap-2">
                            <button className="flex items-center justify-center rounded-full size-10 hover:bg-surface-dark text-white transition-colors relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border border-background-dark"></span>
                            </button>
                            <button className="flex items-center justify-center rounded-full size-10 hover:bg-surface-dark text-white transition-colors">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div className="h-8 w-px bg-border-dark mx-2"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-white text-sm font-bold">Ana Arquiteta</p>
                                <p className="text-text-secondary text-xs">Admin</p>
                            </div>
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-surface-dark"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDcQ26BLXXZiGcztd8nNmej4VGpUM-rSNITPSDiOkQjoR2N6qlWWAoY31IBhOAcdvMuh8O7xDChNxdLLiGWlZitRYOJIwJj_cOyx1XPjKDAsKIb-rVn4LdoEQ2iITFVdy7yI6lRuJHup8-0rjh7rmyr6YEmD_b3o3p3EJ8EbKKj8DIiSpMvTZMUgwJe6fYnUg2NzlTI_rWZiDzcc7hyJSkXNa5GRMqRl6kbY6OQ1IRGQc0uK7bCZ1MDASrziIJ9RS7gwW3tqNAIalo")' }}
                            ></div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden bg-background-light dark:bg-background-dark">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
