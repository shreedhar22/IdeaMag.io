var mongoose=require('mongoose');

var userpostSchema=new mongoose.Schema({
      description:String,
      image:String,
      link:String
});

mongoose.model('userPost',userpostSchema);