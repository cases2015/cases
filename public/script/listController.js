/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("listController", function($scope,$http, $location) {
    if(!AV.User.current()){
        $location.path('/login');
    }
});