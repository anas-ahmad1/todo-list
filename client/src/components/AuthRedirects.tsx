'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { FRONTEND_ROUTES } from '@/utils/routes';


export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
    if (!user) {
        router.push(FRONTEND_ROUTES.AUTH.LOGIN);
    }
    }, [user, router]);

    if (!user) {
        return <p className="text-center mt-10">Redirecting...</p>;
    }

    return <>{children}</>;
}

