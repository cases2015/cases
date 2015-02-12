/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("detailController", function ($rootScope, $timeout, $scope, $http, $location, dialogs) {
    $scope.mode = 'view';

    dialogs.wait(
        '加载中',
        '数据加载中...',
        10
    );

    var patientId = $location.search().id;

    var Patient = AV.Object.extend('patient');
    var Cases = AV.Object.extend('cases');

    var queryPatient = new AV.Query(Patient);
    queryPatient.get(patientId, {
        success: function (patient) {
            $rootScope.$broadcast('dialogs.wait.progress', {'progress': 30});

            var queryCases = new AV.Query(Cases);
            queryCases.equalTo('parent', patient);
            queryCases.find({
                success: function (cases) {

                    $rootScope.$broadcast('dialogs.wait.progress', {'progress': 60});

                    $scope.patientObj = patient;
                    $scope.casesObj = cases[0];

                    $scope.$apply(function () {
                        $scope.cases = {};
                        //p1
                        $scope.cases.p1 = {
                            name: patient.get('name'),
                            number: patient.get('number'),
                            sex: patient.get('sex'),
                            age: patient.get('age'),
                            date: patient.get('date')
                        };

                        //p2
                        $scope.cases.p2 = JSON.parse(cases[0].get('p2'));

                        //p3
                        $scope.cases.p3 = cases[0].get('p3');

                        //p4
                        $scope.cases.p4 = JSON.parse(cases[0].get('p4'));

                        //p5
                        $scope.cases.p5 = JSON.parse(cases[0].get('p5'));

                        //p6
                        $scope.cases.p6 = JSON.parse(cases[0].get('p6'));
                    });

                    $rootScope.$broadcast('dialogs.wait.progress', {'progress': 100});

                    $timeout(function () {
                        $rootScope.$broadcast('dialogs.wait.complete');
                    }, 1000);

                },
                error: function (error) {
                    $rootScope.$broadcast(
                        'dialogs.wait.progress', {
                            'progress': 100,
                            'msg': '数据加载失败，请稍后再试。'
                        });

                    $timeout(function () {
                        $rootScope.$broadcast('dialogs.wait.complete');
                    }, 3000);
                }
            });
        },
        error: function (object, error) {
            $rootScope.$broadcast(
                'dialogs.wait.progress', {
                    'progress': 10,
                    'msg': '数据加载失败，请稍后再试。'
                });

            $timeout(function () {
                $rootScope.$broadcast('dialogs.wait.complete');
            }, 3000);
        }
    });

    $scope.editCases = function () {
        $scope.mode = 'edit';
    };

    $scope.saveCases = function () {
        if ($scope.patientObj) {
            $scope.patientObj.set('name', $scope.cases.p1.name);
            $scope.patientObj.set('number', $scope.cases.p1.number);
            $scope.patientObj.set('sex', $scope.cases.p1.sex);
            $scope.patientObj.set('age', $scope.cases.p1.age);
            $scope.patientObj.set('date', $scope.cases.p1.date);
        }

        if ($scope.casesObj) {
            $scope.casesObj.set('p2', JSON.stringify($scope.cases.p2));
            $scope.casesObj.set('p3', $scope.cases.p3);
            $scope.casesObj.set('p4', JSON.stringify($scope.cases.p4));
            $scope.casesObj.set('p5', JSON.stringify($scope.cases.p5));
            $scope.casesObj.set('p6', JSON.stringify($scope.cases.p6));

            if ($scope.patientObj) {
                $scope.casesObj.set('parent', $scope.patientObj);
            }

            dialogs.wait(
                '正在保存',
                '正在保存...',
                10
            );

            $scope.casesObj.save(null, {
                success: function () {
                    $scope.mode = 'view';

                    $rootScope.$broadcast('dialogs.wait.progress', {'progress': 100});

                    $timeout(function () {
                        $rootScope.$broadcast('dialogs.wait.complete');
                    }, 1000);
                },
                error: function (error) {
                    $rootScope.$broadcast(
                        'dialogs.wait.progress', {
                            'progress': 10,
                            'msg': '保存失败，请稍后再试。'
                        });

                    $timeout(function () {
                        $rootScope.$broadcast('dialogs.wait.complete');
                    }, 3000);
                }
            });
        }
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
        if ($scope.mode == 'edit') {
            var dlgConfirm = dialogs.confirm(
                '确认返回',
                '您正处于编辑状态。<br>是否确认不保存就返回？'
            );

            dlgConfirm.result.then(function (btn) {
                $location.path('/list').search({});
            }, function (btn) {

            });
        }
        else {
            $location.path('/list').search({});
        }
    };

    $scope.onLogout = function(){
        AV.User.logOut();
        $location.path('/login').search({});
    };

    $scope.dropCases = function () {
        var confirmDrop = dialogs.confirm(
            '确认删除',
            '是否确认删除该条病例？'
        );

        confirmDrop.result.then(function (btn) {
            $timeout(function () {
                dialogs.wait(
                    '正在删除',
                    '正在删除,请稍后...',
                    10
                );

                $scope.patientObj.destroy({
                    success: function () {
                        $rootScope.$broadcast('dialogs.wait.progress', {'progress': 50});

                        $scope.casesObj.destroy({
                            success : function(){
                                $rootScope.$broadcast('dialogs.wait.progress', {
                                    'progress': 100,
                                    'msg' : '删除成功，正在返回列表。'
                                });

                                $timeout(function () {
                                    $rootScope.$broadcast('dialogs.wait.complete');
                                    $scope.$apply(function(){
                                        $location.path('/list').search({});
                                    });
                                }, 3000);
                            },
                            error : function(){
                                $rootScope.$broadcast(
                                    'dialogs.wait.progress', {
                                        'progress': 10,
                                        'msg': '删除失败，请稍后再试。'
                                    });

                                $timeout(function () {
                                    $rootScope.$broadcast('dialogs.wait.complete');
                                }, 3000);
                            }
                        });
                    },
                    error: function () {
                        $rootScope.$broadcast(
                            'dialogs.wait.progress', {
                                'progress': 10,
                                'msg': '删除失败，请稍后再试。'
                            });

                        $timeout(function () {
                            $rootScope.$broadcast('dialogs.wait.complete');
                        }, 3000);
                    }
                });
            }, 100);
        }, function (btn) {
        });
    };
});