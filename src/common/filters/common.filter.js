angular.module('patientory')
    .filter('reverse', function() {
      return function(items) {
        var array = [];
        for (var item in items){
            console.log(item);
            var object = {};
            object[item] = items[item];
            array.unshift(object);
        }
        console.log(array);
        return array;
        //return items.slice().reverse();
      };
    });