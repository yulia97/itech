

var TestController = require('./controllers/TestController.js');
var UserController = require('./controllers/UserController.js');



module.exports = function(app, passport){
    app.get('/', TestController.home)
    app.get('/p', TestController.promise)
    app.get('/copy', TestController.async)
    


    let authGuard = passport.authenticate('jwt', {session:false})
    app.post('/user', authGuard, UserController.create)
    app.get('/user/:id', authGuard, UserController.get)
    app.get('/user', authGuard, UserController.getAll)
    
    app.delete('/user/:id', authGuard, UserController.remove)
    app.put('/user/:id', authGuard, UserController.update)
    
    app.get('/login', UserController.login)

    
    
    //app.get('/populate', UserController.copy)
    
    
}


