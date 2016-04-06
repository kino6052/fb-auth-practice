angular.module('patientory')
    .filter('reverse', function() {
      return function(items) {
        var array = [];
        console.log("ITEMS");
        console.log(items);
        for (var item in items){
            console.log("Test");
            array.unshift(items[item]);
        }
        console.log(array);
        return array;
        //return items.slice().reverse();
      };
    });