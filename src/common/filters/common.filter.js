angular.module('patientory')
    .filter('reverse', function() {
      return function(items) {
        var array = [];
        for (var item in items){
            array.unshift(items[item]);
        }
        return array;
        //return items.slice().reverse();
      };
    });