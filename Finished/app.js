// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
   
    this.city = "London";
    
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function($scope, $resource, cityService) {
    
    $scope.city = cityService.city;


    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=50daf28ce580c3c55c9671d17041b46f");

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city });
    
    console.log($scope.weatherAPI);
    console.log($scope.weatherResult);
    function getFullInfo() {
        setTimeout(() => {
            console.log($scope.weatherResult.list[0]);
        }, 4000);
    }
    getFullInfo();
    
}]);

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=50daf28ce580c3c55c9671d17041b46f