(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController ($scope,
                              $filter,
                              $injector) {



$scope.lunchEnterd = function () {
  $scope.message = "";

   if ($scope.lunchName ==   undefined)
   {
     $scope.message = "Please enter data first";
   }
   else
   {
     var lunch = $scope.lunchName.split(",");
     if (lunch.length <= 3)
     {
        $scope.message = "Enjoy";
     }
     else if (lunch.length > 3)
     {
       $scope.message = "Too much!! ";
     }
   }

 };
 }



})();
