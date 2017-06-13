var app = angular.module("spotiface", []);

app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                //createCanvas(this);
                console.log('image is loaded');
            });
            element.bind('error', function(){
                console.log('image could not be loaded');
            });
        }
    };
});

/*app.directive("ngFileSelect",function(){
  return {
    link: function($scope, el){
      el.bind("change", function(e){

        alert(el.files[0]);

      });
    }
  }
});
*/
