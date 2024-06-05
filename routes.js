const { signUp, login } = require('./routes/userRoutes');
const { authenticate } = require('./middleware/authenticate');
const { createproject,getproject,updateproject,deleteproject } = require('./controllers/projectController');
const { createfile,updatedfile,deletefile } = require('./controllers/fileController');

function initRoutes(app) {
    app.post('/signup', signUp);
    app.post('/login', login);
    app.post('/',authenticate,createproject);
    app.get('/',authenticate,getproject);
    app.put('/',authenticate,updateproject);
    app.delete('/',authenticate,deleteproject);
    app.post('/files/:id',authenticate,createfile);
    app.put('/files/:id',authenticate,updatedfile);
    app.delete('/files/:id',authenticate,deletefile);
}

module.exports = { initRoutes };
