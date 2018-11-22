const express = require('express')
const app = express()
const port = 3000
const host = "192.168.56.101"

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/lets-build-this-2", {useNewUrlParser: true });
var db = mongoose.connection;


db.on('error', function () {
    console.log('Database error');
});
db.once('open', function() {
    console.log('Nice! Database looks fine');
});

require('./router.js')(app)

var server = app.listen(port, host, () => {
    var host = server.address().address
    var port = server.address().port


    console.log(`Example app listening on ${host} port ${port}!`)


})





