export const BACKEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        GETUSER: '/api/auth/me',
        LOGOUT: '/api/auth/logout'
    }, 
    TASKS: '/api/tasks',
    CATEGORIES: '/api/categories'

} as const;


export const FRONTEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup'
    },
    TASKS: '/tasks'
} as const;