const { signUp, login } = require('./routes/userRoutes');
const { authenticate } = require('./middleware/authenticate');
const { createproject } = require('./controllers/projectController');

function initRoutes(app) {
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/',authenticate,createproject);
}

module.exports = { initRoutes };
