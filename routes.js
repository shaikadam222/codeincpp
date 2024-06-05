const { signUp, login } = require('./routes/userRoutes');
const { authenticate } = require('./middleware/authenticate');
const { createproject,getproject,updateproject,deleteproject } = require('./controllers/projectController');

function initRoutes(app) {
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/',authenticate,createproject);
    app.get('/',authenticate,getproject);
    app.put('/',authenticate,updateproject);
    app.delete('/',authenticate,deleteproject);
}

module.exports = { initRoutes };
