var app = angular.module("spotiface", []);

app.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                //createCanvas(this);
                alert('image is loaded');
            });
            element.bind('error', function(){
                alert('image could not be loaded');
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
