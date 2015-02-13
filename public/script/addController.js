/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("addController", function ($rootScope, $scope, $timeout, $http, $location, dialogs) {
    $scope.mode = 'add';

    $scope.resetCases = function () {
        $scope.cases = {
            p1: {},
            p2: {
                sp1: {},
                sp2: {},
                sp3: ''
            },
            p3: '',
            p4: {
                sp1: [],
                sp2: [],
                sp3: [],
                sp4: [],
                sp5: []
            },
            p5: {
                sp1: '',
                sp2: '',
                sp3: '',
                sp4: [],
                sp5: {
                    ssp1 : [],
                    ssp2 : []
                }

            },
            p6: []
        };
    };

    $scope.addSubPart = function (obj) {
        obj.push({});
    };

    $scope.removeSubPart = function (obj, subObj) {
        var confirmDelete = dialogs.confirm(
            '请确认',
            '是否删除该条目？'
        );

        confirmDelete.result.then(function (btn) {
            var index = obj.indexOf(subObj);
            obj.splice(index, 1);
        }, function (btn) {

        });
    };

    $scope.goBack = function () {
        var dlgConfirm = dialogs.confirm(
            '确认返回',
            '数据未保存。<br>是否确定不保存就返回？'
        );

        dlgConfirm.result.then(function (btn) {
            $location.path('/list');
        }, function (btn) {

        });
    };

    $scope.addCases = function () {
        if(!$scope.cases.p1.name || !$scope.cases.p1.number){
            dialogs.notify(
                '添加失败',
                '病人基础信息不能为空。'
            );

            return ;
        }

        dialogs.wait(
            '正在添加',
            '正在添加...',
            10
        );

        var casesObj = JSON.parse(angular.toJson($scope.cases));

        var Patient = AV.Object.extend('patient');
        var Cases = AV.Object.extend('cases');

        var patient = new Patient();
        for (var key in casesObj.p1) {
            patient.set(key, casesObj.p1[key]);
        }

        $rootScope.$broadcast('dialogs.wait.progress',{'progress' : 20});

        var cases = new Cases();
        cases.set('p2', JSON.stringify(casesObj.p2));
        cases.set('p3', casesObj.p3);
        cases.set('p4', JSON.stringify(casesObj.p4));
        cases.set('p5', JSON.stringify(casesObj.p5));
        cases.set('p6', JSON.stringify(casesObj.p6));
        cases.set('parent', patient);

        $rootScope.$broadcast('dialogs.wait.progress',{'progress' : 30});

        cases.save(null, {
            success: function (cases) {

                $rootScope.$broadcast('dialogs.wait.progress',{
                    'progress' : 100,
                    'msg' : '保存成功，正在返回列表。'
                });

                $timeout(function(){
                    $rootScope.$broadcast('dialogs.wait.complete');
                    $scope.$apply(function () {
                        $location.path('/list');
                    });
                },1000);
            },
            error: function (cases, error) {
                dialogs.error(
                    '保存失败',
                    '保存失败，请稍后再试。'
                );
            }
        });
    };

    $scope.onLogout = function(){
        AV.User.logOut();
        $location.path('/login');
    };

    //$scope.addCasesAndContinue = function () {
    //    var casesObj = JSON.parse(angular.toJson($scope.cases));
    //
    //    var Patient = AV.Object.extend('patient');
    //    var Cases = AV.Object.extend('cases');
    //
    //    var patient = new Patient();
    //    for (var key in casesObj.p1) {
    //        patient.set(key, casesObj.p1[key]);
    //    }
    //
    //    var cases = new Cases();
    //    cases.set('p2', JSON.stringify(casesObj.p2));
    //    cases.set('p3', JSON.stringify(casesObj.p3));
    //    cases.set('p4', JSON.stringify(casesObj.p4));
    //    cases.set('p5', JSON.stringify(casesObj.p5));
    //    cases.set('p6', JSON.stringify(casesObj.p6));
    //    cases.set('parent', patient);
    //
    //    cases.save(null, {
    //        success: function (cases) {
    //            $scope.$apply(function () {
    //                $scope.resetCases();
    //            });
    //        },
    //        error: function (cases, error) {
    //            alert(error.code + ' ' + error.message);
    //        }
    //    });
    //};

    $scope.resetCases();

});