var mongoose=require('mongoose');

var jobPostSchema=new mongoose.Schema({
	title:String,
	description:String,
	company_name:String,
	trend_rank:{type:Number,default:1}
})

mongoose.model('JobPosts',jobPostSchema);