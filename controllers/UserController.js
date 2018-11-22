var exports = module.exports = {}
var userM = require('../models/User.js').User

exports.newUser = async function(req, res){

    try {	
	//console.log(req.body)
	let user = await userM.create(req.body)
	res.json(user)
	//let user2 = await userM.findOne({id: 1})
	//console.log(user2)
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
  http://localhost:3000/api/login

*/
