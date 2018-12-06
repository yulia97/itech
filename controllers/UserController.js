var exports = module.exports = {}
var userM = require('../models/User.js').User
let jsonwebtoken =  require('jsonwebtoken')

let jwtOptions = {}
jwtOptions.secret = '38c07082-f8fe-11e8-8eb2-f2801f1b9fd1';

exports.create = async function(req, res){
    try {	
	let rawUser = req.body
	let validatedUser = rawUser

	console.log(validatedUser)
	
	let user = await userM.create(validatedUser)

	console.log(user)	
	res.json(user)
    }
    catch(e){
	console.log(e)

	res.json({error : '500'})
    }
}


function pwd_compare(up, got){
    return up === got
}

async function login(email, password){
    try {
	let user = await userM.findOne({email: email})

	if (!user) return null

	if (!pwd_compare(user.password, password)) return null

	let token = await jsonwebtoken.sign({id: user.id}, jwtOptions.secret)
	console.log(token)	
	return {token: token}
    }
    catch(e){
	console.log(e)
	return null
    }
}

exports.login = async function(req, res){
    res.json(await login('ggg', '123456789'))
}

exports.get = async function(req, res){
    try {
	console.log(req.params);
	let user = await userM.findOne({_id: req.param.id})
	if (!user){
	    res.json({error : 404})
	    return
	}
	res.json(user)
    }
    catch(e){
	console.log(e)

	res.json({error : "500"})
    }
}



exports.getAll = async function(req, res){
    try {
	console.log(req.params);
	let users = await userM.find()
	res.json(users)
    }
    catch(e){
	console.log(e)

	res.json({error : "500"})
    }
}




exports.remove = async function(req, res){
    try {
	let user = await userM.findOneAndRemove({_id: req.param.id})
	res.json(user)
    }
    catch(e){
	console.log(e)

	res.json({error : true})
    }
}





exports.update = async function(req, res){
    try {

	let rawBody = req.body
	let validatedBody = rawBody

	console.log(validatedBody)


	let descriptor = {_id : req.param.body}
	await userM.where(descriptor).updateOne(validatedBody)
	let user = await userM.findOne(descriptor)
	//let user = await userM.findOneAndUpdate(descriptor, req.param.body)
	
	
	res.json(user)
    }
    catch(e){
	console.log(e)

	res.json({error : true})
    }
}


async function awaitEverything(pool){
    if (pool.length == 0) console.log('done')
    
    let newPool = pool.slice(1)
    await pool[0];
    return await awaitEverything(newPool)  
} 

exports.copy = async function(req, res){
    let rp = require('request-promise')
    try {
	    var options = {
	method: 'GET',
	uri: 'https://firebasestorage.googleapis.com/v0/b/historymap-1994.appspot.com/o/Data%2Fdata.json?alt=media&token=9ff62e7c-9851-48c3-a449-0de50b27b7a5',
	json: true
    };

	let response = await rp(options);
	
	
	let data =  response.map(async x => {
	    return await userM.create({
		"email" : x["_id"],
		"password" : x["_id"],
		"role": "admin"
	    })
	})

	awaitEverything(data)	
	
	console.log(data);
	/*
	  
	
	
	  */
	res.json({kk : "ok"})
    }  catch (e) {
	console.log(e)
	res.json({})
    }
}

// 





/*

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id":"1","email":"test@test.ru","password":"xyz", "role":"admin"}' \
  http://localhost:3000/user

*/
