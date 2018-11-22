var exports = module.exports = {}
var userM = require('../models/User.js').User

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



exports.get = async function(req, res){
    try {
	console.log(req.params);
	let user = await userM.findOne({id: req.param.id})
	if (!user) {
	    res.json({error : "404"})
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
	let user = await userM.findOneAndRemove({id: req.param.id})
	
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


	let descriptor = {id : req.param.body}
	await userM.where(descriptor).updateOne(validatedBody)
	let user = await userM.findOne(descriptor)
	
	res.json(user)
    }
    catch(e){
	console.log(e)

	res.json({error : true})
    }
}






/*

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"id":"1","email":"test@test.ru","password":"xyz", "role":"admin"}' \
  http://localhost:3000/user

*/
