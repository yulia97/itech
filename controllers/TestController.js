var exports = module.exports = {}
var request = require('request');




exports.home = function(req, res){

    var i = 0;
    request('https://google.com', function (error, response, body) {
	
	console.log(i++)

	if (error) console.log(error)
	request('https://google.com', function (error, response, body) {
	
	    console.log(i++)
if (error) console.log(error)
	    
	    request('https://google123.com', function (error, response, body) {
		
		console.log(i++)
		if (error) console.log(error)
		
		res.send('done'+i)
	    });	
	});	
    });

    

}


exports.promise = function(req, res){

    
    var rp = require('request-promise');

    rp('http://www.ya.ru')
        .then(function (htmlString) {
	    rp('http://www.ya.ru')
		.then(function (htmlString) {
		    rp('http://www.ya.ru')
			.then(function (htmlString) {
			    res.send(htmlString)
			})
		})
	})
        .catch(function (err) {
	    console.log(err)
	    res.json({})
	});
}





exports.async = async function(req, res){
    let request = require('async-request')


    try {
	let response = await request('https://ya.ru/');
	let response1 = await request('https://ya.ru/');
	let response2 = await request('https://ya.ru/');
	
	
	console.log('Success')
	res.send(response2.body)
    }  catch (e) {
	console.log(e)
	res.json({})
    }
}


