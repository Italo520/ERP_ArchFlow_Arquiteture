import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Rotas públicas
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // Se não tem token e está tentando acessar rota protegida
    if (!token && !isPublicRoute && pathname !== '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Se tem token e está na página de login/register, redirecionar para dashboard
    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
