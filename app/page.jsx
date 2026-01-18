'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function HomePage() {
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            redirect('/dashboard');
        } else {
            redirect('/login');
        }
    }, []);

    return <div className="flex items-center justify-center min-h-screen">Redirecionando...</div>;
}
