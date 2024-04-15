const Pst=require("../models/Pst");
const multer =require("multer");
const Profile=require('../models/Profile')

const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+ Path2D.extname(file.originalname));
    }
});
const upload=multer({storage:storage});

const addPst=async(req,res)=>{
    try {
        const {postname,like,comment,share,description}=req.body;
        const image=req.file? req.file.filename:undefined;

        const pId= req.params.pId;
        const p=await Profile.findById(pId);
        if(!p){
            return res.status(404).json({error:"no Profile in found"});

        }
        const pst=new Pst({
            postname,like,comment,share,description,image,p:p._id
         })
         const savedPst=await pst.save()
         p.psts.push(savedPst);
         await p.save()
         res.status(200).json(savedPst)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"insternal server error"})
        
    }
}
const getPstByProfile= async(req,res)=>{
    try {
        const pId=req.params.pId;
        const p=await Profile.findById(pId);
        if(!p){
            return res.status(400).json({error:"no profile found"});
        }
        const profilename=p.profileName
        const psts=await Pst.find({p:pId});
        res.status(200).json({profilename,psts});
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"insternal server error"})
    }

}
const deletePstById=async(req,res)=>{
    try {
        const pstId=req.params.pstId;
        const deletePst=await Pst.findByIdAndDelete(pstId);
        if(!deletePst){
            return res.status(404).json({error:"no profile founded"})
        }

        
    } catch (error) {
        console.error(error)
        res.status(500).json("internal server error")
        
    }
}


module.exports={addPst:[upload.single('image'),addPst],getPstByProfile,deletePstById};
