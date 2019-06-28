const CONFIG = {
    APP: {
        NAME: process.env.APP_NAME || 'servers-ranking',
        FULL_URL: process.env.APP_FULL_URL || 'http://localhost',
    },
    API: {
        BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
    },
};
export default CONFIG;