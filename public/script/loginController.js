/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("loginController", function($scope,$http, $location,dialogs) {
    $scope.user = {};

    $scope.doLogin = function(){
        if($scope.user.username && $scope.user.password){
            AV.User.logIn(
                $scope.user.username,
                $scope.user.password,
                {
                    success : function(user){
                        $scope.$apply(function(){
                            $location.path('/list');
                        });
                    },
                    error : function(user,error){
                        dialogs.error(
                            "登陆失败",
                            "用户名密码错误。"
                        );
                    }
                }
            );
        }
        else{
            dialogs.notify(
                "提示",
                "用户名/密码不能为空。"
            );
        }
    };
});