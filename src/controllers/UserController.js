const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');


module.exports = {
    async save(req,res){
        const salt = bcrypt.genSaltSync(10);
        var {email, password} = req.body; 
        password =  bcrypt.hashSync(password, salt);
        console.log(password);
        const user = await User.create({
            email,
            password
        });
        return res.json({user})
    },
    async findByEmail(email){
        const user = await User.findOne({ email:email});
        return user;
    },
    async findById(id){
        const user = await User.findOne({ id:id});
        return user;
    },
};