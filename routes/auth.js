const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');

//Validation



router.post('/register', async (req,res) => {

    const {error} =  registerValidation(req.body);
    
    if (error) return  res.status(400).send(error.details[0].message);

        //Checking if the user is already in database

        const emailExist =await  User.findOne({email:req.body.email});
        
        if(emailExist  ) return  res.status(400).send('email exits');

        //hash password
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(req.body.password,salt);

            const user = new User({
                name : req.body.name,
                email : req.body.email,
                password:hashPassword

            });
    console.log(user);
    try{
        const saveUser = await user.save();
        res.send(user._id);
        console.log(saveUser);
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.post('/login',async (req,res)=>{
    const{error} = loginValidation(req.body);
    console.log(req.body.email);
    if(error) return res.status(400).send(error.details[0].message)
    const user =await User.findOne({email: req.body.email});
    console.log(user);
    if(!user) return res.status(400).send('Invalid Email');

    const validPass = await bcrypt.compare(req.body.password, user.password);
  
    if(!validPass) return  res.status(400).send('invalid password');
    //Create and assign a token
    const token  = jwt.sign({_id: user._id},process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    
}) 

module.exports = router;