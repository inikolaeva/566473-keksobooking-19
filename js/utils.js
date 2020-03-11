'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  function showErrorMessage(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function toggleDisabled(elements, state) {
    for (var k = 0; k < elements.length; k++) {
      elements[k].disabled = state;
    }
  }

  // min - inclusive, max - exclusive
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomArrValue(arr, size) {
    var results = arr.slice();
    for (var i = 0; i < size; i++) {
      var randomIndex = getRandomInt(0, results.length);
      results.splice(randomIndex, 1);
    }
    return results;
  }

  window.utils = {
    showErrorMessage: showErrorMessage,
    toggleDisabled: toggleDisabled,
    debounce: debounce,
    getRandomArrValue: getRandomArrValue
  };
})();
