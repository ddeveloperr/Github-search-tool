// Code goes here

(function() {
    
    // ANGULAR MODUL
    var app = angular.module("githubViewer", []);
    //The scope is the binding part between the HTML (view) and the JavaScript (controller). 
    // The $scope is an object with the available properties and methods.
    // The scope is available for both the view and the controller.
    // github is the custom angular service (github.js is source)
    // The $interval-service executes a method after a certain delay, which is specified in milliseconds.
    
    // CONTROLLER
    var MainController = function(
        $scope, github, $interval, 
        $log, $anchorScroll, $location) {
        
        var onUserComplete = function(data) {
            $scope.user = data;
            // Pozivam metodu getRepos iz custom servisa github.js
            github.getRepos($scope.user).then(onRepos, onError);
        };

        var onRepos = function(data) {
            $scope.repos = data;
            $location.hash("userDetails");
            $anchorScroll();
        };

        var onError = function(reason) {
            $scope.error = "Could not fetch the data.";
        };
        
        // Moja metoda za incrementaciju countdown
        var decrementCountdown = function(){
            $scope.countdown -= 1;
            if($scope.countdown < 1){
                $scope.search($scope.username);
            }
        };

        var countdownInterval = null;
        var startCountdown = function(){
            // koristim $interval service
            countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
        };
        
        // Pakujem sve u metodu search
        $scope.search = function(username) {
            // Ispisujem u JS konzoli pocetak searcha...(prati dev tools)
            $log.info("Searching for " + username);
            // Pozivam metodu getUser iz custom servisa github.js, primjenjujuci promise in JS 
            github.getUser(username).then(onUserComplete, onError);
            if(countdownInterval)    {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };
        
        // Postavljam defaultne vrijednosti na jednom mjestu!
        $scope.username = "ddeveloperr";
        $scope.message = "GitHub Search Tool";
        $scope.repoSortOrder = "-stargazers_count";
        //$scope.countdown = 5;
        startCountdown();


    };

    app.controller("MainController", MainController);

}());