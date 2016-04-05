angular.module('patientory')
    .filter('reverse', function() {
      return function(items) {
        console.log(items);
        //return items.slice().reverse();
      };
    });