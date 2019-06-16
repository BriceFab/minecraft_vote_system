require('dotenv').config();

module.exports = {
    app: {
        env: process.env.ENV || 'dev',
        port: process.env.PORT || '3000',
        contact: process.env.CONTACT || 'bricefab123@gmail.com',
    },
    db: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        name: process.env.DB_NAME || 'minecraft-vote',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password'
    },
    jwt: {
        encryption: process.env.JWT_ENCRYPTION || '!].9HqW[PFyxv9yq',
        expiration: process.env.JWT_EXPIRATION || '60',
    },
};