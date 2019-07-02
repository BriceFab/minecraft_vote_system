const CONFIG = {
    APP: {
        NAME: process.env.APP_NAME || 'servers-ranking',
        FULL_URL: process.env.APP_FULL_URL || 'http://localhost',
    },
    API: {
        BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
        SECRET_ENCRYPTION: process.env.API_SECRET_ENCRYPTION || 'ib5[7T8^jW(N8@Dz',
    },
    TRANSLATE: {
        DEBUG: process.env.TRANSLATE_DEBUG || false,
    }
};
export default CONFIG;