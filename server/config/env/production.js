module.exports = {
    db: process.env.OPENSHIFT_MONGODB_DB_URL + 'kickerapp',
    ip: process.env.OPENSHIFT_NODEJS_IP,
    port: process.env.OPENSHIFT_NODEJS_PORT,
    sessionSecret: 'devSessionSecret',
    facebook: {
        clientID: '1685748595015872',
        clientSecret: '814621629100fd4ac9f2ca1ed54e1fad',
        callbackURL: 'http://' + process.env.OPENSHIFT_APP_DNS + '/auth/facebook/callback'
    },
    twitter: {
        consumerKey: 'sKrTcP9bMAINWGBWUAsGLCmcL',
        consumerSecret: '2CyWwR7zP2Xt15eKuXAo2wUWZrwOOLEfyKKFcfhPgIuxRcsmOK',
        callbackURL: 'http://' + process.env.OPENSHIFT_APP_DNS + '/auth/twitter/callback'
    }
};
