module.exports = function(app, passport, passportConf) {

    app.get('/auth/instagram', passport.authenticate('instagram'));
    app.get('/auth/instagram/callback', passport.authenticate('instagram', {
        failureRedirect: '/login'
    }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_location']
    }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });

    app.get('/auth/twitter', passport.authenticate('twitter'));
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/login'
    }), function(req, res) {
        res.redirect(req.session.returnTo || '/');
    });


};