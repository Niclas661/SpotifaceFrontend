var detector = new affdex.PhotoDetector();
detector.detectAllEmotions();
detector.detectAllExpressions();
detector.detectAllEmojis();
detector.detectAllAppearance();

var contxt = document.createElement('canvas').getContext('2d');
var facedata = {};
app.controller('MainController', function($scope, $http){
  //Vars
  $scope.analyzing = false;
  $scope.analyzed = false;
  $scope.chosenFile = false;
  $scope.greeting = "";
  $scope.introview = true;
  $scope.emotions = {
  };
  $scope.emojis = {
  };

  detector.addEventListener("onImageResultsSuccess", function(faces, image, timestamp){
    document.getElementById("progressText").innerHTML = "Analysis complete";
    console.log(faces);
    $scope.analyzing = false;
    $scope.emotions = faces[0].emotions;
    $scope.emojis = faces[0].emojis;




    $http({
      method: 'POST',
      url: 'http://spotiface.azurewebsites.net/api/musicresult',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'Expressions': faces[0].expressions,
        'Emotions': faces[0].emotions
      }
    }).then(function(response){
      $scope.greeting = response.data;
      console.log(response.data);
      $scope.analyzed = true;
    });


  });
  detector.addEventListener("onInitializeSuccess", function(){
    document.getElementById("progressText").innerHTML = "Analyzing image...";
    if ($scope.analyzing == true){
      processImage();
    }
    console.log("Initialized");
  })


  $scope.uploadImage = function () {
    console.log("Image chosen");
    if (detector && !detector.isRunning){
      detector.start();
    }
    $scope.chosenFile = true;
  };
  $scope.resetImage = function(){
    console.log("Reset");
    $scope.chosenFile = false;
    $scope.analyzed = false;
    $scope.introview = true;
  }

  $scope.setFile = function(element){
    $scope.currentFile = element.files[0];
    var reader = new FileReader();
    var img = new Image();
    reader.onload = function(event){
      $scope.imageSrc = event.target.result;
      img.src = event.target.result;
      img.onload = createCanvas;

      $scope.$apply();

    }
    reader.readAsDataURL(element.files[0]);

    $scope.uploadImage();


  }

  $scope.analyzeImage = function(){
    $scope.introview = false;
    $scope.analyzing = true;
    processImage();
    document.getElementById("choiceDiv").parentNode.removeChild(document.getElementById("choiceDiv"));
  }

});

function createCanvas(event){


  detector.detectAllEmotions();
  detector.detectAllExpressions();


  contxt.canvas.width = this.width;
  contxt.canvas.height = this.height;
  contxt.drawImage(this, 0, 0, this.width, this.height);
  console.log("Canvas drawn");

  //
  // if (detector && detector.isRunning) {
  //   detector.process(contxt.getImageData(0, 0, this.width, this.height), 0);
  // }

}

function processImage(){

  if (detector && detector.isRunning) {
    console.log("processing...");
    detector.process(contxt.getImageData(0, 0, contxt.canvas.width, contxt.canvas.height), 0);
  }
  else{
    alert("Could not process image");
  }
}
