const express=require('express');
const pController= require('../controllers/pController');
const verifyToken =require('../middlewares/verifyToken');

const router= express.Router()
router.post('/add-profile',verifyToken,pController.addProfile);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:pId',pController.deleteProfileById);


module.exports=router;