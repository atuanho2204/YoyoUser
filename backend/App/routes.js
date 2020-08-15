module.exports = function(app) {
    const loginRoute = require('./endpoints/login');
    const roleRoute = require('./endpoints/roles');

    app.use('/api/login', loginRoute);
    app.use('/api/roles', roleRoute);

}
