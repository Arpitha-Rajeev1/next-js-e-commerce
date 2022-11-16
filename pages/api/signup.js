import User from '../../models/User'
import connectDb from '../../middleware/mongoose'
var cryptoJS = require("crypto-js");

const handler = async (req, res) => {
    
    if(req.method == 'POST'){
        const {name, email} = req.body
        let u = new User({name, email, password: cryptoJS.AES.encrypt(req.body.password, "secret123").toString()})
        await u.save()
        res.status(200).json({ success: 'success'})
    }
    else{
        res.status(400).json({error: 'This method is not allowed. Sorry!'})
    }
}

export default connectDb(handler)

  