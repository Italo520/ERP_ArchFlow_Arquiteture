'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/authService';

const Register = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            await authService.register(fullName, email, password);
            // Redirect to login after successful registration
            router.push('/login');
        } catch (err) {
            setError('Falha no registro. Verifique os dados informados.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex w-full text-[#111] dark:text-white overflow-hidden">
            <div className="flex w-full min-h-screen">
                {/* Left Side: Architectural Imagery */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dark items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 mix-blend-overlay"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbWRImGuVFWfE-laP-pg7bh_uasnPLtM7YSJvIZ6sMUrEGqZqmG4EnWgKQ8ziTF6dbd_wyfuz9thbGbb0pWOG0JjbM3hgosiucxS9x5iz2WpKZNQx1dt7duiJVwajTivMlaYZKzWBcngoEIMzfeen-zsnpQdrno9mMWQygO079tQujyEvIsqkUsg1VZuKdsB_BZwLI4NoWsSN8tzd3ZSUVCXQRy-R0adxiRybbpoLXI3FMZHwewE_yTnvqpm134ifiiNrnFvKD9tM")' }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/40 to-transparent"></div>

                    <div className="relative z-10 max-w-lg px-12 text-center lg:text-left">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-[0_0_20px_rgba(56,224,123,0.3)]">
                            <span className="material-symbols-outlined text-background-dark text-4xl">architecture</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
                            Junte-se a nós<br />e inove.
                        </h2>
                        <p className="text-gray-300 text-lg font-light leading-relaxed">
                            Crie sua conta e comece a gerenciar seus projetos de arquitetura com eficiência.
                        </p>
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
                    <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined text-background-dark text-2xl">architecture</span>
                    </div>

                    <div className="w-full max-w-[420px] flex flex-col gap-8">
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Crie sua conta</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-base">Preencha os dados abaixo para começar.</p>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <form className="flex flex-col gap-5" onSubmit={handleRegister}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 ml-1" htmlFor="fullName">Nome Completo</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">badge</span>
                                    </div>
                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-border-green rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-gray-400 dark:text-white transition-all"
                                        placeholder="Seu nome completo"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 ml-1" htmlFor="email">E-mail</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">mail</span>
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-border-green rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-gray-400 dark:text-white transition-all"
                                        placeholder="seu@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 ml-1" htmlFor="password">Senha</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 pl-12 pr-12 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-border-green rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-gray-400 dark:text-white transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-200 ml-1" htmlFor="confirmPassword">Confirmar Senha</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full h-14 pl-12 pr-12 bg-gray-100 dark:bg-surface-dark border border-gray-200 dark:border-border-green rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-gray-400 dark:text-white transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary h-12 px-6 text-background-dark text-base font-bold tracking-wide hover:bg-green-400 hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Criando conta...' : 'Criar Conta'}
                            </button>
                        </form>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Já tem uma conta?</span>
                            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => router.push('/login')}
                                className="w-full h-12 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-medium hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                            >
                                Fazer Login
                            </button>
                        </div>
                    </div>

                    <div className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-600">
                        © 2024 Architecture ERP System. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
