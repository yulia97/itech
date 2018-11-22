

var TestController = require('./controllers/TestController.js');


var UserController = require('./controllers/UserController.js');

module.exports = function(app){
    app.get('/', TestController.home)
    app.get('/p', TestController.promise)
    app.get('/a', TestController.async)



    app.post('/user', UserController.newUser)


}


