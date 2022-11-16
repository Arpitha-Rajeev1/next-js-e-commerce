import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var cryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken')

const handler = async (req, res) => {
    
    if(req.method == 'POST'){

        let user = await User.findOne({"email": req.body.email})
        const bytes = cryptoJS.AES.decrypt(user.password, "secret123")
        const decryptedPass = bytes.toString(cryptoJS.enc.Utf8)
        
        if(user && req.body.email == user.email && req.body.password == decryptedPass){
            var token = jwt.sign({email: user.email, name: user.name}, 'jwtsecret')
            res.status(200).json({success: true, token})
        }
        else if(req.body.email !== user.email || req.body.password !== decryptedPass) {
            res.status(200).json({ success: false, error: 'Invalid credentials'})
        }
        if(!user) {
            res.status(200).json({ success: false, error: 'No user found' })
        }
    }
    else{
        res.status(400).json({error: 'This method is not allowed. Sorry!'})
    }
}

export default connectDb(handler)

  