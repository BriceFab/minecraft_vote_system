const CONFIG = {
    APP: {
        NAME: process.env.REACT_APP_APP_NAME || 'servers-ranking',
        FULL_URL: process.env.REACT_APP_APP_FULL_URL || 'http://localhost',
    },
    API: {
        BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://172.22.22.59:3000',
        SECRET_ENCRYPTION: process.env.REACT_APP_API_SECRET_ENCRYPTION,
    },
    TRANSLATE: {
        DEBUG: process.env.REACT_APP_TRANSLATE_DEBUG || false,
    },
    STORAGE: {
        STORAGE_SECRET_ENCRYPTION: process.env.REACT_APP_STORAGE_SECRET_ENCRYPTION,
        TOKEN: process.env.NODE_ENV === 'development' ? 'token' : process.env.REACT_APP_STORAGE_TOKEN_KEY,
        USERNAME: process.env.NODE_ENV === 'development' ? 'username' : process.env.REACT_APP_STORAGE_USERNAME_KEY,
        REMEMBER: process.env.NODE_ENV === 'development' ? 'remember' : process.env.REACT_APP_STORAGE_REMEMBER_KEY,
        PASSWORD: process.env.NODE_ENV === 'development' ? 'password' : process.env.REACT_APP_STORAGE_PASSWORD_KEY,
    },
};
export default CONFIG;