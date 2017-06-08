app.controller('MainController', ['$scope',function($scope){
  $scope.chosenFile = null;
  $scope.uploadImage = function () {
    console.log("Changed");
    console.log($scope.chosenFile);
    $scope.chosenFile = "something";
  };
  $scope.resetImage = function(){
    console.log("Reset");
    $scope.chosenFile = null;
  }
}]);
