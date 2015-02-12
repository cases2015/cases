/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("listController", function ($scope, $http, $location, page,$rootScope,$timeout,$translate,dialogs) {

    $scope.patients = [];
    $scope.page = page;

    $scope.showDetail = function (id) {
        $location.path('/detail').search({id: id});
    };

    $scope.onPageChange = function (pageNo) {
        $scope.page.pageNo = pageNo;

        $scope.reload();
    };

    $scope.reload = function () {
        var Patient = AV.Object.extend('patient');

        var queryTotal = new AV.Query(Patient);
        queryTotal.count({
            success: function (count) {
                $scope.$apply(function () {
                    $scope.page.total = count;
                });

            },
            error: function (error) {
                alert(error.code + ' ' + error.message);
            }
        });

        var query = new AV.Query(Patient);
        query.limit(page.pageSize);
        query.skip((page.pageNo - 1) * page.pageSize);
        query.find({
            success: function (results) {
                $scope.$apply(function () {
                    $scope.patients.length = 0;

                    for (var i = 0; i < results.length; i++) {
                        $scope.patients.push({
                            id: results[i].id,
                            name: results[i].get('name'),
                            number: results[i].get('number'),
                            sex: results[i].get('sex'),
                            age: results[i].get('age'),
                            date: results[i].get('date')
                        });
                    }
                });
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    };

    $scope.onLogout = function(){
        AV.User.logOut();
        $location.path('/login');
    };

    $scope.reload();
});