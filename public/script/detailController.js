/**
 * Created by chenguanglv on 15/2/10.
 */

casesApp.controller("detailController", function ($scope, $http, $location) {
    $scope.mode = 'view';

    var patientId = $location.search().id;

    var Patient = AV.Object.extend('patient');
    var Cases = AV.Object.extend('cases');

    var queryPatient = new AV.Query(Patient);
    queryPatient.get(patientId, {
        success: function (patient) {
            var queryCases = new AV.Query(Cases);
            queryCases.equalTo('parent', patient);
            queryCases.find({
                success: function (cases) {
                    $scope.patientObj = patient;
                    $scope.casesObj = cases[0];

                    $scope.$apply(function(){
                        $scope.cases = {};
                        //p1
                        $scope.cases.p1 = {
                            name : patient.get('name'),
                            number : patient.get('number'),
                            sex : patient.get('sex'),
                            age : patient.get('age'),
                            date : patient.get('date')
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

                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        error: function (object, error) {

        }
    });

    $scope.editCases = function(){
        $scope.mode = 'edit';
    };

    $scope.saveCases = function(){
        $scope.mode = 'view';

        if($scope.patientObj){
            $scope.patientObj.set('name',$scope.cases.p1.name);
            $scope.patientObj.set('number',$scope.cases.p1.number);
            $scope.patientObj.set('sex',$scope.cases.p1.sex);
            $scope.patientObj.set('age',$scope.cases.p1.age);
            $scope.patientObj.set('date',$scope.cases.p1.date);
        }

        if($scope.casesObj){
            $scope.casesObj.set('p2',JSON.stringify($scope.cases.p2));
            $scope.casesObj.set('p3',$scope.cases.p3);
            $scope.casesObj.set('p4',JSON.stringify($scope.cases.p4));
            $scope.casesObj.set('p5',JSON.stringify($scope.cases.p5));
            $scope.casesObj.set('p6',JSON.stringify($scope.cases.p6));

            if($scope.patientObj){
                $scope.casesObj.set('parent',$scope.patientObj);
            }

            $scope.casesObj.save(null,{
                success : function(){
                    alert('success');
                },
                error : function(error){
                    alert(error.code + ' ' + error.message);
                }
            });
        }
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
});