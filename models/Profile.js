const mongoose=require('mongoose');
const pSchema= new mongoose.Schema({

  profileName:{
    type:String,
    required:true,
  },
  category:{
    type:[
        {
        type:String,
        enum:['public','private']
       }
    ]
  },
  currentStatus:{
         type:[
            {
    type:String,
    enum:['single','married','bachulor','student','commited']
   } ]
},
  image:{
    type:String
  },
  user:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
  ],
  psts:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Pst'

    }
]



});
const Profile=mongoose.model('Profile',pSchema);
module.exports=Profile