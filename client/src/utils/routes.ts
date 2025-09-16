export const BACKEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        GETUSER: '/auth/me'
    }
} as const;


export const FRONTEND_ROUTES = {
    AUTH:
    {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup'
    }
} as const;