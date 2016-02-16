module.exports = {
    db: process.env.OPENSHIFT_MONGODB_DB_URL + 'kicker_app',
    ip: process.env.OPENSHIFT_NODEJS_IP,
    port: process.env.OPENSHIFT_NODEJS_PORT,
    // db: 'mongodb://localhost/kicker_app',
    sessionSecret: 'devSessionSecret',
    facebook: {
        clientID: '1685748595015872',
        clientSecret: '814621629100fd4ac9f2ca1ed54e1fad',
        callbackURL: 'http://localhost:3333/auth/facebook/callback'
    }
};
