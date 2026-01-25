'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { resetPassword } from '@/app/actions/auth';

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Link de recuperação inválido ou ausente.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        setLoading(true);

        try {
            const res = await resetPassword({ password, token });
            if (res.error) {
                setError(res.error);
            } else {
                setMessage(res.message);
                setSuccess(true);
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            }
        } catch (err) {
            setError('Ocorreu um erro inesperado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-display bg-background min-h-screen flex w-full text-foreground overflow-hidden">
            <div className="flex w-full min-h-screen">
                {/* Left Side: Architectural Imagery */}
                <div className="hidden lg:flex lg:w-1/2 relative bg-muted items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center opacity-60 mix-blend-overlay"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbWRImGuVFWfE-laP-pg7bh_uasnPLtM7YSJvIZ6sMUrEGqZqmG4EnWgKQ8ziTF6dbd_wyfuz9thbGbb0pWOG0JjbM3hgosiucxS9x5iz2WpKZNQx1dt7duiJVwajTivMlaYZKzWBcngoEIMzfeen-zsnpQdrno9mMWQygO079tQujyEvIsqkUsg1VZuKdsB_BZwLI4NoWsSN8tzd3ZSUVCXQRy-R0adxiRybbpoLXI3FMZHwewE_yTnvqpm134ifiiNrnFvKD9tM")' }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>

                    <div className="relative z-10 max-w-lg px-12 text-center lg:text-left">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-[0_0_20px_rgba(56,224,123,0.3)]">
                            <span className="material-symbols-outlined text-primary-foreground text-4xl">architecture</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                            Defina sua nova senha.
                        </h2>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            A segurança é fundamental na arquitetura. Escolha uma senha forte para proteger seu trabalho e seus projetos.
                        </p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-background">
                    <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined text-primary-foreground text-2xl">architecture</span>
                    </div>

                    <div className="w-full max-w-[420px] flex flex-col gap-8">
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Redefinir Senha</h1>
                            <p className="text-muted-foreground text-base">Insira sua nova senha abaixo.</p>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {message && (
                            <div className="bg-primary/10 border border-primary text-primary px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{message}</span>
                            </div>
                        )}

                        {!success && (
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-foreground ml-1" htmlFor="password">Nova Senha</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">lock</span>
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-14 pl-12 pr-4 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-muted-foreground text-foreground transition-all"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-foreground ml-1" htmlFor="confirmPassword">Confirmar Nova Senha</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full h-14 pl-12 pr-4 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-muted-foreground text-foreground transition-all"
                                            placeholder="••••••••"
                                            required
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !token}
                                    className="mt-4 flex w-full items-center justify-center rounded-full bg-primary h-12 px-6 text-primary-foreground text-base font-bold tracking-wide hover:opacity-90 hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Redefinindo...' : 'Atualizar Senha'}
                                </button>
                            </form>
                        )}

                        <div className="text-center">
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-primary hover:text-green-400 transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Voltar para o login
                            </Link>
                        </div>
                    </div>

                    <div className="absolute bottom-6 text-xs text-muted-foreground">
                        © 2024 Architecture ERP System. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
