const Profile=require('../models/Profile');
const User =require('../models/User');
const multer =require('multer');


const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ Path2D.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addProfile= async(req,res)=>{
  
    try {
        const {profileName,category,currentStatus}=req.body;
        const image=req.file? req.file.filename:undefined;
        
    
        const user= await User.findById(req.userId);
        if(!user){
            res.status(400).json({message:"user not found"})
        }
        const p=new Profile({
            profileName,category,currentStatus,image,user:user._id
        })
    const savedProfile= await p.save();

    user.p.push(savedProfile)
    await user.save()


    return res.status(200).json({message:"Profile added successfully"})
     } catch (error) {
        console.error(error)
        res.status(500).json("internal server error")
    }
}
const deleteProfileById=async(req,res)=>{
    try {
        const pId=req.params.pId;
        const deleteProfile=await Profile.findByIdAndDelete(pId);
        if(!deleteProfile){
            return res.status(404).json({error:"no profile founded"})
        }

        
    } catch (error) {
        console.error(error)
        res.status(500).json("internal server error")
        
    }
}


module.exports={addProfile:[upload.single('image'),addProfile],deleteProfileById}