const User = require('../models/User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.SECRET || 'some other secret as default';

module.exports = {
    async save(req,res){
        User.findOne({emailAddress: req.body.emailAddress})
        .then(user => {
            if(user){
               let error = 'Email Address Exists in Database.';
               return res.status(400).json(error);
            } else {
               const newUser = new User({
                     name: req.body.name,
                     emailAddress: req.body.emailAddress,
                     password: req.body.password
                });
                const salt = bcrypt.genSaltSync(10);
                newUser.password =  bcrypt.hashSync(newUser.password, salt);
                newUser.save().then(user => res.json(user))
                          .catch(err => res.status(400).json(err));
         }
        });
    },
    async login (req,res) {
        const emailAddress = req.body.emailAddress;
        const password = req.body.password;   
        User.findOne({ emailAddress:emailAddress })
             .then(user => {
                if (!user) {
                   errors.emailAddress = "No Account Found";
                   return res.status(404).json(errors);
               }  
               if (bcrypt.compareSync(password, user.password)){
                   const payload = {
                     id: user._id,
                     name: user.name
                  };
                  jwt.sign(payload, secret, { expiresIn: "7d" },
                          (err, token) => {
                            if (err) res.status(500)
                            .json({ error: "Error signing token",
                                   raw: err }); 
                             res.json({ 
                             success: true,
                             token: `Bearer ${token}` });
                  });      
               }else {
                    errors = "Password is incorrect";                        
                    res.status(400).json(errors);   
                }
        }).catch(err => res.status(400).json(err));
      },
    async findByEmail(email){
        const user = await User.findOne({ email:email});
        return user;
    },
    async findById(id){
        const user = await User.findOne({ id:id});
        return user;
    },
    async find(req,res){
        const users = await User.find();
        return res.json({users})
    },
};