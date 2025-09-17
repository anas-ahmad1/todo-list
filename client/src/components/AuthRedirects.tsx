'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { FRONTEND_ROUTES } from '@/utils/routes';


export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
    if (!loading && !user) {
        router.push(FRONTEND_ROUTES.AUTH.LOGIN);
    }
    }, [user, loading, router]);

    if (loading) {
        return <p className="text-center mt-10">Loading user...</p>
    }

    if (!user) {
        return <p className="text-center mt-10">Redirecting...</p>;
    }

    return <>{children}</>;
}

