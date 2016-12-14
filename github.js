// Custom servis github
(function(){
    
    var github = function($http){
      
      // Metode zahvataju usera i repo preko github APIa
      var getUser = function(username){
            return $http.get("https://api.github.com/users/" + username)
                        .then(function(response){
                           return response.data; 
                        });
      };
      
      var getRepos = function(user){
            return $http.get(user.repos_url)  
                        .then(function(response){
                            return response.data;
                        });
      };
      
      // Omogucavam pristup metodama iz script.js
      return {
          getUser: getUser,
          getRepos: getRepos
      };
        
    };
    
    // Registrujem modul za za githubViewer koristeci factory
    var module = angular.module("githubViewer");
    module.factory("github", github);
    
}());

//
// Factory:
// Instead of duplicating code in our controllers, we can encapsulate this logic in factories.
// This makes our code better read-, maintain- and testable. 
// Good candiates for factories are i.e. REST-service calls... 