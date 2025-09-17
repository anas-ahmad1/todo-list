'use client';

import { ProtectedRoute } from '@/components/AuthRedirects';
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { FRONTEND_ROUTES } from '@/utils/routes';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const goToTasks = () => {
    router.push(FRONTEND_ROUTES.TASKS);
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen flex flex-col mt-20 items-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome {user?.name ?? "Guest"}!
      </h1>
      <p className="text-lg md:text-2xl mb-8 text-center max-w-xl">
        Your personal productivity hub. Track your tasks and stay on top of your day!
      </p>
      <button
        onClick={goToTasks}
        className="px-6 py-3 primary-bg font-semibold rounded-lg shadow-lg hover:bg-gray-100"
      >
        Go to My Tasks
      </button>
    </div>
    </ProtectedRoute>
  );
}
