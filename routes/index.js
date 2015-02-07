var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');


var User=mongoose.model('User');
var JobPost=mongoose.model('JobPosts');

/*router.param('username',function(req,res,next,id){
      var query=User.findById(id);
      query.exec(function(err,user){
         if(err){return next(err);}
         if(!user){return next(new Error('Cant find user'));}

         req.user=user;
         return next();	
      })
});*/

/*router.get('/user/:user/jobPosts',function(req,res,next){
        
})*/
router.get('/',function(req,res,next){
  res.render('home');
})
//get user depending on the username specified
router.get('/users/:username',function(req,res,next){
    //  if(err){return next(err);}
      //if (password==req.user.password){
        console.log('with params');
       /* var query=User.findById(req.param('username'));
        console.log("query: "+query);
        query.exec(function(err,user){
         if(err){return next(err);}
         if(!user){return next(new Error('Cant find user'));}
             //req.user.populate('jobPosts',function(err,user){
             //	console.log(user.jobPosts);
             	console.log('with params')
              res.json(user);
             //})
         })*/
    
       User.findOne({"username":req.params.username}, function(err, user) {
            if (err){return next(err);}
            user.populate('jobPosts',function(err,user){
                if (err) { return next(err); }
                console.log(user.jobPosts[0].description)
                console.log(user.username);
                res.json(user);
            })
          
        });
        
     // }else{
     //     res.json("password incorrect");
     // }
})

router.post('/users',function(req,res,next){
	var user=new User(req.body);
	user.save(function(err,user){
		if(err){return next(err);}
		res.json(user);
	});
})
/*
router.get('/users',function(req,res,next){
	User.find(function(err,users){
		if(err){return next(err);}
    console.log('without params');
		res.json(users);
	});
});*/

//as soon as new job is posted enter that job for those users that match their interests//
router.post('/jobs',function(req,res,next){
	var job=new JobPost(req.body);
	job.save(function(err,job){
         if(err){return next(err);}
         User.find(function(err,users){
         	User.count(function(err,user_count){
              console.log(user_count);
         	  for(var i=0;i<user_count;i++){
         	     console.log("user " + i + ":"+users[i]);
         	     if(job.trend_rank==1)
         	     	users[i].jobPosts.push(job);
         	        users[i].save(function(err,user){
         	        	if(err){return next(err)};
         	        	console.log("user " + i + ":"+users[i].jobPosts);
         	        });
              }	
         	 });
          });        
         
        res.json(job);    
	})
})

router.get('/jobs',function(req,res,next){
	JobPost.find(function(err,jobs){
		if(err){return next(err);}
		console.log(jobs[1]);
		res.json(jobs)
	});

})

module.exports=router;