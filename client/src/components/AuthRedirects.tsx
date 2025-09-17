'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { FRONTEND_ROUTES } from '@/utils/routes';
import Spinner from '@/components/Spinner'


export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
    if (!loading && !user) {
        router.push(FRONTEND_ROUTES.AUTH.LOGIN);
    }
    }, [user, loading, router]);

    if (loading) return <Spinner />
    if (!user) return <Spinner />
    
    return <>{children}</>;
}

