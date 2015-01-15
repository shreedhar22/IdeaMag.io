var mongoose=require('mongoose')

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    name:String,
    field:String,
    jobPosts:[{type:mongoose.Schema.Types.ObjectId,ref:'JobPosts'}],
   // projects:[],
   // experience:[]
});

mongoose.model('User',userSchema);