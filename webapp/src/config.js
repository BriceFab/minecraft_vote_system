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
    }
};
export default CONFIG;