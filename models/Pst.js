const mongoose=require('mongoose');
const pstSchema=new mongoose.Schema({
    postname: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // URL to the image
    likes: { type: Number, default: 0 },
    comments: [{
        text: { type: String, required: true },
        username: { type: String, required: true }, // Username of the commenter
        createdAt: { type: Date, default: Date.now },
    }],
    shares: { type: Number, default: 0 },

    category:{
        type:[
            {
            type:String,
            enum:['public','private']
           }
        ]
      },
      p:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
      }]
    
});
const Pst =mongoose.model('Pst',pstSchema);
module.exports=Pst
