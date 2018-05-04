const appConfig = {
    HOST: '127.0.0.1',
    PORT: '3306',
    DATABASE: 'pet',
    USER: 'root',
    PASSWORD: 'root',
    DIALECT: 'mysql',
    POOL: {
        MAX: 20,
        min: 5
    }
};

module.exports = appConfig;
