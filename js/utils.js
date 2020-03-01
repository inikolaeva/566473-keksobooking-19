'use strict';

(function () {
  // min - inclusive, max - exclusive
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomArrValue(arr) {
    var index = getRandomInt(0, arr.length);
    return arr[index];
  }

  function getRandomArrValueWithRandomSize(arr) {
    var reduceAmount = getRandomInt(0, arr.length - 1);
    var results = arr.slice();
    for (var i = 0; i < reduceAmount; i++) {
      var randomIndex = getRandomInt(0, results.length);
      results.splice(randomIndex, 1);
    }
    return results;
  }

  window.utils = {
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getRandomArrValueWithRandomSize: getRandomArrValueWithRandomSize
  };
})();
