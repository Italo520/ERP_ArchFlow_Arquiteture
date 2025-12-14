import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectService from '../../services/project.service';
import api from '../../services/api';
import axios from 'axios';

export default function NewProject() {
    const [name, setName] = useState('');
    const [clientName, setClientName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            setIsUploading(true);

            // 1. Get Upload URL
            const { data } = await api.post('/api/v1/storage/upload-url', {
                fileName: file.name,
                contentType: file.type
            });

            // 2. Upload file
            await axios.put(data.url, file, {
                headers: { 'Content-Type': file.type }
            });

            // 3. Set Image URL (Local simulation convention)
            // In a real scenario, the backend should return the public URL or we construct it based on bucket/key
            const publicUrl = `${api.defaults.baseURL}/api/v1/storage/download/${file.name}`;
            setImageUrl(publicUrl);

        } catch (error) {
            console.error("Upload failed", error);
            setError('Falha no upload da imagem.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        setLoading(true);
        setError('');
        try {
            await ProjectService.createProject({ name, clientName, imageUrl });
            navigate('/dashboard');
        } catch (err) {
            setError('Erro ao criar projeto. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            <div className="flex-shrink-0">
                {/* TopAppBar */}
                <div className="flex h-16 items-center bg-background-light dark:bg-background-dark p-4 pb-2">
                    <button
                        aria-label="Voltar"
                        onClick={() => navigate('/dashboard')}
                        className="text-neutral-900 dark:text-neutral-50 flex h-12 w-12 shrink-0 items-center justify-center rounded-full cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <span className="material-symbols-outlined text-3xl">arrow_back</span>
                    </button>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto px-4">
                <div className="mx-auto flex h-full max-w-md flex-col justify-center">
                    {/* HeadlineText */}
                    <h1 className="text-neutral-900 dark:text-neutral-50 tracking-tight text-3xl font-bold leading-tight text-left pb-3 pt-6">Criar Novo Projeto</h1>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {/* Image Upload Area */}
                    <div className="py-3 flex flex-col items-center">
                        <div
                            className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-600 flex items-center justify-center cursor-pointer overflow-hidden relative group"
                            onClick={() => !isUploading && fileInputRef.current?.click()}
                        >
                            {imageUrl ? (
                                <>
                                    <img src={imageUrl} alt="Capa" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-white text-sm font-medium">Trocar Imagem</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <span className="material-symbols-outlined text-neutral-400 text-4xl mb-2">add_photo_alternate</span>
                                    <p className="text-neutral-500 text-sm">{isUploading ? 'Enviando...' : 'Adicionar Capa'}</p>
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileSelect}
                        />
                    </div>

                    {/* TextField for Project Name */}
                    <div className="py-3">
                        <label className="flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-200 text-base font-medium leading-normal pb-2">Nome do Projeto</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-900 dark:text-neutral-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-neutral-300 dark:border-neutral-600 bg-background-light dark:bg-background-dark focus:border-primary/80 h-14 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 p-4 text-base font-normal leading-normal"
                                placeholder="Insira o nome do projeto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                    </div>

                    {/* TextField for Client Name */}
                    <div className="py-3">
                        <label className="flex flex-col">
                            <p className="text-neutral-900 dark:text-neutral-200 text-base font-medium leading-normal pb-2">Nome do Cliente</p>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-neutral-900 dark:text-neutral-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-neutral-300 dark:border-neutral-600 bg-background-light dark:bg-background-dark focus:border-primary/80 h-14 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 p-4 text-base font-normal leading-normal"
                                placeholder="Insira o nome do cliente"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </main>

            <div className="flex-shrink-0">
                {/* ButtonGroup */}
                <div className="flex flex-1 flex-wrap gap-3 p-4 justify-between border-t border-neutral-200 dark:border-neutral-700 bg-background-light dark:bg-background-dark">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent border border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    >
                        <span className="truncate">Cancelar</span>
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white dark:text-neutral-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 disabled:opacity-50"
                    >
                        <span className="truncate">{loading ? 'Criando...' : 'Criar Projeto'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
