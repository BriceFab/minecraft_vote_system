require('dotenv').config();

module.exports = {
    app: {
        env: process.env.ENV || 'dev',
        port: process.env.PORT || '3000',
        host: process.env.HOST || 'localhost:3000',
        contact: process.env.CONTACT || 'bricefab123@gmail.com',
    },
    db: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        name: process.env.DB_NAME || 'minecraft-vote',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        force: process.env.FORCE || false,
    },
    jwt: {
        encryption: process.env.JWT_ENCRYPTION || '!].9HqW[PFyxv9yq',
        expiration: process.env.JWT_EXPIRATION || 3600,
        request_encryption: process.env.JWT_REQUEST_ENCRYPTION || 'ib5[7T8^jW(N8@Dz',
    },
    log: {
        http_format: process.env.LOG_HTTP_FORMAT || ':method :url :status - :remote-addr :user-agent - :response-time ms',
    },
    vpn: {
        headers: [
            'HTTP_VIA',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_FORWARDED',
            'HTTP_CLIENT_IP',
            'HTTP_FORWARDED_FOR_IP',
            'VIA',
            'X_FORWARDED_FOR',
            'FORWARDED_FOR',
            'X_FORWARDED',
            'FORWARDED',
            'CLIENT_IP',
            'FORWARDED_FOR_IP',
            'HTTP_PROXY_CONNECTION',
        ]
    }
};