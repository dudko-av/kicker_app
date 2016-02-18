module.exports = {
    ip: 'localhost',
    port: 3333,
    db: 'mongodb://localhost/kicker_app',
    sessionSecret: 'devSessionSecret',
    facebook: {
        clientID: '1685748595015872',
        clientSecret: '814621629100fd4ac9f2ca1ed54e1fad',
        callbackURL: 'http://localhost:3333/auth/facebook/callback'
    },
    twitter: {
        consumerKey: 'sKrTcP9bMAINWGBWUAsGLCmcL',
        consumerSecret: '2CyWwR7zP2Xt15eKuXAo2wUWZrwOOLEfyKKFcfhPgIuxRcsmOK',
        callbackURL: 'http://localhost:3333/auth/twitter/callback'
    }
};
