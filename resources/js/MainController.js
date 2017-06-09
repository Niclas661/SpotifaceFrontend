app.controller('MainController', function($scope, $http){

  $scope.chosenFile = false;
  $scope.uploadImage = function () {
    console.log("Changed");
    $scope.chosenFile = true;
  };
  $scope.resetImage = function(){
    console.log("Reset");
    $scope.chosenFile = false;
  }

  $scope.setFile = function(element){
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event){
      $scope.imageSrc = event.target.result;
      $scope.$apply();
    }
    reader.readAsDataURL(element.files[0]);

    $scope.uploadImage();
  }

  $scope.analyzeImage = function(){
    $http.get('http://rest-service.guides.spring.io/greeting').
    then(function(response){
      $scope.greeting = response.data;
    });

  }
});
