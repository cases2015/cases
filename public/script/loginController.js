/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("loginController", function($scope,$http, $location) {

    $scope.user = {};

    $scope.doLogin = function(){
        if($scope.user.username || $scope.user.password){
            AV.User.logIn(
                $scope.user.username,
                $scope.user.password,
                {
                    success : function(user){
                        casesApp.hasLogin = true;
                        $location.path('/list');
                    },
                    error : function(user,error){
                        alert('登陆失败：' + error.message + '(' + error.code + ')');
                    }
                }
            );
        }
        else{
            alert('请输入用户名和密码。');
        }
    };
});