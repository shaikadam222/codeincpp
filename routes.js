const { signUp, login } = require('./controllers/userController');
const { authenticate } = require('./middleware/authenticate');

function initRoutes(app) {
    app.post('/signup', signUp);
    app.post('/login', login);
}

module.exports = { initRoutes };
