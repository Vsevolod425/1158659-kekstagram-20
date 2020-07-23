'use strict';

(function () {
  var getRandomElement = function (array) {
    var randomElement = array[parseInt(Math.random() * array.length, DECIMAL_SYSTEM)];
    return randomElement;
  };
})();
