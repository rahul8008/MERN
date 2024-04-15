const express=require('express');
const pstController=require("../controllers/pstController");

const router=express.Router();

router.post('/add-pst/:pId',pstController.addPst);
router.get('/:pId/psts',pstController.getPstByProfile)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});
router.delete('/:pstId',pstController.deletePstById);

module.exports=router;