export const BACKEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        GETUSER: '/auth/me',
        LOGOUT: '/auth/logout'
    }, 
    TASKS: '/tasks',
    CATEGORIES: '/categories'

} as const;


export const FRONTEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup'
    },
    TASKS: '/tasks'
} as const;