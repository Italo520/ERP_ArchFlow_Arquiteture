'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError('Falha no login. Verifique suas credenciais.');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            setError('Um erro inesperado ocorreu.');
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
                            Construindo o futuro,<br />projeto por projeto.
                        </h2>
                        <p className="text-muted-foreground text-lg font-light leading-relaxed">
                            Gerencie seus projetos de arquitetura com precisão, controle financeiro e estilo inigualável.
                        </p>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative bg-background">
                    <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(54,226,123,0.3)]">
                        <span className="material-symbols-outlined text-primary-foreground text-2xl">architecture</span>
                    </div>

                    <div className="w-full max-w-[420px] flex flex-col gap-8">
                        <div className="text-left">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">Acesse sua conta</h1>
                            <p className="text-muted-foreground text-base">Bem-vindo de volta ao seu painel de controle.</p>
                        </div>

                        {error && (
                            <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-foreground ml-1" htmlFor="email">E-mail ou Usuário</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">person</span>
                                    </div>
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-14 pl-12 pr-4 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-muted-foreground text-foreground transition-all"
                                        placeholder="ex: arq@studio.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-foreground" htmlFor="password">Senha</label>
                                    <a href="#" className="text-sm font-semibold text-primary hover:text-green-400 transition-colors">Esqueceu a senha?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-14 pl-12 pr-12 bg-secondary/50 border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-base placeholder:text-muted-foreground text-foreground transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary h-12 px-6 text-primary-foreground text-base font-bold tracking-wide hover:opacity-90 hover:shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </form>

                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">Novo por aqui?</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/register"
                                className="w-full h-12 rounded-full border border-border text-foreground font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                            >
                                Criar uma conta
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

export default Login;
