var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
var detector = new affdex.PhotoDetector(faceMode);

var contxt = document.createElement('canvas').getContext('2d');
console.log("v 1.04");

app.controller('MainController', function($scope, $http){
  $scope.analyzeready = false;
  //Vars
  $scope.analyzing = false;
  $scope.analyzed = false;
  $scope.chosenFile = false;
  $scope.introview = true;

  //When detector is ready, show Yes button
  detector.onInitialize = function(){
    console.log("ready");
    $scope.analyzeready = true;
  };
  //When detector has finished processing, show results
  detector.onImageResultsSuccess = function(){
    console.log("results here!!");
  };
  detector.onImageResultsFailure = function(){
    console.log("process failed");
  };


  $scope.uploadImage = function () {
    console.log("Image chosen");
    $scope.chosenFile = true;
  };
  $scope.resetImage = function(){
    console.log("Reset");
    $scope.chosenFile = false;
    $scope.analyzed = false;
    $scope.greeting = "";
    $scope.introview = true;
  }

  $scope.setFile = function(element){
    $scope.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event){
      $scope.imageSrc = event.target.result;
      document.getElementById("previewImg").onload = createCanvas;

      $scope.$apply();

    }
    reader.readAsDataURL(element.files[0]);

    $scope.uploadImage();


  }

  $scope.analyzeImage = function(){
    $scope.introview = false;
    $scope.analyzing = true;
    processImage();

    //When detector has finished processing, show results
    detector.onImageResultsSuccess = function(){
      console.log("results here!!");
    };
    detector.onImageResultsFailure = function(){
      console.log("process failed");
    };

    // $http.get('http://rest-service.guides.spring.io/greeting').
    // then(function(response){
    //   $scope.greeting = response.data;
    //   $scope.analyzed = true;
    // });

  }

});

function getResults(){
  console.log("results here");
  detector.stop();
}

function createCanvas(event){
  detector.start();

  detector.detectAllEmotions();
  detector.detectAllExpressions();


  contxt.canvas.width = this.width;
  contxt.canvas.height = this.height;
  contxt.drawImage(this, 0, 0, this.width, this.height);
  alert("Canvas drawn");

  //
  // if (detector && detector.isRunning) {
  //   detector.process(contxt.getImageData(0, 0, this.width, this.height), 0);
  // }

}

function processImage(){
  detector.detectAllEmotions();
  detector.detectAllExpressions();

  if (detector && detector.isRunning) {
    console.log("processing...");
    detector.process(contxt.getImageData(0, 0, 640, 480), 0);
    console.log("method called");
  }
  else{
    alert("Could not process image");
  }
}
