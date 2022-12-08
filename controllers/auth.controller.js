const db=require('../models/index')
const config=require("../configs/auth.config");
const transporter=require('../utils/send.mail');

const User=db.user;

const Op=db.Sequelize.Op;//Operations

var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');


exports.singup=(req,res)=>{
console.log("Inside the sign up call")
    //Save User to Database
    console.log("In Signup");
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    })

    .then(user=>{
        console.log("User careated");
                res.send({
                message:"User Register Successfully !"
                });
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })

}

exports.signin = (req, res) => {
    
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        //Checking if the username is valid
        if(!user) {
            return res.status(404).send({ message: "User not found"});
        }

        //Checking if the password entered is valid. 
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password"
            })
        }

        //If both are valid, creating the token. 
        var token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 86400 //24 hours
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Forgot password API via mail
 */
exports.forgot=async (req,res)=>{

    User.findOne({
        where:{
            email:req.body.email
        }
    })
    .then((email)=>{
        if(!email){
            return res.status(404).send({
                message:"User note fount this email please enter correct email"
            })
        }
        var mailoptions={
            from:'kumarnitesh88771@gmail.com',
            to:email,
            subject:"You requested to reset your password.",
            text:"Please, click the link below to reset your password"
        }
        transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.log(err);
            }else{
                return res.status(200).send({
                    email:info,
                    message:"Email send successfully"
                })
            }
        })

    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    })
}

/**
 * Forgot password only database
 */

 exports.forgot_db=async (req,res)=>{

    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then((username)=>{
        if(!username){
            return res.status(404).send({
                message:"User note fount this email please enter correct email"
            })
        }

             res.status(200).send({
                username:username.username,
                email:username.email,
                password:username.password
            })
        .catch((err)=>{
             res.status(404).send(({
                message:err
             }))
        })
        

    })
    .catch((err)=>{
        res.status(500).send({
            message:err.message
        })
    })
}