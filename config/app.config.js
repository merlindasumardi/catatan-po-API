module.exports = {
    development: {
        port: process.env.PORT || '3000'
    },
    test: {
        port: process.env.PORT || '3000'
    },
    production: {
        port: process.env.PORT
    },
    getDefaultConfig() {
        return this[process.env.NODE_ENV || 'development'];
    }
};