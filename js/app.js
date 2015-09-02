// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
// $(document).foundation({
//   accordion: {
//     // specify the class used for accordion panels
//     content_class: 'content',
//     // specify the class used for active (or open) accordion panels
//     active_class: 'active',
//     // allow multiple accordion panels to be active at the same time
//     multi_expand: true,
//     // allow accordion panels to be closed by clicking on their headers
//     // setting to false only closes accordion panels when another is opened
//     toggleable: true
//   }
// });



var tp = angular.module('treatmentPlan', ['ngRoute', 'firebase']);

tp.controller('TreatmentDetailController', function($scope, $firebaseObject, $routeParams) {
    $scope.patientId = $routeParams.patientId;
    $scope.planId = $routeParams.planId;
    console.log('patientId: ' +$routeParams.patientId);
    console.log('planId: ' +$routeParams.planId);
    var ref = new Firebase("https://treatment-plan.firebaseio.com/patients/"+ $scope.patientId + "/plans/" + $scope.planId);
    $scope.planDetail = $firebaseObject(ref);

    console.dir($scope.planDetail); 
});

tp.controller('TreatmentListController', function($scope, $firebaseArray, $routeParams) {
    $scope.patientId = $routeParams.patientId;
    // console.log('patientId: ' +$routeParams.patientId);
    var ref = new Firebase("https://treatment-plan.firebaseio.com/patients/"+ $scope.patientId + "/plans");
    $scope.plans = $firebaseArray(ref);  
});

tp.controller('PatientListController', function($scope, $firebaseArray) {
  var ref = new Firebase("https://treatment-plan.firebaseio.com/patients");
  $scope.patients = $firebaseArray(ref);
  console.dir($scope.patients)
});

tp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'templates/patient-list.html',
        controller: 'PatientListController'
      }).
      when('/patient-plans/:patientId', {
        templateUrl: 'templates/plan-list.html',
        controller: 'PatientListController'
      }).
      when('/plan-detail/:patientId/:planId', {
        templateUrl: 'templates/plan-details.html',
        controller: 'TreatmentDetailController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


