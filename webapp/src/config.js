const CONFIG = {
    APP: {
        NAME: process.env.APP_NAME || 'servers-ranking',
        FULL_URL: process.env.APP_FULL_URL || 'http://localhost',
    },
    API: {
        BASE_URL: process.env.API_BASE_URL || 'http://172.22.22.59:3000',
        SECRET_ENCRYPTION: process.env.API_SECRET_ENCRYPTION,
    },
    TRANSLATE: {
        DEBUG: process.env.TRANSLATE_DEBUG || false,
    },
    STORAGE: {
        TOKEN: process.env.NODE_ENV === 'development' ? 'token' : '5Aut%~L8C3D@.hd6',
        USERNAME: process.env.NODE_ENV === 'development' ? 'username' : '9]N45NtY[8bHi!*q',
    },
};
export default CONFIG;