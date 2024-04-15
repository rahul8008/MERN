const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const bodyParser=require('body-parser');
const pRoutes= require('./routes/pRoutes');
const pstRoutes= require('./routes/pstRoutes');
const cors=require('cors');
const path =require('path');

const app=express()

const PORT= 8085;

dotenv.config();
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log("mongoDB running... successfully"))
.catch((error)=>
    console.log(`${error}`))

    app.use(bodyParser.json());
    app.use('/user',userRoutes);
    app.use('/p',pRoutes);
    app.use('/pst',pstRoutes);
    app.use('/uploads',express.static('uploads'));



app.listen(PORT,()=>{
    console.log('server running....');

});

app.use('/hai',(req,res)=>{
    res.send("<h1>welcome to socialmedia ");
})