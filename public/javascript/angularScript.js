angular.module("JobRecommendation",['ui.router'])
  .config([
      '$stateProvider',
      '$urlRouterProvider',
        function($stateProvider,$urlRouterProvider){
          
          $stateProvider
           
             
             .state('login',{
                 url:'/login',
                 templateUrl:'/login.html',
                 controller:'LoginCtrl'
                 
             })

              
            $urlRouterProvider.otherwise('login'); 
        }
      ])
 /* .factory('jobPosts',['$http',function($http){
  	var o={
  		jobPosts:[]
  	}

  	o.getJobPosts=function(username){
       return $http.get('/users/'+username).then(function (res) {
       	   return res.data;
       })
  	}
    
     return o;
  }])*/

  .factory('users',['$http',function($http){
    var u={
      users:[]
    };

    return u;
  }])

 /*.controller('HomeCtrl',['$scope','jobPosts',function($scope,jobPosts){
    $jobPosts=jobPosts.jobPosts;
    $jobPost={title:'',description:'',company_name:''};
    $title='';
    $description='';
    $company_name='';
    $trend_rank='';
    
 }])*/

 .controller('LoginCtrl',['$scope','users',function($scope,users){
         $scope.users=users.users;
         
         $scope.username='';
         $scope.password='';
         $scope.name='';
         
         
         $scope.login=function(username,password){
          $scope.users.push({username:$scope.username,password:$scope.password,name:$scope.name})
         }          
 }])


