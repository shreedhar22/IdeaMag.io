var express=require('express');
var router=express.Router();

var db = require("seraph")("http://localhost:7474");

person=function(obj){
	this.name=obj.name;
	this.age=obj.age;
	this.gender=obj.gender
}

p1=new person({name:"Chaitanya Datye",age:22,gender:"Male"});
p2=new person({name:"Nihar Godbole",age:23,gender:"Male"});
p3=new person({name:"Akash Kulkarni",age:23,gender:"Male"});
p4=new person({name:"Yash Bhambure",age:22,gender:"Male"});

var p=[p1,p2,p3,p4]
console.log(p[1].age);

for(var i=0;i<4;i++){
   console.log(p[i]);
   db.save(p[i], function(err, node) {
      if (err) {
     	console.log("error "+i);
  	    throw err;
      }
    });
   console.log(i +" inserted.");
}


/// to delete a node///
   //db.delete(node, function(err) {
  //  if (err) throw err;
   // console.log(p[i].name +" away!");
  //});
//// *********////

//db.readNode(2,function(err,))
