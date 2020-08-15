module.exports = function(app) {
    const loginRoute = require('./endpoints/login');

    app.use('/api/login', loginRoute);

}
