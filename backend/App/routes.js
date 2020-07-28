module.exports = function(app) {
    const loginRoute = require('./endpoints/login');
    const roleRoute = require('./endpoints/roles');
    const userRoute = require('./endpoints/users');
    const productRoute = require('./endpoints/products');
    const emailRoute = require('./endpoints/emails');

    app.use('/api/login', loginRoute);  
    app.use('/api/roles', roleRoute);
    app.use('/api/users', userRoute);
    app.use('/api/products', productRoute);
    app.use('/api/emails', emailRoute);
}