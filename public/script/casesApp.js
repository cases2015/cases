/**
 * Created by chenguanglv on 15/2/10.
 */

var casesApp = angular.module('cases',['ngRoute']);

casesApp.value('hasLogin',false);

casesApp.config(['$routeProvider', function ($routeProvider) {

    AV.initialize("i2glxgdp97a3lpxxqvdnsm64m2q4qedacpo48ux4a0vb5ja8", "n48oa1mwfpjt7hrnipusfytne06a8c0wyqnattlf9l7yhto9");

    $routeProvider
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'loginController'
        })
        .when('/list', {
            templateUrl: 'template/list.html',
            controller: 'listController'
        })
        .when('/detail', {
            templateUrl: 'template/detail.html',
            controller: 'detailController'
        })
        .when('/add',{
            templateUrl: 'template/add.html',
            controller: 'addController'
        })
        .when('/edit',{
            templateUrl: 'template/add.html',
            controller: 'editController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);