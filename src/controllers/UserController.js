const User = require('../models/User');

module.exports = {
    async save(req,res){
        const {email, password} = req.body;
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
};