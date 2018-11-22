

var TestController = require('./controllers/TestController.js');


var UserController = require('./controllers/UserController.js');

module.exports = function(app){
    app.get('/', TestController.home)
    app.get('/p', TestController.promise)
    app.get('/a', TestController.async)




    app.post('/user', UserController.create)
    app.get('/user/:id', UserController.get)
    app.get('/user', UserController.getAll)
    app.delete('/user/:id', UserController.remove)
    app.put('/user/:id', UserController.update)
    
    
}


