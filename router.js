

var TestController = require('./controllers/TestController.js');

module.exports = function(app){
    app.get('/', TestController.home)
}


