import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../../services/project.service';
import AuthService from '../../services/auth.service';

import NotificationBell from '../../components/layout/NotificationBell';

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await ProjectService.getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error loading projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
            {/* Top App Bar */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-neutral-50" style={{ fontSize: '28px' }}>architecture</span>
                    <h2 className="text-primary dark:text-neutral-50 text-lg font-bold leading-tight tracking-[-0.015em] flex-1">ArchFlow</h2>
                </div>
                <div className="flex items-center gap-4">
                    <NotificationBell />
                    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                        <p className="text-primary/80 dark:text-neutral-300 text-base font-bold leading-normal tracking-[0.015em] shrink-0">Sair</p>
                        <span className="material-symbols-outlined text-primary/80 dark:text-neutral-300">logout</span>
                    </div>
                </div>
            </div>

            <main className="flex-1 pb-24">
                {/* Headline and Body Text */}
                <h1 className="text-primary dark:text-neutral-50 tracking-light text-[32px] font-bold leading-tight px-4 text-left pb-1 pt-6">Projetos</h1>
                <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal leading-normal pb-3 pt-1 px-4">Gerencie seus projetos de arquitetura.</p>

                {/* Single Button */}
                <div className="flex px-4 py-3">
                    <button
                        onClick={() => navigate('/projects/new')}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-neutral-50 gap-2 text-base font-bold leading-normal tracking-[0.015em]"
                    >
                        <span className="material-symbols-outlined text-neutral-50" style={{ fontSize: '24px' }}>add</span>
                        <span className="truncate">Novo Projeto</span>
                    </button>
                </div>

                {loading ? (
                    /* Loading State */
                    <div className="flex flex-col gap-y-4 p-4 mt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider">Loading State</p>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex flex-col gap-3 animate-pulse">
                                    <div className="w-full bg-neutral-300 dark:bg-neutral-700 aspect-video rounded-lg"></div>
                                    <div className="flex flex-col gap-2">
                                        <div className="h-4 w-3/4 rounded bg-neutral-300 dark:bg-neutral-700"></div>
                                        <div className="h-3 w-1/2 rounded bg-neutral-300 dark:bg-neutral-700"></div>
                                        <div className="h-4 w-1/4 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-1"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : projects.length > 0 ? (
                    /* Image Grid */
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex flex-col gap-3 pb-3 bg-white dark:bg-neutral-800 p-3 rounded-xl shadow-sm cursor-pointer"
                                onClick={() => navigate(`/projects/${project.id}`)}
                            >
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg bg-neutral-200"
                                    style={{ backgroundImage: `url("${project.imageUrl || 'https://placehold.co/600x400'}")` }}
                                ></div>
                                <div>
                                    <p className="text-primary dark:text-neutral-100 text-base font-medium leading-normal">{project.name}</p>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-normal leading-normal">Cliente: {project.clientName}</p>
                                    <div className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 mt-2 ${project.status === 'TO_DO' ? 'bg-status-todo/20 text-status-todo' :
                                        project.status === 'IN_PROGRESS' ? 'bg-status-progress/20 text-status-progress' :
                                            'bg-status-done/20 text-status-done'
                                        }`}>
                                        <p className="text-xs font-medium">{project.status ? project.status.replace('_', ' ') : 'Unknown'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col gap-y-4 p-4 mt-6 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium uppercase tracking-wider">Empty State</p>
                        <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 p-8 text-center mt-2">
                            <span className="material-symbols-outlined text-neutral-400 dark:text-neutral-500" style={{ fontSize: '48px' }}>folder_off</span>
                            <h3 className="text-primary dark:text-neutral-100 font-bold text-lg">Sem projetos ainda</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 max-w-xs text-sm">Comece seu primeiro projeto clicando no botão abaixo.</p>
                            <button
                                onClick={() => navigate('/projects/new')}
                                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 mt-2 bg-primary text-neutral-50 gap-2 text-sm font-bold"
                            >
                                <span className="material-symbols-outlined text-neutral-50" style={{ fontSize: '20px' }}>add</span>
                                <span>Novo Projeto</span>
                            </button>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-neutral-200 dark:border-neutral-700 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <div className="flex h-16 justify-around">
                    <a className="flex flex-1 flex-col items-center justify-center gap-1 text-primary dark:text-neutral-50" href="#">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>grid_view</span>
                        <span className="text-xs font-bold">Projetos</span>
                    </a>
                    <a
                        className="flex flex-1 flex-col items-center justify-center gap-1 text-neutral-500 dark:text-neutral-400 cursor-pointer"
                        onClick={(e) => { e.preventDefault(); alert('Funcionalidade em desenvolvimento'); }}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-xs font-medium">Configurações</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
