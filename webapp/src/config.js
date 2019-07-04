const CONFIG = {
    APP: {
        NAME: process.env.APP_NAME || 'servers-ranking',
        FULL_URL: process.env.APP_FULL_URL || 'http://localhost',
    },
    API: {
        BASE_URL: process.env.API_BASE_URL || 'http://172.22.22.59:3000',
        SECRET_ENCRYPTION: process.env.API_SECRET_ENCRYPTION,
        LOGIN: {
            MAX_TRY: 5,
            RETRY_TIME: 15,
        }
    },
    TRANSLATE: {
        DEBUG: process.env.TRANSLATE_DEBUG || false,
    },
    STORAGE: {
        TOKEN: process.env.NODE_ENV === 'development' ? 'token' : '5Aut%~L8C3D@.hd6',
        LOGIN_TRY_COUNT: process.env.NODE_ENV === 'development' ? 'login_try_count' : '7AqK@KSi3ny(~3^8',
        LOGIN_LAST_TRY: process.env.NODE_ENV === 'development' ? 'login_last_try' : '3/3gXhXn<R9c(9M<',
    },
};
export default CONFIG;