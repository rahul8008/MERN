const User=require('../models/User');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretkey=process.env.WhatIsYourName


const UserRegister= async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const userEmail= await User.findOne({email});
        if(userEmail){
            return res.status(400).json("email is already registered");
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser= new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();
        res.status(201).json({message:"user registered successfully"});
        console.log('registered')

    }catch(error){
        console.error(error);
        res.status(500).json({error:"internal server error"})

    }

}
const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error:"invalid username or password"})

        }
        const token=jwt.sign({userId:user._id},secretkey,{expiresIn:"1h"})



        res.status(200).json({success:"login successfully",token});
        console.log(email,"token :",token);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error "});
    }
}
const getAllUsers=async(req,res)=>{
    try {
        const users =await User.find().populate('p');
        res.json({users})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error "});
        
    }
}
const getUserById=async(req,res)=>{
    const userId=req.params.anu;
    try {
        const user =await User.findById(userId);
        if(!user){
            return res.status(400).json({error:"user not founded"})
        }
        res.status(200).json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error "});
        
    }
}
module.exports={UserRegister,userLogin, getAllUsers,getUserById}
    