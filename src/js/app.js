'use strict'
//проверка пароля
var testApp = angular.module("testApp", []);
testApp.controller('addRow', function($scope, $rootScope) {
    $scope.submitData = function() {
        if ($scope.addData.$valid) {
            var input = {
                firstName: $scope.addData.firstName.$viewValue,
                lastName: $scope.addData.lastName.$viewValue,
                position: $scope.addData.position.$viewValue
            }
            $rootScope.data.push(input);
        }
    };
})

