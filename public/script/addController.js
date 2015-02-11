/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("addController", function ($scope, $http, $location) {
    $scope.mode = 'add';

    $scope.resetCases = function(){
        $scope.cases = {
            p1: {},
            p2: {
                sp1 : {},
                sp2 : {},
                sp3 : ''
            },
            p3: '',
            p4: {
                sp1 : [],
                sp2 : [],
                sp3 : [],
                sp4 : [],
                sp5 : []
            },
            p5: {
                sp1 : '',
                sp2 : '',
                sp3 : '',
                sp4 : [],
                sp5 : []

            },
            p6: []
        };
    };

    $scope.addSubPart = function(obj){
        obj.push({});
    };

    $scope.removeSubPart = function(obj,subObj){
        var index = obj.indexOf(subObj);
        obj.splice(index,1);
    };

    $scope.goBack = function(){
        $location.path('/list');
    };

    $scope.addCases = function(){
        var casesObj = JSON.parse(angular.toJson($scope.cases));

        var Patient = AV.Object.extend('patient');
        var Cases = AV.Object.extend('cases');

        var patient = new Patient();
        for(var key in casesObj.p1){
            patient.set(key,casesObj.p1[key]);
        }

        var cases = new Cases();
        cases.set('p2',JSON.stringify(casesObj.p2));
        cases.set('p3',casesObj.p3);
        cases.set('p4',JSON.stringify(casesObj.p4));
        cases.set('p5',JSON.stringify(casesObj.p5));
        cases.set('p6',JSON.stringify(casesObj.p6));
        cases.set('parent',patient);

        cases.save(null,{
            success : function(cases){
                $scope.$apply(function(){
                    $location.path('/list');
                });
            },
            error : function(cases,error){
                alert(error.code + ' ' + error.message);
            }
        });
    };

    $scope.addCasesAndContinue = function(){
        var casesObj = JSON.parse(angular.toJson($scope.cases));

        var Patient = AV.Object.extend('patient');
        var Cases = AV.Object.extend('cases');

        var patient = new Patient();
        for(var key in casesObj.p1){
            patient.set(key,casesObj.p1[key]);
        }

        var cases = new Cases();
        cases.set('p2',JSON.stringify(casesObj.p2));
        cases.set('p3',JSON.stringify(casesObj.p3));
        cases.set('p4',JSON.stringify(casesObj.p4));
        cases.set('p5',JSON.stringify(casesObj.p5));
        cases.set('p6',JSON.stringify(casesObj.p6));
        cases.set('parent',patient);

        cases.save(null,{
            success : function(cases){
                $scope.$apply(function(){
                    $scope.resetCases();
                });
            },
            error : function(cases,error){
                alert(error.code + ' ' + error.message);
            }
        });
    };

    $scope.resetCases();

});